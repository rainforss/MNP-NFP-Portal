import { IronSessionData } from "iron-session";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null;
      _id?: string | null;
      username?: string | null;
    };
  }
}
