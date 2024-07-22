import { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from "stripe";
// This is your test secret API key.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function paymentRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const { amount } = req.body;

      // Create a PaymentIntent with the order amount and currency
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: "cad",
        // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return res.status(200).json({
        clientSecret: paymentIntent.client_secret,
        id: paymentIntent.id,
      });

    default:
      return res.status(405).json({
        error: {
          name: "Not Supported",
          message: `Method ${req.method} is not allowed`,
        },
      });
  }
}
