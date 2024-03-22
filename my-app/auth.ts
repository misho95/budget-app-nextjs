import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { authConfig } from "./auth.config";
import { z } from "zod";

import bcrypt from "bcrypt";
import { UserType } from "@/libs/interfaces";

const fetchUser = async (email: string) => {
  try {
    const res = await fetch("http://localhost:3000/api/users", {
      cache: "no-store",
      body: email,
    });

    if (!res.ok) {
      throw new Error("Faild to fetch user");
    }

    return res.json();
  } catch (err) {
    console.log(err);
  }
};

async function getUser(email: string): Promise<UserType | undefined> {
  try {
    const user = await fetchUser(email);
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (parsedCredentials.success) {
          const { email, password } = parsedCredentials.data;
          const user = await getUser(email);
          if (!user) return null;
          const passwordsMatch = await bcrypt.compare(password, user.password);

          if (passwordsMatch) return user;
        }

        console.log("Invalid credentials");
        return null;
      },
    }),
  ],
});
