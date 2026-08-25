import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Verificación de cookie de sesión local / demo como fallback
  const hasLocalSession = request.cookies.has('mercadeo_session_active');

  const isAuthRoute =
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/register');
  const isDashboardRoute = request.nextUrl.pathname.startsWith('/dashboard');
  const isOnboardingRoute = request.nextUrl.pathname.startsWith('/onboarding');
  const isExpiredRoute = request.nextUrl.pathname.startsWith('/billing/expired');

  // 1. Si no hay usuario ni en Supabase ni en cookie local y quiere entrar al dashboard -> /login
  if (!user && !hasLocalSession && isDashboardRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 2. Si el usuario está autenticado en Supabase
  if (user) {
    if (isAuthRoute) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    const { data: profile } = await (supabase.from('profiles') as any)
      .select('subscription_status, trial_ends_at, business_name, use_case')
      .eq('id', user.id)
      .single();

    // Solo redirige a /onboarding si no hay business_name Y tampoco es cuenta personal
    const hasCompletedOnboarding = profile?.business_name || profile?.use_case === 'personal';

    if (profile && !hasCompletedOnboarding && !isOnboardingRoute) {
      return NextResponse.redirect(new URL('/onboarding', request.url));
    }

    if (profile && isDashboardRoute) {
      const now = new Date();
      const trialEnds = profile.trial_ends_at ? new Date(profile.trial_ends_at) : null;
      const isExpired =
        profile.subscription_status === 'expired' ||
        (profile.subscription_status === 'trialing' && trialEnds && trialEnds < now);

      if (isExpired && !isExpiredRoute) {
        return NextResponse.redirect(new URL('/billing/expired', request.url));
      }
    }
  }

  return response;
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/onboarding',
    '/login',
    '/register',
    '/billing/expired',
  ],
};