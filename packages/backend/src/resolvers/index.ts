import { Resolvers } from '@graphql-lab/schema/types';
import merge from 'lodash/merge';

import UserResolvers from './User';
import AuthResolvers from './Auth';
import PasswordResolvers from './Password';

const resolvers: Resolvers = merge(
  UserResolvers,
  AuthResolvers,
  PasswordResolvers
);

export default resolvers;
