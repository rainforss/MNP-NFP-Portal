/* eslint-disable*/
import { IEntity } from "dataverse-ify";
// Entity msnfp_Transaction
export const msnfp_transactionMetadata = {
  typeName: "mscrm.msnfp_transaction",
  logicalName: "msnfp_transaction",
  collectionName: "msnfp_transactions",
  primaryIdAttribute: "msnfp_transactionid",
  attributeTypes: {
    // Numeric Types
    exchangerate: "Decimal",
    importsequencenumber: "Integer",
    msnfp_amount: "Money",
    msnfp_amount_base: "Money",
    timezoneruleversionnumber: "Integer",
    utcconversiontimezonecode: "Integer",
    versionnumber: "BigInt",
    // Optionsets
    msnfp_adjustmentreason: "Optionset",
    msnfp_adjustmenttype: "Optionset",
    msnfp_anonymity: "Optionset",
    msnfp_dataentrysource: "Optionset",
    statecode: "Optionset",
    statuscode: "Optionset",
    // Date Formats
    createdon: "DateAndTime:UserLocal",
    modifiedon: "DateAndTime:UserLocal",
    msiati_currencyvaluedate: "DateOnly:UserLocal",
    msnfp_bookdate: "DateAndTime:UserLocal",
    msnfp_exchangeratedate: "DateAndTime:UserLocal",
    msnfp_posteddate: "DateOnly:UserLocal",
    msnfp_receiveddate: "DateOnly:UserLocal",
    overriddencreatedon: "DateOnly:UserLocal",
  },
  navigation: {
    transactioncurrencyid: ["mscrm.transactioncurrency"],
    owninguser: ["mscrm.systemuser"],
    owningteam: ["mscrm.team"],
    owningbusinessunit: ["mscrm.businessunit"],
    ownerid: ["mscrm.principal"],
    msnfp_receiptoncontactid: ["mscrm.contact"],
    msnfp_Transaction_ReceiptOnAccountId: ["mscrm.account"],
    msnfp_Transaction_PaymentScheduleId: ["mscrm.msnfp_paymentschedule"],
    msnfp_Transaction_PaymentMethodId: ["mscrm.msnfp_paymentmethod"],
    msnfp_OriginalTxnAdjustedId: ["mscrm.msnfp_transaction"],
    msiati_tiedstatusid: ["mscrm.msiati_nonembeddedcodelist"],
    msiati_recipientregionid: ["mscrm.msiati_nonembeddedcodelist"],
    msiati_recipientorganizationid: ["mscrm.account"],
    msiati_recipientcountryid: ["mscrm.msiati_nonembeddedcodelist"],
    msiati_provideriorganizationid: ["mscrm.account"],
    msiati_flowtypeid: ["mscrm.msiati_nonembeddedcodelist"],
    msiati_financetypeid: ["mscrm.msiati_nonembeddedcodelist"],
    msiati_disbursementchannelid: ["mscrm.msiati_nonembeddedcodelist"],
    modifiedonbehalfby: ["mscrm.systemuser"],
    modifiedby: ["mscrm.systemuser"],
    createdonbehalfby: ["mscrm.systemuser"],
    createdby: ["mscrm.systemuser"],
  },
};

// Attribute constants
export const enum msnfp_TransactionAttributes {
  CreatedBy = "createdby",
  CreatedByName = "createdbyname",
  CreatedByYomiName = "createdbyyominame",
  CreatedOn = "createdon",
  CreatedOnBehalfBy = "createdonbehalfby",
  CreatedOnBehalfByName = "createdonbehalfbyname",
  CreatedOnBehalfByYomiName = "createdonbehalfbyyominame",
  ExchangeRate = "exchangerate",
  ImportSequenceNumber = "importsequencenumber",
  mnp_StripePaymentIntentId = "mnp_stripepaymentintentid",
  ModifiedBy = "modifiedby",
  ModifiedByName = "modifiedbyname",
  ModifiedByYomiName = "modifiedbyyominame",
  ModifiedOn = "modifiedon",
  ModifiedOnBehalfBy = "modifiedonbehalfby",
  ModifiedOnBehalfByName = "modifiedonbehalfbyname",
  ModifiedOnBehalfByYomiName = "modifiedonbehalfbyyominame",
  msiati_currencyvaluedate = "msiati_currencyvaluedate",
  msiati_description = "msiati_description",
  msiati_disbursementchannelid = "msiati_disbursementchannelid",
  msiati_disbursementchannelidName = "msiati_disbursementchannelidname",
  msiati_financetypeid = "msiati_financetypeid",
  msiati_financetypeidName = "msiati_financetypeidname",
  msiati_flowtypeid = "msiati_flowtypeid",
  msiati_flowtypeidName = "msiati_flowtypeidname",
  msiati_humanitarian = "msiati_humanitarian",
  msiati_provideractivityidentifier = "msiati_provideractivityidentifier",
  msiati_provideriorganizationid = "msiati_provideriorganizationid",
  msiati_provideriorganizationidName = "msiati_provideriorganizationidname",
  msiati_provideriorganizationidYomiName = "msiati_provideriorganizationidyominame",
  msiati_recipientactivityidentifier = "msiati_recipientactivityidentifier",
  msiati_recipientcountrydescription = "msiati_recipientcountrydescription",
  msiati_recipientcountryid = "msiati_recipientcountryid",
  msiati_recipientcountryidName = "msiati_recipientcountryidname",
  msiati_recipientorganizationid = "msiati_recipientorganizationid",
  msiati_recipientorganizationidName = "msiati_recipientorganizationidname",
  msiati_recipientorganizationidYomiName = "msiati_recipientorganizationidyominame",
  msiati_recipientregiondescription = "msiati_recipientregiondescription",
  msiati_recipientregionid = "msiati_recipientregionid",
  msiati_recipientregionidName = "msiati_recipientregionidname",
  msiati_reference = "msiati_reference",
  msiati_tiedstatusid = "msiati_tiedstatusid",
  msiati_tiedstatusidName = "msiati_tiedstatusidname",
  msnfp_AdjustmentComment = "msnfp_adjustmentcomment",
  msnfp_AdjustmentReason = "msnfp_adjustmentreason",
  msnfp_AdjustmentType = "msnfp_adjustmenttype",
  msnfp_Amount = "msnfp_amount",
  msnfp_amount_Base = "msnfp_amount_base",
  msnfp_Anonymity = "msnfp_anonymity",
  msnfp_BookDate = "msnfp_bookdate",
  msnfp_DataEntryReference = "msnfp_dataentryreference",
  msnfp_DataEntrySource = "msnfp_dataentrysource",
  msnfp_EffectiveSourceCode = "msnfp_effectivesourcecode",
  msnfp_ExchangeRateDate = "msnfp_exchangeratedate",
  msnfp_IsAdjusted = "msnfp_isadjusted",
  msnfp_Name = "msnfp_name",
  msnfp_OriginalTxnAdjustedId = "msnfp_originaltxnadjustedid",
  msnfp_OriginalTxnAdjustedIdName = "msnfp_originaltxnadjustedidname",
  msnfp_OriginatingSourceCode = "msnfp_originatingsourcecode",
  msnfp_PostedDate = "msnfp_posteddate",
  msnfp_receiptoncontactid = "msnfp_receiptoncontactid",
  msnfp_receiptoncontactidName = "msnfp_receiptoncontactidname",
  msnfp_receiptoncontactidYomiName = "msnfp_receiptoncontactidyominame",
  msnfp_ReceivedDate = "msnfp_receiveddate",
  msnfp_Transaction_PaymentMethodId = "msnfp_transaction_paymentmethodid",
  msnfp_Transaction_PaymentMethodIdName = "msnfp_transaction_paymentmethodidname",
  msnfp_Transaction_PaymentScheduleId = "msnfp_transaction_paymentscheduleid",
  msnfp_Transaction_PaymentScheduleIdName = "msnfp_transaction_paymentscheduleidname",
  msnfp_Transaction_ReceiptOnAccountId = "msnfp_transaction_receiptonaccountid",
  msnfp_Transaction_ReceiptOnAccountIdName = "msnfp_transaction_receiptonaccountidname",
  msnfp_Transaction_ReceiptOnAccountIdYomiName = "msnfp_transaction_receiptonaccountidyominame",
  msnfp_TransactionId = "msnfp_transactionid",
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
export interface msnfp_Transaction extends IEntity {
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
  // Stripe Payment Intent Id StringType
  mnp_stripepaymentintentid?: string | null;
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
  // Currency Value Date DateTimeType The date on which the transaction was made or agreed. DateOnly:UserLocal
  msiati_currencyvaluedate?: Date | null;
  // Description MemoType A description of the transaction.
  msiati_description?: string | null;
  // Disbursement Channel LookupType The channel through which the funds will flow for this transaction.
  msiati_disbursementchannelid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msiati_disbursementchannelidname?: string | null;
  // Finance Type LookupType The type of finance (e.g. grant, loan, debt relief, etc.).
  msiati_financetypeid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msiati_financetypeidname?: string | null;
  // Flow Type LookupType Whether the transaction is funded by Official Development Assistance (ODA), Other Official Flows (OOF), etc.
  msiati_flowtypeid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msiati_flowtypeidname?: string | null;
  // Humanitarian BooleanType Indicates that this transaction relates entirely or partially to humanitarian aid.
  msiati_humanitarian?: boolean | null;
  // Provider Activity Identifier StringType If incoming funds are being provided from the budget of another activity, record the activity's unique identifier.
  msiati_provideractivityidentifier?: string | null;
  // Provider Organization LookupType The organization from which the transaction originated.
  msiati_provideriorganizationid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msiati_provideriorganizationidname?: string | null;
  //  StringType
  msiati_provideriorganizationidyominame?: string | null;
  // Recipient Activity Identifier StringType If outgoing funds are being provided to another activity, record the activity's unique identifier.
  msiati_recipientactivityidentifier?: string | null;
  // Recipient Country Description MemoType A description of the recipient country.
  msiati_recipientcountrydescription?: string | null;
  // Recipient Country LookupType A country that will benefit from this transaction.
  msiati_recipientcountryid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msiati_recipientcountryidname?: string | null;
  // Recipient Organization LookupType The organization receiving the money from the transaction.
  msiati_recipientorganizationid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msiati_recipientorganizationidname?: string | null;
  //  StringType
  msiati_recipientorganizationidyominame?: string | null;
  // Recipient Region Description MemoType A description of the recipient region.
  msiati_recipientregiondescription?: string | null;
  // Recipient Region LookupType A region that will benefit from this transaction.
  msiati_recipientregionid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msiati_recipientregionidname?: string | null;
  // Reference StringType An internal reference linking this transaction back to the publisher’s financial management system.
  msiati_reference?: string | null;
  // Tied Status LookupType Whether the aid is untied, tied, or partially tied.
  msiati_tiedstatusid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msiati_tiedstatusidname?: string | null;
  // Adjustment Comment MemoType Any notes or details about the adjustment that the user may have optionally entered.
  msnfp_adjustmentcomment?: string | null;
  // Adjustment Reason msnfp_transaction_new_msnfp_transaction_msnfp_adjustmentreason
  msnfp_adjustmentreason?: import("../enums/msnfp_transaction_new_msnfp_transaction_msnfp_adjustmentreason").msnfp_transaction_new_msnfp_transaction_msnfp_adjustmentreason | null;
  // Adjustment Type msnfp_transaction_new_msnfp_transaction_msnfp_adjustmenttype
  msnfp_adjustmenttype?: import("../enums/msnfp_transaction_new_msnfp_transaction_msnfp_adjustmenttype").msnfp_transaction_new_msnfp_transaction_msnfp_adjustmenttype | null;
  // Amount [Required] MoneyType
  msnfp_amount?: number;
  // Amount (Base) MoneyType Value of the Amount in base currency.
  msnfp_amount_base?: number | null;
  // Anonymity msnfp_transaction_new_msnfp_transaction_msnfp_anonymity
  msnfp_anonymity?: import("../enums/msnfp_transaction_new_msnfp_transaction_msnfp_anonymity").msnfp_transaction_new_msnfp_transaction_msnfp_anonymity | null;
  // Book Date [Required] DateTimeType DateAndTime:UserLocal
  msnfp_bookdate?: Date;
  // Data Entry Reference StringType Tracks data origin of payment transactions. References may be channel-specific.
  msnfp_dataentryreference?: string | null;
  // Data Entry Source [Required] msnfp_transaction_new_msnfp_transaction_msnfp_dataentrysource
  msnfp_dataentrysource?: import("../enums/msnfp_transaction_new_msnfp_transaction_msnfp_dataentrysource").msnfp_transaction_new_msnfp_transaction_msnfp_dataentrysource;
  // Effective Source Code StringType
  msnfp_effectivesourcecode?: string | null;
  // Exchange Rate Date DateTimeType The date and time at which the currency exchange rate was determined DateAndTime:UserLocal
  msnfp_exchangeratedate?: Date | null;
  // Is Adjusted [Required] BooleanType Indicates that this transaction has been adjusted by a later transaction.
  msnfp_isadjusted?: boolean;
  // Name [Required] StringType
  msnfp_name?: string;
  // Original Transaction Adjusted LookupType Original Transaction Adjusted
  msnfp_originaltxnadjustedid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msnfp_originaltxnadjustedidname?: string | null;
  // Originating Source Code StringType The marketing segmentation source code.
  msnfp_originatingsourcecode?: string | null;
  // Posted Date DateTimeType DateOnly:UserLocal
  msnfp_posteddate?: Date | null;
  // Receipt On Contact LookupType Unique identifier for Contact associated with Transaction.
  msnfp_receiptoncontactid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msnfp_receiptoncontactidname?: string | null;
  //  StringType
  msnfp_receiptoncontactidyominame?: string | null;
  // Received Date [Required] DateTimeType DateOnly:UserLocal
  msnfp_receiveddate?: Date;
  // Payment Method LookupType Payment Method
  msnfp_transaction_paymentmethodid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msnfp_transaction_paymentmethodidname?: string | null;
  // Payment Schedule LookupType Payment Schedule
  msnfp_transaction_paymentscheduleid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msnfp_transaction_paymentscheduleidname?: string | null;
  // Receipt On Account LookupType Receipt On Account
  msnfp_transaction_receiptonaccountid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msnfp_transaction_receiptonaccountidname?: string | null;
  //  StringType
  msnfp_transaction_receiptonaccountidyominame?: string | null;
  // Transaction UniqueidentifierType Unique identifier for entity instances
  msnfp_transactionid?: import("dataverse-ify").Guid | null;
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
  // Status msnfp_transaction_msnfp_transaction_statecode Status of the Transaction
  statecode?: import("../enums/msnfp_transaction_msnfp_transaction_statecode").msnfp_transaction_msnfp_transaction_statecode | null;
  // Status Reason msnfp_transaction_msnfp_transaction_statuscode Reason for the status of the Transaction
  statuscode?: import("../enums/msnfp_transaction_msnfp_transaction_statuscode").msnfp_transaction_msnfp_transaction_statuscode | null;
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
