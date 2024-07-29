import { retrieveMultiple, WebApiConfig } from "dataverse-webapi/lib/node";

export const dynamicsDesignation = (accessToken: string) => {
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
  return {
    getAllDesignations: async () => {
      const designations = await retrieveMultiple(
        config,
        "msnfp_designations",
        `$select=msnfp_name,msnfp_designationid`
      );

      if ((designations as any).error) {
        const error = new Error(((designations as any).error as any).message);
        error.name = "D365 Error";
        throw error;
      }

      return designations.value;
    },
  };
};
