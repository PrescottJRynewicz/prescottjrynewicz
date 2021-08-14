import NextAuth, { Session } from 'next-auth';
import Providers from 'next-auth/providers';
import MongoAdapter from '/database/utils/MongoAdapter';
import { JWT } from 'next-auth/jwt';
import { Mongo } from '/database/mongo';

if (!process.env.NEXTAUTH_URL) {
  if (process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL) {
    process.env.NEXTAUTH_URL = `https://${
      process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL
    }`;
  } else {
    throw new Error('Unable to use next auth authentication - no url set');
  }
}
export default NextAuth({
  providers: [
    Providers.Email({
      from: process.env.EMAIL_FROM,
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: process.env.EMAIL_SERVER_PORT,
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
    }),
  ],
  session: {
    jwt: true,
    // about 4 months
    maxAge: 120 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },

  callbacks: {
    async session(session: Session, token: JWT) {
      await Mongo.connectionPromise;
      if (token.email) {
        const user = await Mongo.Users.findOne({ email: token.email });
        const newSession = {
          ...session,
          user,
        };
        return newSession;
      }
      return session;
    },
  },

  /*
   * Because TypeORM does not officially support Mongo 4 right now,
   * we need to make our own Adapter to use Mongo
   */
  adapter: MongoAdapter(),
});
