import 'dotenv/config';
import { ApolloServer, gql, UserInputError } from 'apollo-server';
import schema from '@graphql-lab/schema';
import { Resolvers } from '@graphql-lab/schema/types';
import { sign, verify } from 'jsonwebtoken';
import { getRepository } from 'typeorm';

import './db/connection';
import DateTimeScalarType from './graphql/scalars/DateTime';
import { User as UserEntity } from './entity/User';
import AuthDirective from './graphql/directives/auth';
import { JWT_SIGN_KEY } from './constants';

const typeDefs = gql`
  ${schema}
`;

const resolvers: Resolvers = {
  DateTime: DateTimeScalarType,
  Query: {
    users: () => {
      const repository = getRepository(UserEntity);
      return repository.find();
    },
  },
  Mutation: {
    newUser: (parent, { input }) => {
      const repository = getRepository(UserEntity);
      const user = repository.create(input);
      user.plainTextPassword = input.plainTextPassword;
      return repository.save(user);
    },
    authenticate: async (parent, { input }) => {
      const repository = getRepository(UserEntity);
      const user = await repository.findOne({
        where: { email: input.email },
        select: ['password', 'id'],
      });

      if (!user) throw new UserInputError('Invalid credentials');
      const isValidCredentials = await user.checkPassword(
        input.plainTextPassword
      );
      if (!isValidCredentials) {
        throw new UserInputError('Invalid credentials');
      }

      const accessToken = sign(
        {
          iss: user.id,
        },
        JWT_SIGN_KEY
      );
      const wholeUserData = await repository.findOneOrFail(user.id);

      return {
        accessToken,
        user: wholeUserData,
      };
    },
  },
};

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    try {
      const authorization = req.header('authorization');
      if (!authorization) return {};

      const UserRepository = getRepository(UserEntity);
      const [, token] = authorization.split(' ');
      const { iss } = verify(token, JWT_SIGN_KEY) as { iss: string }; // FIXME
      const user = await UserRepository.findOne(iss);
      return {
        user,
      };
    } catch (err) {
      // TODO: add Sentry or something similar
      return {};
    }
  },
  schemaDirectives: {
    auth: AuthDirective,
  },
});

apolloServer.listen();
