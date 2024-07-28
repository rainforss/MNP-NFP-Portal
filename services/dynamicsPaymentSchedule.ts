import { createWithReturnData, WebApiConfig } from "dataverse-webapi/lib/node";
import { msnfp_PaymentSchedule } from "../dataverse-types/entities/msnfp_PaymentSchedule";

export const dynamicsPaymentSchedule = (accessToken: string) => {
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
  return {
    createPaymentSchedule: async (scheduleData: msnfp_PaymentSchedule) => {
      const {
        msnfp_name,
        msnfp_frequency,
        msnfp_frequencyinterval,
        msnfp_firstpaymentdate,
        msnfp_lastpaymentdate,
        msnfp_recurringamount,
        msnfp_numberofpayments,
        msnfp_paymentschedule_donorcommitmentid,
        msnfp_totalamount,
        mnp_dataentrytype,
      } = scheduleData;

      const schedule = await createWithReturnData(
        config,
        "msnfp_paymentschedules",
        {
          msnfp_name,
          msnfp_frequency,
          msnfp_frequencyinterval,
          msnfp_firstpaymentdate,
          msnfp_lastpaymentdate,
          msnfp_recurringamount,
          msnfp_numberofpayments,
          msnfp_totalamount,
          mnp_dataentrytype,
          "msnfp_PaymentSchedule_DonorCommitmentId@odata.bind": `/msnfp_donorcommitments(${msnfp_paymentschedule_donorcommitmentid})`,
        },
        "$select=msnfp_paymentscheduleid"
      );

      return schedule;
    },
  };
};
