/* eslint-disable*/
import { contactMetadata } from "./entities/Contact";
import { msnfp_designationMetadata } from "./entities/msnfp_Designation";
import { msnfp_donorcommitmentMetadata } from "./entities/msnfp_DonorCommitment";
import { msnfp_paymentscheduleMetadata } from "./entities/msnfp_PaymentSchedule";
import { msnfp_transactionMetadata } from "./entities/msnfp_Transaction";

export const Entities = {
  Contact: "contact",
  msnfp_Designation: "msnfp_designation",
  msnfp_DonorCommitment: "msnfp_donorcommitment",
  msnfp_PaymentSchedule: "msnfp_paymentschedule",
  msnfp_Transaction: "msnfp_transaction",
};

// Setup Metadata
// Usage: setMetadataCache(metadataCache);
export const metadataCache = {
  entities: {
    contact: contactMetadata,
    msnfp_designation: msnfp_designationMetadata,
    msnfp_donorcommitment: msnfp_donorcommitmentMetadata,
    msnfp_paymentschedule: msnfp_paymentscheduleMetadata,
    msnfp_transaction: msnfp_transactionMetadata,
  },
  actions: {
  }
};