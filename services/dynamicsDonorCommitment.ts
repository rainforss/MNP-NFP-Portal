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
        mnp_commitmenttype,
        msnfp_commitment_defaultdesignationid,
        mnp_recipientname,
        mnp_recipientemail,
        mnp_inmemoryofname,
        mnp_tributemessage,
        mnp_sourcepageurl,
      } = commitmentData;

      const commitment = await createWithReturnData(
        config,
        "msnfp_donorcommitments",
        {
          msnfp_name,
          msnfp_commitmentdate,
          msnfp_isbookable,
          "msnfp_PledgedByContactId@odata.bind": `/contacts(${msnfp_pledgedbycontactid})`,
          "msnfp_Commitment_DefaultDesignationId@odata.bind": `/msnfp_designations(${msnfp_commitment_defaultdesignationid})`,
          msnfp_totalamount,
          msiati_description,
          mnp_commitmenttype,
          mnp_recipientname,
          mnp_recipientemail,
          mnp_inmemoryofname,
          mnp_tributemessage,
          mnp_sourcepageurl,
          statuscode: 864950001,
          mnp_dataentrytype: 864950002,
        },
        "$select=msnfp_donorcommitmentid"
      );

      if (commitment.error) {
        const error = new Error((commitment.error as any).message);
        error.name = "D365 Error";
        throw error;
      }

      return commitment;
    },
  };
};
