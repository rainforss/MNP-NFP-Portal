import { NextPage } from "next";
import * as React from "react";
import Layout from "../../components/Layout";
import TransactionForm from "../../forms/TransactionForm";
import { CurrentUser } from "../../types/dynamicsEntities";
import { withSessionSsr } from "../../utils/withSession";

interface ISingleTransactionProps {
  user: CurrentUser;
  transactionId: string;
}

const SingleTransaction: NextPage<ISingleTransactionProps> = (props) => {
  return (
    <Layout user={props.user}>
      <TransactionForm transactionId={props.transactionId} />
    </Layout>
  );
};

export const getServerSideProps = withSessionSsr(
  async function getServerSideProps({ req, query }) {
    const user = req.session.user;
    const { transactionId } = query;
    if (!user) {
      return {
        redirect: {
          permanent: false,
          destination: "/login",
        },
      };
    }
    return {
      props: {
        user,
        transactionId: transactionId as string,
      },
    };
  }
);

export default SingleTransaction;
