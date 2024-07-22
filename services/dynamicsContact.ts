import {
  WebApiConfig,
  retrieveMultiple,
  createWithReturnData,
  retrieve,
  updateWithReturnData,
} from "dataverse-webapi/lib/node";
import { Contact } from "../dataverse-types/entities/Contact";
import { User } from "../types/dynamicsEntities";

export const dynamicsContact = (accessToken: string) => {
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
  return {
    getByUsername: async (username: string) => {
      const contact = await retrieveMultiple(
        config,
        "contacts",
        `$filter=statecode eq 0 and mnp_username eq '${username}'`
      );

      return contact.value as Contact[];
    },

    getByEmail: async (email: string) => {
      const contact = await retrieveMultiple(
        config,
        "contacts",
        `$filter=statecode eq 0 and emailaddress1 eq '${email}'`
      );

      return contact.value as Contact[];
    },

    getContactById: async (contactid: string) => {
      const contact = await retrieve(
        config,
        "contacts",
        contactid,
        "$select=emailaddress1,firstname,lastname,address1_line1,address1_line2,address1_city,address1_country,address1_stateorprovince,address1_postalcode"
      );

      return contact;
    },

    updateContactByEmail: async (
      email: string,
      hashedPassword: string,
      username: string
    ) => {
      const existingContacts = await retrieveMultiple(
        config,
        "contacts",
        `$filter=emailaddress1 eq '${email}' and mnp_username eq null&$select=contactid`
      );
      if (!existingContacts || existingContacts.value.length === 0) {
        throw new Error("Contact with same email not found");
      }
      const updatedContact = await updateWithReturnData(
        config,
        "contacts",
        existingContacts.value[0].contactid as string,
        { mnp_username: username, mnp_hashedpassword: hashedPassword },
        "$select=contactid"
      );

      return updatedContact;
    },

    createContact: async (contactData: Contact) => {
      const existingContacts = await retrieveMultiple(
        config,
        "contacts",
        `$filter=statecode eq 0 and emailaddress1 eq '${contactData.emailaddress1}'`
      );

      if (existingContacts.value.length > 0) {
        return existingContacts.value[0];
      }

      const {
        emailaddress1,
        firstname,
        lastname,
        address1_line1,
        address1_line2,
        address1_city,
        address1_country,
        address1_stateorprovince,
        address1_postalcode,
        description,
        msnfp_primaryconstituenttype,
      } = contactData;
      const contact = await createWithReturnData(
        config,
        "contacts",
        {
          emailaddress1,
          firstname,
          lastname,
          address1_line1,
          address1_line2,
          address1_city,
          address1_country,
          address1_stateorprovince,
          address1_postalcode,
          description,
          msnfp_primaryconstituenttype,
        },
        "$select=contactid"
      );

      return contact;
    },

    createUser: async (user: User) => {
      const createdUser = await createWithReturnData(
        config,
        "contacts",
        {
          mnp_username: user.username,
          mnp_hashedpassword: user.password,
          firstname: user.firstName,
          lastname: user.lastName,
          emailaddress1: user.email,
        },
        "$select=contactid"
      );

      return createdUser;
    },
  };
};
