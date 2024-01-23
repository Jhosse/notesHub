import nextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_ID || "",
      clientSecret: process.env.NEXTAUTH_SECRET || "",
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  // Custom auth pages
  // pages: {
  //   signIn: "/auth/Signin",
  //   signOut: "/auth/Signout",
  // },
  theme: {
    colorScheme: "light",
    // logo: "/logo.png",
  },
};

export default nextAuth(authOptions);
