/* eslint-disable*/
import { IEntity } from "dataverse-ify";
// Entity msnfp_Designation
export const msnfp_designationMetadata = {
  typeName: "mscrm.msnfp_designation",
  logicalName: "msnfp_designation",
  collectionName: "msnfp_designations",
  primaryIdAttribute: "msnfp_designationid",
  attributeTypes: {
    // Numeric Types
    exchangerate: "Decimal",
    importsequencenumber: "Integer",
    msnfp_totaldisbursed: "Money",
    msnfp_totaldisbursed_base: "Money",
    timezoneruleversionnumber: "Integer",
    utcconversiontimezonecode: "Integer",
    versionnumber: "BigInt",
    // Optionsets
    msnfp_endowmenttype: "Optionset",
    msnfp_restrictiontype: "Optionset",
    statecode: "Optionset",
    statuscode: "Optionset",
    // Date Formats
    createdon: "DateAndTime:UserLocal",
    modifiedon: "DateAndTime:UserLocal",
    msnfp_enddate: "DateOnly:UserLocal",
    msnfp_startdate: "DateOnly:UserLocal",
    overriddencreatedon: "DateOnly:UserLocal",
  },
  navigation: {
    transactioncurrencyid: ["mscrm.transactioncurrency"],
    owninguser: ["mscrm.systemuser"],
    owningteam: ["mscrm.team"],
    owningbusinessunit: ["mscrm.businessunit"],
    ownerid: ["mscrm.principal"],
    msnfp_ParentDesignationId: ["mscrm.msnfp_designation"],
    modifiedonbehalfby: ["mscrm.systemuser"],
    modifiedby: ["mscrm.systemuser"],
    createdonbehalfby: ["mscrm.systemuser"],
    createdby: ["mscrm.systemuser"],
  },
};

// Attribute constants
export const enum msnfp_DesignationAttributes {
  CreatedBy = "createdby",
  CreatedByName = "createdbyname",
  CreatedByYomiName = "createdbyyominame",
  CreatedOn = "createdon",
  CreatedOnBehalfBy = "createdonbehalfby",
  CreatedOnBehalfByName = "createdonbehalfbyname",
  CreatedOnBehalfByYomiName = "createdonbehalfbyyominame",
  ExchangeRate = "exchangerate",
  ImportSequenceNumber = "importsequencenumber",
  ModifiedBy = "modifiedby",
  ModifiedByName = "modifiedbyname",
  ModifiedByYomiName = "modifiedbyyominame",
  ModifiedOn = "modifiedon",
  ModifiedOnBehalfBy = "modifiedonbehalfby",
  ModifiedOnBehalfByName = "modifiedonbehalfbyname",
  ModifiedOnBehalfByYomiName = "modifiedonbehalfbyyominame",
  msnfp_AcknowledgementName = "msnfp_acknowledgementname",
  msnfp_Description = "msnfp_description",
  msnfp_DesignationCode = "msnfp_designationcode",
  msnfp_DesignationGroup = "msnfp_designationgroup",
  msnfp_DesignationId = "msnfp_designationid",
  msnfp_EndDate = "msnfp_enddate",
  msnfp_EndowmentType = "msnfp_endowmenttype",
  msnfp_GlCreditAccount = "msnfp_glcreditaccount",
  msnfp_GlDebitAccount = "msnfp_gldebitaccount",
  msnfp_Initiative = "msnfp_initiative",
  msnfp_IsActive = "msnfp_isactive",
  msnfp_Name = "msnfp_name",
  msnfp_ParentDesignationId = "msnfp_parentdesignationid",
  msnfp_ParentDesignationIdName = "msnfp_parentdesignationidname",
  msnfp_Program = "msnfp_program",
  msnfp_RestrictionType = "msnfp_restrictiontype",
  msnfp_StartDate = "msnfp_startdate",
  msnfp_TotalDisbursed = "msnfp_totaldisbursed",
  msnfp_totaldisbursed_Base = "msnfp_totaldisbursed_base",
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
export interface msnfp_Designation extends IEntity {
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
  // Acknowledgement Name StringType e.g. "Childhood hunger relief"
  msnfp_acknowledgementname?: string | null;
  // Description MemoType
  msnfp_description?: string | null;
  // Designation Code StringType
  msnfp_designationcode?: string | null;
  // Designation Group StringType
  msnfp_designationgroup?: string | null;
  // Designation UniqueidentifierType Unique identifier for entity instances
  msnfp_designationid?: import("dataverse-ify").Guid | null;
  // End Date DateTimeType DateOnly:UserLocal
  msnfp_enddate?: Date | null;
  // Endowment Type msnfp_designation_new_msnfp_designation_msnfp_endowmenttype
  msnfp_endowmenttype?: import("../enums/msnfp_designation_new_msnfp_designation_msnfp_endowmenttype").msnfp_designation_new_msnfp_designation_msnfp_endowmenttype | null;
  // GL Credit Account StringType
  msnfp_glcreditaccount?: string | null;
  // GL Debit Account StringType
  msnfp_gldebitaccount?: string | null;
  // Initiative StringType
  msnfp_initiative?: string | null;
  // Is Active BooleanType
  msnfp_isactive?: boolean | null;
  // Name [Required] StringType
  msnfp_name?: string;
  // Parent Designation LookupType Parent Designation
  msnfp_parentdesignationid?: import("dataverse-ify").EntityReference | null;
  //  StringType
  msnfp_parentdesignationidname?: string | null;
  // Program StringType
  msnfp_program?: string | null;
  // Restriction Type msnfp_designation_new_msnfp_designation_msnfp_restrictiontype
  msnfp_restrictiontype?: import("../enums/msnfp_designation_new_msnfp_designation_msnfp_restrictiontype").msnfp_designation_new_msnfp_designation_msnfp_restrictiontype | null;
  // Start Date DateTimeType DateOnly:UserLocal
  msnfp_startdate?: Date | null;
  // Total Disbursed MoneyType
  msnfp_totaldisbursed?: number | null;
  // Total Disbursed (Base) MoneyType Value of the Total Disbursed in base currency.
  msnfp_totaldisbursed_base?: number | null;
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
  // Status msnfp_designation_msnfp_designation_statecode Status of the Designation
  statecode?: import("../enums/msnfp_designation_msnfp_designation_statecode").msnfp_designation_msnfp_designation_statecode | null;
  // Status Reason msnfp_designation_msnfp_designation_statuscode Reason for the status of the Designation
  statuscode?: import("../enums/msnfp_designation_msnfp_designation_statuscode").msnfp_designation_msnfp_designation_statuscode | null;
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
