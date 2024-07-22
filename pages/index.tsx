import "isomorphic-unfetch";
import type { NextPage } from "next";
import Hero from "../components/Hero";
import Layout from "../components/Layout";
import { CurrentUser } from "../types/dynamicsEntities";
import { withSessionSsr } from "../utils/withSession";

interface IHomeProps {
  user: CurrentUser;
}

const Home: NextPage<IHomeProps> = (props) => {
  return (
    <Layout user={props.user}>
      <Hero userId={props.user?._id} />
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

export default Home;
