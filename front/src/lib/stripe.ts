import { loadStripe } from '@stripe/stripe-js';

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

if (!stripePublicKey) {
  throw new Error('NEXT_PUBLIC_STRIPE_PUBLIC_KEY no está definido');
}

export const stripePromise = loadStripe(stripePublicKey);
