import { auth } from "@/auth";
import type { NextApiRequest, NextApiResponse } from "next";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await auth(req, res);
  if (session) {
    // Do something with the session
    return res.json("This is protected content.");
  }
  res.status(401).json("You must be signed in.");
};
