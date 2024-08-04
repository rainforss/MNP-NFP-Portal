import { NextApiRequest, NextApiResponse } from "next";
import { Stripe } from "stripe";
import { disconnect } from "../../../utils/redis";
// This is your test secret API key.
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function paymentRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      const { customerId, customerName, amount, metadata } = req.body;
      const price = await stripe.prices.create({
        currency: "cad",
        unit_amount: amount * 100,
        recurring: {
          interval: "month",
        },
        product_data: {
          name: `${customerName} - $${amount} - Monthly Donation`,
        },
      });
      const subscription = await stripe.subscriptions.create({
        customer: customerId,
        items: [
          {
            price: price.id,
          },
        ],
        payment_behavior: "default_incomplete",
        payment_settings: { save_default_payment_method: "on_subscription" },

        expand: ["latest_invoice.payment_intent", "pending_setup_intent"],
        metadata,
      });

      if (subscription.pending_setup_intent !== null) {
        res.send({
          type: "setup",
          clientSecret: (subscription.pending_setup_intent as any)
            .client_secret,
          id: subscription.id,
          nextPaymentDate: subscription.current_period_end,
        });
      } else {
        res.send({
          type: "payment",
          clientSecret: (subscription.latest_invoice as any).payment_intent
            .client_secret,
          id: subscription.id,
          nextPaymentDate: subscription.current_period_end,
        });
      }

      break;
    //   return res.status(200).json({
    //     clientSecret: (
    //       (subscription.latest_invoice! as Stripe.Invoice)
    //         .payment_intent! as Stripe.PaymentIntent
    //     ).client_secret,
    //     type: "payment",
    //   });

    default:
      return res.status(405).json({
        error: {
          name: "Not Supported",
          message: `Method ${req.method} is not allowed`,
        },
      });
  }
}
