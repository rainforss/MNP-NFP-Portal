import { createWithReturnData, WebApiConfig } from "dataverse-webapi/lib/node";
import { msnfp_DonorCommitment } from "../dataverse-types/entities/msnfp_DonorCommitment";

export const dynamicsDonorCommitment = (accessToken: string) => {
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
  return {
    createDonorCommitment: async (commitmentData: msnfp_DonorCommitment) => {
      const {
        msnfp_name,
        msnfp_commitmentdate,
        msnfp_isbookable,
        msnfp_pledgedbycontactid,
        msnfp_totalamount,
        msiati_description,
        msnfp_commitmenttype,
      } = commitmentData;

      const commitment = await createWithReturnData(
        config,
        "msnfp_donorcommitments",
        {
          msnfp_name,
          msnfp_commitmentdate,
          msnfp_isbookable,
          "msnfp_PledgedByContactId@odata.bind": `/contacts(${msnfp_pledgedbycontactid})`,
          msnfp_totalamount,
          msiati_description,
          msnfp_commitmenttype,
        },
        "$select=msnfp_donorcommitmentid"
      );

      return commitment;
    },
  };
};
