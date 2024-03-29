import { Resolvers } from '@graphql-lab/schema/types';
import { getCustomRepository } from 'typeorm';

import { User } from '../entity/User';

import PasswordRepository from '../repositories/Password';

type Context = {
  user: User;
};

const resolvers: Resolvers<Context> = {
  Mutation: {
    deletePassword: async (parent, { id }, { user }) => {
      const repository = getCustomRepository(PasswordRepository);
      const deleteResult = await repository.delete({
        userId: user.id,
        id,
      });
      return !!deleteResult.affected;
    },
    newPassword: (parent, { input }, context) => {
      const repository = getCustomRepository(PasswordRepository);
      const pwd = repository.create({
        ...input,
        userId: context.user.id,
      });
      return repository.save(pwd);
    },
    updatePassword: async (parent, { input }, { user }) => {
      const repository = getCustomRepository(PasswordRepository);
      const { id, ...data } = input;
      const password = await repository.findOneOrFail({
        where: {
          id,
          userId: user.id,
        },
      });
      if (data.password) password.password = data.password;
      if (data.extraDescription)
        password.extraDescription = data.extraDescription;
      if (data.serviceName) password.serviceName = data.serviceName;
      if (data.serviceUrl) password.serviceUrl = data.serviceUrl;
      return repository.save(password);
    },
  },
  Query: {
    password: (parent, { id }, { user }) => {
      const repository = getCustomRepository(PasswordRepository);
      return repository.findOneOrFail({
        where: {
          id,
          userId: user.id,
        },
      });
    },
  },
};

export default resolvers;
