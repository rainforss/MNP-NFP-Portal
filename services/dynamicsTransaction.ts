import {
  retrieveMultiple,
  WebApiConfig,
  retrieve,
  createWithReturnData,
} from "dataverse-webapi/lib/node";
import { msnfp_Transaction } from "../dataverse-types/entities/msnfp_Transaction";

export const dynamicsTransaction = (accessToken: string) => {
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
  return {
    getAllByContactId: async (contactId: string) => {
      const transactions = await retrieveMultiple(
        config,
        "msnfp_transactions",
        `$filter=statecode eq 0 and _msnfp_receiptoncontactid_value eq '${contactId}'&$select=msnfp_name,msnfp_amount,msnfp_bookdate,msnfp_receiveddate,msnfp_transactionid,&$orderby=msnfp_receiveddate desc`,
        { representation: true }
      );
      return transactions.value;
    },
    getTransactionById: async (transactionId: string) => {
      const transaction = await retrieve(
        config,
        "msnfp_transactions",
        transactionId,
        `$select=msnfp_name,msnfp_amount,msnfp_bookdate,msnfp_receiveddate,msnfp_transactionid,_msnfp_receiptoncontactid_value,_msnfp_transaction_receiptonaccountid_value&$orderby=msnfp_receiveddate desc`,
        { representation: true }
      );
      return transaction;
    },
    createTransaction: async (transactionData: msnfp_Transaction) => {
      const {
        msnfp_name,
        msnfp_amount,
        msnfp_bookdate,
        msnfp_receiveddate,
        mnp_stripepaymentintentid,
        _msnfp_receiptoncontactid_value,
      } = transactionData;

      const transaction = await createWithReturnData(
        config,
        "msnfp_transactions",
        {
          msnfp_name,
          msnfp_amount,
          msnfp_bookdate,
          msnfp_receiveddate,
          mnp_stripepaymentintentid,
          "msnfp_receiptoncontactid@odata.bind": `/contacts(${_msnfp_receiptoncontactid_value})`,
        },
        "$select=msnfp_transactionid"
      );

      return transaction;
    },
  };
};
