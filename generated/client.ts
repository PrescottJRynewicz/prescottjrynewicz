import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: string;
  ObjectId: string;
};


export enum ClientDbCollections {
  Users = 'Users',
  VerificationRequests = 'VerificationRequests'
}


export type ClientQuery = {
  __typename?: 'Query';
  users: Array<ClientUser>;
};

export type ClientUser = {
  __typename?: 'User';
  _id: Scalars['ObjectId'];
  email: Scalars['String'];
  emailVerified?: Maybe<Scalars['Date']>;
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
  image?: Maybe<Scalars['String']>;
};

export type ClientVerificationRequest = {
  __typename?: 'VerificationRequest';
  _id: Scalars['ObjectId'];
  identifier: Scalars['String'];
  token: Scalars['String'];
  expires: Scalars['Date'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type ClientGetUserQueryVariables = Exact<{ [key: string]: never; }>;


export type ClientGetUserQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<ClientUser, '_id' | 'email' | 'createdAt' | 'emailVerified'>
  )> }
);


export const GetUserDocument = gql`
    query GetUser {
  users {
    _id
    email
    createdAt
    emailVerified
  }
}
    `;

/**
 * __useGetUserQuery__
 *
 * To run a query within a React component, call `useGetUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetUserQuery(baseOptions?: Apollo.QueryHookOptions<ClientGetUserQuery, ClientGetUserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClientGetUserQuery, ClientGetUserQueryVariables>(GetUserDocument, options);
      }
export function useGetUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClientGetUserQuery, ClientGetUserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClientGetUserQuery, ClientGetUserQueryVariables>(GetUserDocument, options);
        }
export type GetUserQueryHookResult = ReturnType<typeof useGetUserQuery>;
export type GetUserLazyQueryHookResult = ReturnType<typeof useGetUserLazyQuery>;
export type GetUserQueryResult = Apollo.QueryResult<ClientGetUserQuery, ClientGetUserQueryVariables>;