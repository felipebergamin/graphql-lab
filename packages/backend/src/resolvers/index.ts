import { Resolvers } from '@graphql-lab/schema/types';
import merge from 'lodash/merge';

import UserResolvers from './User';
import AuthResolvers from './Auth';

const resolvers: Resolvers = merge(UserResolvers, AuthResolvers);

export default resolvers;
