import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // Obtener contexto actual del negocio para alimentar al copiloto
    const [{ data: profile }, { data: products }, { data: orders }] = await Promise.all([
      (supabase.from('profiles') as any).select('*').eq('id', user.id).single(),
      (supabase.from('products') as any).select('*').eq('business_id', user.id),
      (supabase.from('orders') as any).select('*').eq('business_id', user.id).limit(20),
    ]);

    const context = `
      Negocio: ${profile?.business_name || 'Comercio'}
      Productos totales: ${products?.length || 0}
      Órdenes recientes: ${orders?.length || 0}
    `;

    // Respuesta estructurada de análisis rápido
    const responseMessage = `Analizando tu negocio *${profile?.business_name || 'Comercio'}*:\n\n` +
      `• **Inventario:** Tienes ${products?.length || 0} productos registrados.\n` +
      `• **Ventas:** Se registran ${orders?.length || 0} órdenes recientes.\n\n` +
      `**Sugerencia:** ${
        products?.length === 0 
          ? 'Carga más productos a tu inventario para aumentar el alcance de tu catálogo público.' 
          : 'Promociona tus productos con menor stock en tus historias de WhatsApp para rotar inventario.'
      }`;

    return NextResponse.json({ result: responseMessage });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Error en Copiloto' }, { status: 500 });
  }
}