import { ClientCredentialRequest } from "@azure/msal-node";
import {
  AuthenticationProvider,
  AuthenticationProviderOptions,
  ClientOptions,
} from "@microsoft/microsoft-graph-client";
import axios, { AxiosResponse } from "axios";
import { NextApiRequest, NextApiResponse } from "next";
import { dynamicsDocument } from "../../../../../services/dynamicsDocument";
import { ApplicationDTO } from "../../../../../types/dynamicsEntities";
import { instantiateCca } from "../../../../../utils/cca";
import { connect, disconnect } from "../../../../../utils/redis";
import { withSessionRoute } from "../../../../../utils/withSession";

async function documentsRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (!req.session.user) {
      const error = new Error(
        "Please log in to view the the restricted information."
      );
      error.name = "Unauthorized";
      throw error;
    }
    await connect();
    const cca = await instantiateCca();
    const clientCredentialsRequest: ClientCredentialRequest = {
      scopes: [`${process.env.CLIENT_URL}/.default`],
      skipCache: false,
    };
    const graphTokenRequest: ClientCredentialRequest = {
      scopes: ["https://graph.microsoft.com/.default"],
      skipCache: true,
    };
    // const tokenResponse = await cca.acquireTokenByClientCredential(
    //   clientCredentialsRequest
    // );
    // const graphTokenResponse = await cca.acquireTokenByClientCredential(
    //   graphTokenRequest
    // );

    const tokenRequests = [
      cca.acquireTokenByClientCredential(clientCredentialsRequest),
      cca.acquireTokenByClientCredential(graphTokenRequest),
    ];

    const tokenResponses = await Promise.all(tokenRequests);

    if (!tokenResponses[0]) {
      const error = new Error(
        "Internal server error, could not retrieve an access token for Dynamics 365 environment."
      );
      error.name = "Server Error";
      throw error;
    }

    if (!tokenResponses[1]) {
      const error = new Error(
        "Internal server error, could not retrieve an access token for SharePoint environment."
      );
      error.name = "Server Error";
      throw error;
    }

    const { transactionId } = req.query;
    switch (req.method) {
      case "GET":
        const documentLocations = await dynamicsDocument(
          tokenResponses[0].accessToken
        ).getAllDocumentsForRecord(transactionId as string);

        const documents = await axios.get(
          `https://graph.microsoft.com/v1.0/sites/betachdemo2020pcsandbox.sharepoint.com/drives/b!84ViHwQxbU2l4-KHe_cCwhSaWCczJzBNrXD3NDXOcGSPXnG0H1PuTafCGMsmkBmJ/root:/${documentLocations[0].relativeurl}:/children`,
          {
            headers: {
              Authorization: `Bearer ${tokenResponses[1].accessToken}`,
            },
          }
        );

        await disconnect();

        return res.status(200).json(documents.data.value);

      default:
        const error = new Error(
          `Method ${req.method} is not allowed for this endpoint.`
        );
        error.name = "Method Not Allowed";
        throw error;
    }
  } catch (err: any) {
    await disconnect();
    if (err.name === "Method Not Allowed") {
      return res
        .status(405)
        .json({ error: { name: err.name, message: err.message } });
    }
    if (err.name === "Unauthorized") {
      return res
        .status(401)
        .json({ error: { name: err.name, message: err.message } });
    }
    if (err.name === "Server Error") {
      return res
        .status(500)
        .json({ error: { name: err.name, message: err.message } });
    }
    return res
      .status(500)
      .json({ error: { name: "Internal Server Error", message: err.message } });
  }
}

export default withSessionRoute(documentsRoute);
