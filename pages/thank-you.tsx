import { loadStripe } from "@stripe/stripe-js";
import "isomorphic-unfetch";
import type { NextPage } from "next";
import Hero from "../components/Hero";
import Heroine from "../components/Heroine";
import Layout from "../components/Layout";
import { CurrentUser } from "../types/dynamicsEntities";
import { withSessionSsr } from "../utils/withSession";

interface IThankYouPageProps {
  user?: CurrentUser;
}

const ThankYouPage: NextPage<IThankYouPageProps> = (props) => {
  return (
    <Layout user={props.user}>
      <Heroine userId={props.user?._id} />
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

export default ThankYouPage;
