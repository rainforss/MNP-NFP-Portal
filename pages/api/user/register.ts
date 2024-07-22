import { ClientCredentialRequest } from "@azure/msal-node";
import { NextApiRequest, NextApiResponse } from "next";
import { dynamicsContact } from "../../../services/dynamicsContact";
import { instantiateCca } from "../../../utils/cca";
import bcrypt from "bcrypt";
import { withSessionRoute } from "../../../utils/withSession";
import { connect, disconnect } from "../../../utils/redis";

async function registerRoute(req: NextApiRequest, res: NextApiResponse) {
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

  const { user } = req.body;

  const users = await dynamicsContact(tokenResponse.accessToken).getByUsername(
    user.username
  );

  try {
    if (users && users.length > 0) {
      const error = new Error("Duplicate Account");
      (error.name = "Duplicate Account"),
        (error.message =
          "Bad request. Username already taken, please try another one.");
      throw error;
    }

    const existingContacts = await dynamicsContact(
      tokenResponse.accessToken
    ).getByEmail(user.email);

    user.password = await bcrypt.hash(user.password, 2);

    let contact;

    if (existingContacts.length > 0) {
      contact = await dynamicsContact(
        tokenResponse.accessToken
      ).updateContactByEmail(user.email, user.password, user.username);
    } else {
      contact = await dynamicsContact(tokenResponse.accessToken).createUser(
        user
      );
    }

    // const createdUser = await dynamicsContact(
    //   tokenResponse.accessToken
    // ).createUser(user);

    req.session.user = {
      firstName: user.firstName as any,
      lastName: user.lastName as any,
      email: user.email as any,
      _id: contact.contactid as any,
      username: user.username as any,
    };

    await req.session.save();

    await disconnect();
    return res.status(200).json({
      _id: contact.contactid,
      firstname: user.firstName,
      lastname: user.lastName,
      email: user.email,
      username: user.username,
    });
  } catch (err: any) {
    await disconnect();
    console.log(err.name);
    if (err.name === "Duplicate Account") {
      return res
        .status(400)
        .json({ error: { name: err.name, message: err.message } });
    }
    if (err.name === "Server Error") {
      return res.status(500).json({
        error: {
          name: err.name,
          message: err.message,
        },
      });
    }
    return res.status(500).json({
      error: { name: "Internal Server Error", message: err.message },
    });
  }
}

export default withSessionRoute(registerRoute);
