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
      const { customer } = req.body;

      const stripeCustomer = await stripe.customers.create({
        email: customer.emailaddress1,
        name: `${customer.firstname} ${customer.lastname}`,
        address: {
          city: customer.address1_city,
          country: customer.address1_country,
          line1: customer.address1_line1,
          line2: customer.address1_line2,
          postal_code: customer.address1_postalcode,
          state: customer.address1_stateorprovince,
        },
      });

      await disconnect();
      return res.status(200).json({ customerId: stripeCustomer.id });

    default:
      await disconnect();
      return res.status(405).json({
        error: {
          name: "Not Supported",
          message: `Method ${req.method} is not allowed`,
        },
      });
  }
}
