import axios from "axios";
import "isomorphic-unfetch";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import DonationForm from "../forms/DonationForm";
import { CurrentUser } from "../types/dynamicsEntities";
import { withSessionSsr } from "../utils/withSession";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

interface IDonationProps {
  user: CurrentUser;
}

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);

const Donation: NextPage<IDonationProps> = (props) => {
  //   const [paymentIntent, setPaymentIntent] = useState<any>();
  //   useEffect(() => {
  //     axios
  //       .post(
  //         "/api/create-payment-intent",
  //         { amount: 600 },
  //         { headers: { "Content-Type": "application/json" } }
  //       )
  //       .then((res) => {
  //         console.log(res);
  //         setPaymentIntent({
  //           clientSecret: res.data.clientSecret,
  //           paymentIntentId: res.data.id,
  //         });
  //       });
  //   }, []);

  const appearance: { theme: "stripe" | "night" | "flat" | undefined } = {
    theme: "stripe",
  };
  return (
    <Layout user={props.user}>
      <Elements
        options={{
          appearance: appearance,
          mode: "payment",
          currency: "cad",
          amount: 3600,
        }}
        stripe={stripePromise}
      >
        <DonationForm user={props.user} />
      </Elements>
    </Layout>
  );
};

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req }) {
    const user = req.session.user;

    // if (!user) {
    //   return {
    //     redirect: {
    //       permanent: false,
    //       destination: "/login",
    //     },
    //   };
    // }
    return {
      props: {
        user: user ?? null,
      },
    };
  }
);

export default Donation;
