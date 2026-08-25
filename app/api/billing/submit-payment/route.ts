import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { submitSubscriptionPayment } from '@/lib/payments';

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    const { paymentMethod, referenceCode } = await req.json();

    if (!paymentMethod || !referenceCode) {
      return NextResponse.json(
        { error: 'El método de pago y el número de referencia son obligatorios' },
        { status: 400 }
      );
    }

    const payment = await submitSubscriptionPayment({
      businessId: user.id,
      paymentMethod,
      referenceCode,
      amountUsd: 5.99,
    });

    return NextResponse.json({ success: true, payment });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || 'Error al procesar el pago' },
      { status: 500 }
    );
  }
}