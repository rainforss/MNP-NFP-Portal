/* eslint-disable*/
import { IEntity } from "dataverse-ify";
// Entity msnfp_PaymentSchedule
export const msnfp_paymentscheduleMetadata = {
  typeName: "mscrm.msnfp_paymentschedule",
  logicalName: "msnfp_paymentschedule",
  collectionName: "msnfp_paymentschedules",
  primaryIdAttribute: "msnfp_paymentscheduleid",
  attributeTypes: {
    // Numeric Types
    exchangerate: "Decimal",
    importsequencenumber: "Integer",
    msnfp_frequencyinterval: "Integer",
    msnfp_nextpaymentamount: "Money",
    msnfp_nextpaymentamount_base: "Money",
    msnfp_numberofpayments: "Integer",
    msnfp_recurringamount: "Money",
    msnfp_recurringamount_base: "Money",
    msnfp_totalamount: "Money",
    msnfp_totalamount_base: "Money",
    timezoneruleversionnumber: "Integer",
    utcconversiontimezonecode: "Integer",
    versionnumber: "BigInt",
    // Optionsets
    mnp_dataentrytype: "Optionset",
    msnfp_frequency: "Optionset",
    statecode: "Optionset",
    statuscode: "Optionset",
    // Date Formats
    createdon: "DateAndTime:UserLocal",
    modifiedon: "DateAndTime:UserLocal",
    msnfp_firstpaymentdate: "DateOnly:UserLocal",
    msnfp_lastpaymentdate: "DateOnly:UserLocal",
    msnfp_nextpaymentdate: "DateOnly:UserLocal",
    overriddencreatedon: "DateOnly:UserLocal",
  },
  navigation: {
    transactioncurrencyid: ["mscrm.transactioncurrency"],
    owninguser: ["mscrm.systemuser"],
    owningteam: ["mscrm.team"],
    owningbusinessunit: ["mscrm.businessunit"],
    ownerid: ["mscrm.principal"],
    msnfp_omtSched_defaultHardCreditToCustomer_contact: ["mscrm.contact"],
    msnfp_omtSched_defaultHardCreditToCustomer_account: ["mscrm.account"],
    msnfp_ReceiptOnAccountId: ["mscrm.account"],
    msnfp_PaymentSchedule_DonorCommitmentId: ["mscrm.msnfp_donorcommitment"],
    modifiedonbehalfby: ["mscrm.systemuser"],
    modifiedby: ["mscrm.systemuser"],
    createdonbehalfby: ["mscrm.systemuser"],
    createdby: ["mscrm.systemuser"],
  },
};

// Attribute constants
export const enum msnfp_PaymentScheduleAttributes {
  CreatedBy = "createdby",
  CreatedByName = "createdbyname",
  CreatedByYomiName = "createdbyyominame",
  CreatedOn = "createdon",
  CreatedOnBehalfBy = "createdonbehalfby",
  CreatedOnBehalfByName = "createdonbehalfbyname",
  CreatedOnBehalfByYomiName = "createdonbehalfbyyominame",
  ExchangeRate = "exchangerate",
  ImportSequenceNumber = "importsequencenumber",
  mnp_DataEntryType = "mnp_dataentrytype",
  mnp_StripeSubscriptionId = "mnp_stripesubscriptionid",
  ModifiedBy = "modifiedby",
  ModifiedByName = "modifiedbyname",
  ModifiedByYomiName = "modifiedbyyominame",
  ModifiedOn = "modifiedon",
  ModifiedOnBehalfBy = "modifiedonbehalfby",
  ModifiedOnBehalfByName = "modifiedonbehalfbyname",
  ModifiedOnBehalfByYomiName = "modifiedonbehalfbyyominame",
  msnfp_FirstPaymentDate = "msnfp_firstpaymentdate",
  msnfp_Frequency = "msnfp_frequency",
  msnfp_FrequencyInterval = "msnfp_frequencyinterval",
  msnfp_LastPaymentDate = "msnfp_lastpaymentdate",
  msnfp_Name = "msnfp_name",
  msnfp_NextPaymentAmount = "msnfp_nextpaymentamount",
  msnfp_nextpaymentamount_Base = "msnfp_nextpaymentamount_base",
  msnfp_NextPaymentDate = "msnfp_nextpaymentdate",
  msnfp_NumberOfPayments = "msnfp_numberofpayments",
  msnfp_omtSched_defaultHardCreditToCustomer = "msnfp_omtsched_defaulthardcredittocustomer",
  msnfp_omtSched_defaultHardCreditToCustomerIdType = "msnfp_omtsched_defaulthardcredittocustomeridtype",
  msnfp_omtSched_defaultHardCreditToCustomerName = "msnfp_omtsched_defaulthardcredittocustomername",
  msnfp_omtSched_defaultHardCreditToCustomerYomiName = "msnfp_omtsched_defaulthardcredittocustomeryominame",
  msnfp_PaymentSchedule_DonorCommitmentId = "msnfp_paymentschedule_donorcommitmentid",
  msnfp_PaymentSchedule_DonorCommitmentIdName = "msnfp_paymentschedule_donorcommitmentidname",
  msnfp_PaymentScheduleId = "msnfp_paymentscheduleid",
  msnfp_ReceiptOnAccountId = "msnfp_receiptonaccountid",
  msnfp_ReceiptOnAccountIdName = "msnfp_receiptonaccountidname",
  msnfp_ReceiptOnAccountIdYomiName = "msnfp_receiptonaccountidyominame",
  msnfp_RecurringAmount = "msnfp_recurringamount",
  msnfp_recurringamount_Base = "msnfp_recurringamount_base",
  msnfp_TotalAmount = "msnfp_totalamount",
  msnfp_totalamount_Base = "msnfp_totalamount_base",
  OverriddenCreatedOn = "overriddencreatedon",
  OwnerId = "ownerid",
  OwnerIdName = "owneridname",
  OwnerIdType = "owneridtype",
  OwnerIdYomiName = "owneridyominame",
  OwningBusinessUnit = "owningbusinessunit",
  OwningBusinessUnitName = "owningbusinessunitname",
  OwningTeam = "owningteam",
  OwningUser = "owninguser",
  statecode = "statecode",
  statuscode = "statuscode",
  TimeZoneRuleVersionNumber = "timezoneruleversionnumber",
  TransactionCurrencyId = "transactioncurrencyid",
  TransactionCurrencyIdName = "transactioncurrencyidname",
  UTCConversionTimeZoneCode = "utcconversiontimezonecode",
  VersionNumber = "versionnumber",
}

// Early Bound Interface
export interface msnfp_PaymentSchedule extends IEntity {
  // Created By LookupType Unique identifier of the user who created the record.
  createdby?: import("dataverse-ify").EntityReference | null;
  //  StringType
  createdbyname?: string | null;
  //  StringType
  createdbyyominame?: string | null;
  // Created On DateTimeType Date and time when the record was created. DateAndTime:UserLocal
  createdon?: Date | null;
  // Created By (Delegate) LookupType Unique identifier of the delegate user who created the record.
  createdonbehalfby?: import("dataverse-ify").EntityReference | null;
  //  StringType
  createdonbehalfbyname?: string | null;
  //  StringType
  createdonbehalfbyyominame?: string | null;
  // Exchange Rate DecimalType Exchange rate for the currency associated with the entity with respect to the base currency.
  exchangerate?: number | null;
  // Import Sequence Number IntegerType Sequence number of the import that created this record.
  importsequencenumber?: number | null;
  // Data Entry Type msnfp_dataentrytype
  mnp_dataentrytype?: import("../enums/msnfp_dataentrytype").msnfp_dataentrytype | null;
  // Stripe Subscription Id StringType
  mnp_stripesubscriptionid?: string | null;
  // Modified By LookupType Unique identifier of the user who modified the record.
  modifiedby?: import("dataverse-ify").EntityReference | null;
  //  StringType
  modifiedbyname?: string | null;
  //  StringType
  modifiedbyyominame?: string | null;
  // Modified On DateTimeType Date and time when the record was modified. DateAndTime:UserLocal
  modifiedon?: Date | null;
  // Modified By (Delegate) LookupType Unique identifier of the delegate user who modified the record.
  modifiedonbehalfby?: import("dataverse-ify").EntityReference | null;
  //  StringType
  modifiedonbehalfbyname?: string | null;
  //  StringType
  modifiedonbehalfbyyominame?: string | null;
  // First Payment Date [Required] DateTimeType Date of first payment DateOnly:UserLocal
  msnfp_firstpaymentdate?: Date;
  // Frequency [Required] msnfp_paymentschedule_new_msnfp_paymentschedule_msnfp_frequency iCal compliant recurrence field
  msnfp_frequency?: import("../enums/msnfp_paymentschedule_new_msnfp_paymentschedule_msnfp_frequency").msnfp_paymentschedule_new_msnfp_paymentschedule_msnfp_frequency;
  // Frequency Interval [Required] IntegerType iCal compliant recurrence field
  msnfp_frequencyinterval?: number;
  // Last Payment Date DateTimeType The date by which the payment schedule is expected to be fully paid. DateOnly:UserLocal
  msnfp_lastpaymentdate?: Date | null;
  // Name [Required] StringType
  msnfp_name?: string;
  // Next Payment Amount MoneyType
  msnfp_nextpaymentamount?: number | null;
  // Next Payment Amount (Base) MoneyType Value of the Next Payment Amount in base currency.
  msnfp_nextpaymentamount_base?: number | null;
  // Next Payment Date DateTimeType DateOnly:UserLocal
  msnfp_nextpaymentdate?: Date | null;
  // Number of Payments IntegerType
  msnfp_numberofpayments?: number | null;
  // Default Hard Credit To Customer CustomerType
  msnfp_omtsched_defaulthardcredittocustomer?: import("dataverse-ify").EntityReference | null;
  //  EntityNameType
  msnfp_omtsched_defaulthardcredittocustomeridtype?: string | null;
  //  StringType
  msnfp_omtsched_defaulthardcredittocustomername?: string | null;
  //  StringType
  msnfp_omtsched_defaulthardcredittocustomeryominame?: string | null;
  // Donor Commitment LookupType Donor Commitment
  msnfp_paymentschedule_donorcommitmentid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msnfp_paymentschedule_donorcommitmentidname?: string | null;
  // Payment Schedule UniqueidentifierType Unique identifier for entity instances
  msnfp_paymentscheduleid?: import("dataverse-ify").Guid | null;
  // Receipt on Account LookupType Receipt on Account
  msnfp_receiptonaccountid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msnfp_receiptonaccountidname?: string | null;
  //  StringType
  msnfp_receiptonaccountidyominame?: string | null;
  // Recurring Amount [Required] MoneyType This will include both the Base and Donor Currencies
  msnfp_recurringamount?: number;
  // Recurring Amount (Base) MoneyType Value of the Recurring Amount in base currency.
  msnfp_recurringamount_base?: number | null;
  // Total Amount MoneyType This will include both the Base and Donor Currencies
  msnfp_totalamount?: number | null;
  // Total Amount (Base) MoneyType Value of the Total Amount in base currency.
  msnfp_totalamount_base?: number | null;
  // Record Created On DateTimeType Date and time that the record was migrated. DateOnly:UserLocal
  overriddencreatedon?: Date | null;
  // Owner OwnerType Owner Id
  ownerid?: import("dataverse-ify").EntityReference | null;
  //  StringType Name of the owner
  owneridname?: string | null;
  //  EntityNameType Owner Id Type
  owneridtype?: string | null;
  //  StringType Yomi name of the owner
  owneridyominame?: string | null;
  // Owning Business Unit LookupType Unique identifier for the business unit that owns the record
  owningbusinessunit?: import("dataverse-ify").EntityReference | null;
  //  StringType
  owningbusinessunitname?: string | null;
  // Owning Team LookupType Unique identifier for the team that owns the record.
  owningteam?: import("dataverse-ify").EntityReference | null;
  // Owning User LookupType Unique identifier for the user that owns the record.
  owninguser?: import("dataverse-ify").EntityReference | null;
  // Status msnfp_paymentschedule_msnfp_paymentschedule_statecode Status of the Payment Schedule
  statecode?: import("../enums/msnfp_paymentschedule_msnfp_paymentschedule_statecode").msnfp_paymentschedule_msnfp_paymentschedule_statecode | null;
  // Status Reason msnfp_paymentschedule_msnfp_paymentschedule_statuscode Reason for the status of the Payment Schedule
  statuscode?: import("../enums/msnfp_paymentschedule_msnfp_paymentschedule_statuscode").msnfp_paymentschedule_msnfp_paymentschedule_statuscode | null;
  // Time Zone Rule Version Number IntegerType For internal use only.
  timezoneruleversionnumber?: number | null;
  // Currency LookupType Unique identifier of the currency associated with the entity.
  transactioncurrencyid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  transactioncurrencyidname?: string | null;
  // UTC Conversion Time Zone Code IntegerType Time zone code that was in use when the record was created.
  utcconversiontimezonecode?: number | null;
  // Version Number BigIntType Version Number
  versionnumber?: number | null;
}
