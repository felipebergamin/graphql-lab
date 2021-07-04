import { Resolvers } from '@graphql-lab/schema/types';
import { getCustomRepository } from 'typeorm';

import { User } from '../entity/User';

import PasswordRepository from '../repositories/Password';

type Context = {
  user: User;
};

const resolvers: Resolvers<Context> = {
  Mutation: {
    newPassword: (parent, { input }, context) => {
      const repository = getCustomRepository(PasswordRepository);
      const pwd = repository.create({
        ...input,
        userId: context.user.id,
      });
      return repository.save(pwd);
    },
  },
};

export default resolvers;
