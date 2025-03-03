

import NextAuth from "next-auth";

const handler = NextAuth(AdminauthOptions);

export { handler as GET, handler as POST };