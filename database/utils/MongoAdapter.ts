import { Adapter, AdapterInstance } from 'next-auth/adapters';
import { Mongo } from '/database/mongo';
import { User } from '/generated/server';
import { ObjectId } from 'mongodb';
import { Session } from 'next-auth';

type AdapterType = ReturnType<Adapter>;

const MongoAdapter = (): AdapterType => ({
  async getAdapter(
    appOptions
  ): Promise<
    AdapterInstance<
      User | undefined,
      { email: string; emailVerified: Date } | undefined,
      (Session & { user: User }) | undefined
    >
  > {
    await Mongo.connectionPromise;
    return {
      async createUser(profile) {
        if (profile) {
          const insertedUser = await Mongo.Users.insertOne({
            email: profile?.email,
            emailVerified: profile?.emailVerified,
            createdAt: new Date(),
            updatedAt: new Date(),
          });

          return await Mongo.Users.findOne({
            _id: insertedUser.insertedId,
          });
        }
        return undefined;
      },
      async getUser(_id) {
        return await Mongo.Users.findOne({
          _id: new ObjectId(_id),
        });
      },
      async getUserByEmail(email) {
        if (email) {
          return await Mongo.Users.findOne({ email });
        }
        return undefined;
      },
      async updateUser(user) {
        if (user?._id) {
          const result = await Mongo.Users.findOneAndUpdate(
            {
              _id: user._id,
            },
            {
              $set: {
                emailVerified: user.emailVerified,
              },
            }
          );
          return result.value;
        }

        return undefined;
      },
      async createVerificationRequest(
        identifier,
        url,
        token,
        _secret,
        provider
      ) {
        await Mongo.VerificationRequests.insertOne({
          identifier,
          token,
          createdAt: new Date(),
          updatedAt: new Date(),
          expires: new Date(Date.now() + provider.maxAge * 1000),
        });

        await provider.sendVerificationRequest({
          identifier,
          url,
          baseUrl: appOptions.baseUrl,
          provider,
          token,
        });
      },
      async getVerificationRequest(_identifier, verificationToken) {
        const verificationRequest = await Mongo.VerificationRequests.findOne({
          token: verificationToken,
        });

        if (verificationRequest) {
          return {
            ...verificationRequest,
            id: String(verificationRequest._id),
          };
        }

        return null;
      },
      async deleteVerificationRequest(_identifier, verificationToken) {
        await Mongo.VerificationRequests.deleteOne({
          token: verificationToken,
        });
      },

      // Unimplemented methods. These methods are not needed
      // based on the next auth config.
      async deleteUser() {
        return undefined;
      },
      async getUserByProviderAccountId() {
        return undefined;
      },
      async linkAccount() {
        return undefined;
      },
      async unlinkAccount() {
        return undefined;
      },
      async createSession() {
        /*
         * Because we use JWTs, session management
         * in the DB is not needed.
         */
        return undefined;
      },
      async getSession() {
        return undefined;
      },
      async updateSession() {
        return undefined;
      },
      async deleteSession() {
        return undefined;
      },
    };
  },
});

export default MongoAdapter;
