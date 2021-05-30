import { ApolloServer, gql } from "apollo-server";
import schema from "@graphql-lab/schema";
import { Resolvers, Task } from "@graphql-lab/schema/types";
import { v1 } from "uuid";

const tasks = [
  {
    id: v1(),
    description: "Create a GraphQL Server",
  },
  {
    id: v1(),
    description: "Use graphql-code-generator",
  },
  {
    id: v1(),
    description: "Implement a client",
  },
];

const typeDefs = gql`
  ${schema}
`;

const resolvers: Resolvers = {
  Query: {
    tasks: (root, args, ctx, info) => {
      console.log({
        root,
        args,
        ctx,
        info,
      });
      return tasks;
    },
  },
  Mutation: {
    newTask: (_, args): Task => {
      const { description } = args;
      const task: Task = {
        id: v1(),
        description,
      };
      tasks.push(task);
      return task;
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
apolloServer.listen().then(({ url }) => {
  console.log("apollo server ready at " + url);
});
