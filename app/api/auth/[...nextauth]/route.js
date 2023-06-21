//import NextAuth to initialise the handler to handle the authentication
import NextAuth from "next-auth/next";

//imported provider for authentication
import GoogleProvider from "next-auth/providers/google";

import { connectToDB } from "@utils/database";
import User from "@models/user";

//initialise the route handler which take an options object with properties ->
//1. providers: [] -> an array of auth providers
//2. callbacks:{} -> an object with diferent callback functions which have different functionalities and will be triggered on upcoming request to this route
const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // most providers take object with clientId and clientSecret as properties
  ],
  callbacks: {
    async session({ session }) {
      //This callback is called whenever a session is checked. (Eg.: invoking the /api/session endpoint, using useSession or getSession)
      //! ⚠ By default, only a subset (email, name, image) of the token is returned for increased security.

      //To keep status of user when online
      const sessionUser = await User.findOne({
        email: session.user.email,
      });

      session.user.id = sessionUser._id.toString();
      return session;
    },
    async signIn({ profile }) {
      //Use this callback to control if a user is allowed to sign in. Returning true will continue the sign-in flow. Throwing an error or returning a string will stop the flow, and redirect the user.

      try {
        // serverless -> lambda -> dynamic
        await connectToDB();

        //check if a user already exists
        const userExists = await User.findOne({
          email: profile.email,
        });

        // if not , create a new user
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          });
        }
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

//You need to export this handler in this way to make it work properly.
export { handler as GET, handler as POST };
// promptopia-390310
