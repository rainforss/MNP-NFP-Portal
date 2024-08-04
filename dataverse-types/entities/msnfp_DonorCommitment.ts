/* eslint-disable*/
import { IEntity } from "dataverse-ify";
// Entity msnfp_DonorCommitment
export const msnfp_donorcommitmentMetadata = {
  typeName: "mscrm.msnfp_donorcommitment",
  logicalName: "msnfp_donorcommitment",
  collectionName: "msnfp_donorcommitments",
  primaryIdAttribute: "msnfp_donorcommitmentid",
  attributeTypes: {
    // Numeric Types
    exchangerate: "Decimal",
    importsequencenumber: "Integer",
    msnfp_nextpaymentamount: "Money",
    msnfp_nextpaymentamount_base: "Money",
    msnfp_totalamount: "Money",
    msnfp_totalamount_base: "Money",
    timezoneruleversionnumber: "Integer",
    utcconversiontimezonecode: "Integer",
    versionnumber: "BigInt",
    // Optionsets
    mnp_commitmenttype: "Optionset",
    msiati_transactiontype: "Optionset",
    msnfp_anonymity: "Optionset",
    msnfp_commitmenttype: "Optionset",
    msnfp_dataentrysource: "Optionset",
    statecode: "Optionset",
    statuscode: "Optionset",
    // Date Formats
    createdon: "DateAndTime:UserLocal",
    modifiedon: "DateAndTime:UserLocal",
    msiati_currencyvaluedate: "DateOnly:UserLocal",
    msnfp_bookdate: "DateOnly:UserLocal",
    msnfp_commitmentdate: "DateOnly:UserLocal",
    msnfp_expectedbydate: "DateOnly:UserLocal",
    msnfp_nextpaymentdate: "DateOnly:UserLocal",
    msnfp_receiveddate: "DateOnly:UserLocal",
    overriddencreatedon: "DateOnly:UserLocal",
  },
  navigation: {
    transactioncurrencyid: ["mscrm.transactioncurrency"],
    owninguser: ["mscrm.systemuser"],
    owningteam: ["mscrm.team"],
    owningbusinessunit: ["mscrm.businessunit"],
    ownerid: ["mscrm.principal"],
    msnfp_pledgedbyaccountid: ["mscrm.account"],
    msnfp_PledgedOnAccountId: ["mscrm.account"],
    msnfp_PledgedByContactId: ["mscrm.contact"],
    msnfp_DonorCommitment_PlannedGivingId: ["mscrm.msnfp_plannedgiving"],
    msnfp_Commitment_DefaultDesignationId: ["mscrm.msnfp_designation"],
    msiati_tiedstatusid: ["mscrm.msiati_nonembeddedcodelist"],
    msiati_recipientregionid: ["mscrm.msiati_nonembeddedcodelist"],
    msiati_recipientorganizationid: ["mscrm.account"],
    msiati_recipientcountryid: ["mscrm.msiati_nonembeddedcodelist"],
    msiati_providerorganizationid: ["mscrm.account"],
    msiati_flowtypeid: ["mscrm.msiati_nonembeddedcodelist"],
    msiati_financetypeid: ["mscrm.msiati_nonembeddedcodelist"],
    msiati_disbursementchannelid: ["mscrm.msiati_nonembeddedcodelist"],
    modifiedonbehalfby: ["mscrm.systemuser"],
    modifiedby: ["mscrm.systemuser"],
    mnp_OriginatingOpportunity: ["mscrm.opportunity"],
    createdonbehalfby: ["mscrm.systemuser"],
    createdby: ["mscrm.systemuser"],
  },
};

// Attribute constants
export const enum msnfp_DonorCommitmentAttributes {
  CreatedBy = "createdby",
  CreatedByName = "createdbyname",
  CreatedByYomiName = "createdbyyominame",
  CreatedOn = "createdon",
  CreatedOnBehalfBy = "createdonbehalfby",
  CreatedOnBehalfByName = "createdonbehalfbyname",
  CreatedOnBehalfByYomiName = "createdonbehalfbyyominame",
  ExchangeRate = "exchangerate",
  ImportSequenceNumber = "importsequencenumber",
  mnp_CommitmentType = "mnp_commitmenttype",
  mnp_InMemoryOfName = "mnp_inmemoryofname",
  mnp_OriginatingOpportunity = "mnp_originatingopportunity",
  mnp_OriginatingOpportunityName = "mnp_originatingopportunityname",
  mnp_RecipientEmail = "mnp_recipientemail",
  mnp_RecipientName = "mnp_recipientname",
  mnp_SourcePageURL = "mnp_sourcepageurl",
  mnp_TributeMessage = "mnp_tributemessage",
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
  msiati_providerorganizationid = "msiati_providerorganizationid",
  msiati_providerorganizationidName = "msiati_providerorganizationidname",
  msiati_providerorganizationidYomiName = "msiati_providerorganizationidyominame",
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
  msiati_transactiontype = "msiati_transactiontype",
  msnfp_Anonymity = "msnfp_anonymity",
  msnfp_BookDate = "msnfp_bookdate",
  msnfp_Commitment_DefaultDesignationId = "msnfp_commitment_defaultdesignationid",
  msnfp_Commitment_DefaultDesignationIdName = "msnfp_commitment_defaultdesignationidname",
  msnfp_CommitmentDate = "msnfp_commitmentdate",
  msnfp_CommitmentType = "msnfp_commitmenttype",
  msnfp_DataEntryReference = "msnfp_dataentryreference",
  msnfp_DataEntrySource = "msnfp_dataentrysource",
  msnfp_DonorCommitment_PlannedGivingId = "msnfp_donorcommitment_plannedgivingid",
  msnfp_DonorCommitment_PlannedGivingIdName = "msnfp_donorcommitment_plannedgivingidname",
  msnfp_DonorCommitmentId = "msnfp_donorcommitmentid",
  msnfp_ExpectedByDate = "msnfp_expectedbydate",
  msnfp_IsBookable = "msnfp_isbookable",
  msnfp_Name = "msnfp_name",
  msnfp_NextPaymentAmount = "msnfp_nextpaymentamount",
  msnfp_nextpaymentamount_Base = "msnfp_nextpaymentamount_base",
  msnfp_NextPaymentDate = "msnfp_nextpaymentdate",
  msnfp_pledgedbyaccountid = "msnfp_pledgedbyaccountid",
  msnfp_pledgedbyaccountidName = "msnfp_pledgedbyaccountidname",
  msnfp_pledgedbyaccountidYomiName = "msnfp_pledgedbyaccountidyominame",
  msnfp_PledgedByContactId = "msnfp_pledgedbycontactid",
  msnfp_PledgedByContactIdName = "msnfp_pledgedbycontactidname",
  msnfp_PledgedByContactIdYomiName = "msnfp_pledgedbycontactidyominame",
  msnfp_PledgedOnAccountId = "msnfp_pledgedonaccountid",
  msnfp_PledgedOnAccountIdName = "msnfp_pledgedonaccountidname",
  msnfp_PledgedOnAccountIdYomiName = "msnfp_pledgedonaccountidyominame",
  msnfp_ReceivedDate = "msnfp_receiveddate",
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
export interface msnfp_DonorCommitment extends IEntity {
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
  // Commitment Type msnfp_commitmenttype
  mnp_commitmenttype?: import("../enums/msnfp_commitmenttype").msnfp_commitmenttype | null;
  // In Memory Of Name StringType
  mnp_inmemoryofname?: string | null;
  // Originating Opportunity LookupType
  mnp_originatingopportunity?: import("dataverse-ify").EntityReference | null;
  //  StringType
  mnp_originatingopportunityname?: string | null;
  // Recipient Email StringType
  mnp_recipientemail?: string | null;
  // Recipient Name StringType
  mnp_recipientname?: string | null;
  // Source Page URL StringType
  mnp_sourcepageurl?: string | null;
  // Tribute Message StringType
  mnp_tributemessage?: string | null;
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
  msiati_providerorganizationid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msiati_providerorganizationidname?: string | null;
  //  StringType
  msiati_providerorganizationidyominame?: string | null;
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
  // Transaction Type msnfp_donorcommitment_msiati_msnfp_donorcommitment_msiati_transactiontype The type of transaction.
  msiati_transactiontype?: import("../enums/msnfp_donorcommitment_msiati_msnfp_donorcommitment_msiati_transactiontype").msnfp_donorcommitment_msiati_msnfp_donorcommitment_msiati_transactiontype | null;
  // Anonymity msnfp_donorcommitment_new_msnfp_donorcommitment_msnfp_anonymity
  msnfp_anonymity?: import("../enums/msnfp_donorcommitment_new_msnfp_donorcommitment_msnfp_anonymity").msnfp_donorcommitment_new_msnfp_donorcommitment_msnfp_anonymity | null;
  // Book Date DateTimeType The date on which revenue will be recognized DateOnly:UserLocal
  msnfp_bookdate?: Date | null;
  // Default Designation LookupType Default Designation
  msnfp_commitment_defaultdesignationid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msnfp_commitment_defaultdesignationidname?: string | null;
  // Commitment Date DateTimeType This is the date that the donor made the commitment, not necessarily the date that the commitment was entered into the system. DateOnly:UserLocal
  msnfp_commitmentdate?: Date | null;
  // Commitment Type msnfp_donorcommitment_new_msnfp_donorcommitment_msnfp_commitmenttype
  msnfp_commitmenttype?: import("../enums/msnfp_donorcommitment_new_msnfp_donorcommitment_msnfp_commitmenttype").msnfp_donorcommitment_new_msnfp_donorcommitment_msnfp_commitmenttype | null;
  // Data Entry Reference StringType
  msnfp_dataentryreference?: string | null;
  // Data Entry Source msnfp_donorcommitment_new_msnfp_donorcommitment_msnfp_dataentrysource
  msnfp_dataentrysource?: import("../enums/msnfp_donorcommitment_new_msnfp_donorcommitment_msnfp_dataentrysource").msnfp_donorcommitment_new_msnfp_donorcommitment_msnfp_dataentrysource | null;
  // Planned Giving LookupType Planned Giving
  msnfp_donorcommitment_plannedgivingid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msnfp_donorcommitment_plannedgivingidname?: string | null;
  // Donor Commitment UniqueidentifierType Unique identifier for entity instances
  msnfp_donorcommitmentid?: import("dataverse-ify").Guid | null;
  // Expected By Date DateTimeType DateOnly:UserLocal
  msnfp_expectedbydate?: Date | null;
  // Is Bookable BooleanType
  msnfp_isbookable?: boolean | null;
  // Name [Required] StringType
  msnfp_name?: string;
  // Next Payment Amount MoneyType
  msnfp_nextpaymentamount?: number | null;
  // Next Payment Amount (Base) MoneyType Value of the Next Payment Amount in base currency.
  msnfp_nextpaymentamount_base?: number | null;
  // Next Payment Date DateTimeType DateOnly:UserLocal
  msnfp_nextpaymentdate?: Date | null;
  // Pledged By Account LookupType Unique identifier for Account associated with Donor Commitment.
  msnfp_pledgedbyaccountid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msnfp_pledgedbyaccountidname?: string | null;
  //  StringType
  msnfp_pledgedbyaccountidyominame?: string | null;
  // Pledged By Contact LookupType Pledged By Contact
  msnfp_pledgedbycontactid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msnfp_pledgedbycontactidname?: string | null;
  //  StringType
  msnfp_pledgedbycontactidyominame?: string | null;
  // Pledged On Account LookupType Pledged On Account
  msnfp_pledgedonaccountid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msnfp_pledgedonaccountidname?: string | null;
  //  StringType
  msnfp_pledgedonaccountidyominame?: string | null;
  // Received Date DateTimeType DateOnly:UserLocal
  msnfp_receiveddate?: Date | null;
  // Total Amount MoneyType
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
  // Status msnfp_donorcommitment_msnfp_donorcommitment_statecode Status of the Donor Commitment
  statecode?: import("../enums/msnfp_donorcommitment_msnfp_donorcommitment_statecode").msnfp_donorcommitment_msnfp_donorcommitment_statecode | null;
  // Status Reason msnfp_donorcommitment_msnfp_donorcommitment_statuscode Reason for the status of the Donor Commitment
  statuscode?: import("../enums/msnfp_donorcommitment_msnfp_donorcommitment_statuscode").msnfp_donorcommitment_msnfp_donorcommitment_statuscode | null;
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
