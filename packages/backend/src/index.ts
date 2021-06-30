import 'reflect-metadata';
import 'dotenv/config';
import { ApolloServer, gql } from 'apollo-server';
import schema from '@graphql-lab/schema';

import './db/connection';
import AuthDirective from './graphql/directives/auth';
import createApolloContext from './context';
import resolvers from './resolvers';

const typeDefs = gql`
  ${schema}
`;

const apolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: createApolloContext,
  schemaDirectives: {
    auth: AuthDirective,
  },
});

apolloServer.listen();
