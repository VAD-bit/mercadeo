import { createClient } from '@/lib/supabase/server';

export async function submitSubscriptionPayment({
  businessId,
  paymentMethod,
  referenceCode,
  amountUsd = 5.99,
}: {
  businessId: string;
  paymentMethod: 'mobile_pay' | 'binance_pay';
  referenceCode: string;
  amountUsd?: number;
}) {
  const supabase = await createClient();

  const { data, error } = await (supabase.from('subscription_payments') as any)
    .insert([
      {
        business_id: businessId,
        payment_method: paymentMethod,
        reference_code: referenceCode,
        amount_usd: amountUsd,
        status: 'pending',
      },
    ])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function approveSubscriptionPayment(paymentId: string) {
  const supabase = await createClient();

  const { data: payment, error: fetchError } = await (
    supabase.from('subscription_payments') as any)
    .select('business_id')
    .eq('id', paymentId)
    .single();

  if (fetchError || !payment) throw new Error('Pago no encontrado');

  await (supabase.from('subscription_payments') as any)
    .update({ status: 'approved' })
    .eq('id', paymentId);

  const newTrialEnds = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

  await (supabase.from('profiles') as any)
    .update({
      subscription_status: 'active',
      trial_ends_at: newTrialEnds,
    })
    .eq('id', payment.business_id);

  return true;
}