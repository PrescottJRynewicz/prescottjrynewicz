import scalarTypes from 'graph/scalars.graphql';
import userTypes from './user/user.graphql';
import databaseTypes from '../database/database.graphql';

export const typeDefs = [scalarTypes, userTypes, databaseTypes];
