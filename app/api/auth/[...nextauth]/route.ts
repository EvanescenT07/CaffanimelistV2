import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";

interface ProvidersProps {
  clientId: string;
  clientSecret: string;
}

interface SecretProps {
  secretID: string;
}

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    } as ProvidersProps),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    } as ProvidersProps),
  ],
  secret: process.env.NEXTAUTH_SECRET as SecretProps["secretID"],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
