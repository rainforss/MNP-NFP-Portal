import { ClientCredentialRequest } from "@azure/msal-node";
import { NextApiRequest, NextApiResponse } from "next";
import { dynamicsAppointment } from "../../../services/dynamicsAppointment";
import { dynamicsDonorCommitment } from "../../../services/dynamicsDonorCommitment";
import { instantiateCca } from "../../../utils/cca";
import { connect, disconnect } from "../../../utils/redis";
import { withSessionRoute } from "../../../utils/withSession";

async function donorCommitmentRoute(req: NextApiRequest, res: NextApiResponse) {
  try {
    // if (!req.session.user) {
    //   const error = new Error(
    //     "Please log in to view the the restricted information."
    //   );
    //   error.name = "Unauthorized";
    //   throw error;
    // }
    await connect();
    const cca = await instantiateCca();
    const clientCredentialsRequest: ClientCredentialRequest = {
      scopes: [`${process.env.CLIENT_URL}/.default`],
      skipCache: false,
    };
    const tokenResponse = await cca.acquireTokenByClientCredential(
      clientCredentialsRequest
    );
    if (!tokenResponse) {
      const error = new Error(
        "Internal server error, could not retrieve an access token for Dynamics 365 environment."
      );
      error.name = "Server Error";
      throw error;
    }

    const { donorCommitmentData } = req.body;

    switch (req.method) {
      case "POST":
        const donorCommitment = await dynamicsDonorCommitment(
          tokenResponse.accessToken
        ).createDonorCommitment({ ...donorCommitmentData });

        return res.status(200).json({
          msnfp_donorcommitment: {
            msnfp_donorcommitmentid: donorCommitment.msnfp_donorcommitmentid,
          },
        });

      default:
        await disconnect();
        return res.status(405).json({
          error: {
            name: "Not Supported",
            message: `Method ${req.method} is not allowed`,
          },
        });
    }
  } catch (err: any) {
    await disconnect();
    console.log(err.message);
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

export default withSessionRoute(donorCommitmentRoute);
