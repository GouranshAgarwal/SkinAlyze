import NextAuth from "next-auth";
import { authOptions } from "./options"; // Ensure this file exists

const handler = NextAuth(authOptions);

// ✅ Export HTTP methods explicitly
export { handler as GET, handler as POST };