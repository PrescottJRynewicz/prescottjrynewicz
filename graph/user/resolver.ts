import { Resolvers } from '/generated/server';
import { ContextType } from '/graph/context';
import { DeepPartial } from 'ts-essentials';

export const userResolver: DeepPartial<Resolvers<ContextType>> = {
  Query: {
    users: async (_parent, _args, { Mongo }) =>
      await Mongo.Users.find().limit(10).toArray(),
  },
};
