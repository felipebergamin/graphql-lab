import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};


export type AuthenticationPayload = {
  __typename?: 'AuthenticationPayload';
  accessToken: Scalars['String'];
  user: User;
};


export type Mutation = {
  __typename?: 'Mutation';
  newUser: User;
  authenticate: AuthenticationPayload;
  updateProfile?: Maybe<User>;
  newPassword?: Maybe<Password>;
  updatePassword?: Maybe<Password>;
  deletePassword?: Maybe<Scalars['Boolean']>;
};


export type MutationNewUserArgs = {
  input: NewUserInput;
};


export type MutationAuthenticateArgs = {
  input: SignInInput;
};


export type MutationUpdateProfileArgs = {
  input: UpdateUserInput;
};


export type MutationNewPasswordArgs = {
  input: NewPasswordInput;
};


export type MutationUpdatePasswordArgs = {
  input: UpdatePasswordInput;
};


export type MutationDeletePasswordArgs = {
  id: Scalars['ID'];
};

export type NewPasswordInput = {
  serviceUrl: Scalars['String'];
  serviceName: Scalars['String'];
  extraDescription?: Maybe<Scalars['String']>;
  password: Scalars['String'];
};

export type NewUserInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  plainTextPassword: Scalars['String'];
};

export type Password = {
  __typename?: 'Password';
  id: Scalars['ID'];
  serviceUrl: Scalars['String'];
  serviceName: Scalars['String'];
  extraDescription?: Maybe<Scalars['String']>;
  password: Scalars['String'];
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  me: User;
  password: Password;
};


export type QueryPasswordArgs = {
  id: Scalars['ID'];
};

export type SignInInput = {
  email: Scalars['String'];
  plainTextPassword: Scalars['String'];
};

export type UpdatePasswordInput = {
  id: Scalars['ID'];
  serviceUrl?: Maybe<Scalars['String']>;
  serviceName?: Maybe<Scalars['String']>;
  extraDescription?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['String']>;
};

export type UpdateUserInput = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  plainTextPassword?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  passwords: Array<Maybe<Password>>;
  createdAt: Scalars['DateTime'];
  updatedAt: Scalars['DateTime'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AuthenticationPayload: ResolverTypeWrapper<AuthenticationPayload>;
  String: ResolverTypeWrapper<Scalars['String']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']>;
  Mutation: ResolverTypeWrapper<{}>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  NewPasswordInput: NewPasswordInput;
  NewUserInput: NewUserInput;
  Password: ResolverTypeWrapper<Password>;
  Query: ResolverTypeWrapper<{}>;
  SignInInput: SignInInput;
  UpdatePasswordInput: UpdatePasswordInput;
  UpdateUserInput: UpdateUserInput;
  User: ResolverTypeWrapper<User>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AuthenticationPayload: AuthenticationPayload;
  String: Scalars['String'];
  DateTime: Scalars['DateTime'];
  Mutation: {};
  Boolean: Scalars['Boolean'];
  ID: Scalars['ID'];
  NewPasswordInput: NewPasswordInput;
  NewUserInput: NewUserInput;
  Password: Password;
  Query: {};
  SignInInput: SignInInput;
  UpdatePasswordInput: UpdatePasswordInput;
  UpdateUserInput: UpdateUserInput;
  User: User;
};

export type AuthDirectiveArgs = {  };

export type AuthDirectiveResolver<Result, Parent, ContextType = any, Args = AuthDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type AuthenticationPayloadResolvers<ContextType = any, ParentType extends ResolversParentTypes['AuthenticationPayload'] = ResolversParentTypes['AuthenticationPayload']> = {
  accessToken?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  newUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationNewUserArgs, 'input'>>;
  authenticate?: Resolver<ResolversTypes['AuthenticationPayload'], ParentType, ContextType, RequireFields<MutationAuthenticateArgs, 'input'>>;
  updateProfile?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType, RequireFields<MutationUpdateProfileArgs, 'input'>>;
  newPassword?: Resolver<Maybe<ResolversTypes['Password']>, ParentType, ContextType, RequireFields<MutationNewPasswordArgs, 'input'>>;
  updatePassword?: Resolver<Maybe<ResolversTypes['Password']>, ParentType, ContextType, RequireFields<MutationUpdatePasswordArgs, 'input'>>;
  deletePassword?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeletePasswordArgs, 'id'>>;
};

export type PasswordResolvers<ContextType = any, ParentType extends ResolversParentTypes['Password'] = ResolversParentTypes['Password']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  serviceUrl?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  serviceName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  extraDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['Password'], ParentType, ContextType, RequireFields<QueryPasswordArgs, 'id'>>;
};

export type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  passwords?: Resolver<Array<Maybe<ResolversTypes['Password']>>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  AuthenticationPayload?: AuthenticationPayloadResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Password?: PasswordResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  auth?: AuthDirectiveResolver<any, any, ContextType>;
};


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;