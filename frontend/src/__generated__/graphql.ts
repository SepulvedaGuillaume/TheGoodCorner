/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any; }
};

export type Ad = {
  __typename?: 'Ad';
  category: Category;
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  location: Scalars['String']['output'];
  owner: Scalars['String']['output'];
  picture?: Maybe<Scalars['String']['output']>;
  price: Scalars['Float']['output'];
  tags: Array<Tag>;
  title: Scalars['String']['output'];
};

/** New ad data */
export type AdInput = {
  category: CategoryInput;
  createdAt?: Scalars['DateTimeISO']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  id?: Scalars['ID']['input'];
  location: Scalars['String']['input'];
  owner: Scalars['String']['input'];
  picture?: InputMaybe<Scalars['String']['input']>;
  price: Scalars['Float']['input'];
  tags: Array<TagInput>;
  title: Scalars['String']['input'];
};

export type Category = {
  __typename?: 'Category';
  ads: Array<Ad>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

/** New category data */
export type CategoryInput = {
  id: Scalars['ID']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createAd: Ad;
  deleteAd: Scalars['String']['output'];
  updateAd: Ad;
};


export type MutationCreateAdArgs = {
  data: AdInput;
};


export type MutationDeleteAdArgs = {
  id: Scalars['String']['input'];
};


export type MutationUpdateAdArgs = {
  data: UpdateAdInput;
  id: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  getAdById: Ad;
  getAllAds: Array<Ad>;
  getAllCategories: Array<Category>;
  getAllTags: Array<Tag>;
  getCategoryById: Category;
  searchAds: Array<Ad>;
};


export type QueryGetAdByIdArgs = {
  id: Scalars['String']['input'];
};


export type QueryGetCategoryByIdArgs = {
  id: Scalars['String']['input'];
};


export type QuerySearchAdsArgs = {
  searchTerm: Scalars['String']['input'];
};

export type Tag = {
  __typename?: 'Tag';
  ads: Array<Ad>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
};

/** New tag data */
export type TagInput = {
  id: Scalars['ID']['input'];
};

/** Update ad data */
export type UpdateAdInput = {
  category?: InputMaybe<CategoryInput>;
  createdAt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  description?: InputMaybe<Scalars['String']['input']>;
  location?: InputMaybe<Scalars['String']['input']>;
  owner?: InputMaybe<Scalars['String']['input']>;
  picture?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
  tags?: InputMaybe<Array<TagInput>>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type CreateAdMutationVariables = Exact<{
  data: AdInput;
}>;


export type CreateAdMutation = { __typename?: 'Mutation', createAd: { __typename?: 'Ad', id: string, title: string, description?: string | null, owner: string, price: number, picture?: string | null, location: string, createdAt?: any | null, category: { __typename?: 'Category', name: string }, tags: Array<{ __typename?: 'Tag', name: string }> } };

export type UpdateAdMutationVariables = Exact<{
  data: UpdateAdInput;
  updateAdId: Scalars['String']['input'];
}>;


export type UpdateAdMutation = { __typename?: 'Mutation', updateAd: { __typename?: 'Ad', id: string, title: string, description?: string | null, owner: string, price: number, picture?: string | null, location: string, createdAt?: any | null, category: { __typename?: 'Category', name: string }, tags: Array<{ __typename?: 'Tag', name: string }> } };

export type DeleteAdMutationVariables = Exact<{
  deleteAdId: Scalars['String']['input'];
}>;


export type DeleteAdMutation = { __typename?: 'Mutation', deleteAd: string };

export type GetAllAdsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllAdsQuery = { __typename?: 'Query', getAllAds: Array<{ __typename?: 'Ad', id: string, title: string, description?: string | null, owner: string, price: number, picture?: string | null, location: string, createdAt?: any | null, category: { __typename?: 'Category', name: string }, tags: Array<{ __typename?: 'Tag', name: string }> }> };

export type GetAdByIdQueryVariables = Exact<{
  getAdByIdId: Scalars['String']['input'];
}>;


export type GetAdByIdQuery = { __typename?: 'Query', getAdById: { __typename?: 'Ad', id: string, title: string, description?: string | null, owner: string, price: number, picture?: string | null, location: string, createdAt?: any | null, category: { __typename?: 'Category', name: string }, tags: Array<{ __typename?: 'Tag', name: string }> } };

export type SearchAdsQueryVariables = Exact<{
  searchTerm: Scalars['String']['input'];
}>;


export type SearchAdsQuery = { __typename?: 'Query', searchAds: Array<{ __typename?: 'Ad', id: string, title: string, description?: string | null, owner: string, price: number, picture?: string | null, location: string, createdAt?: any | null, category: { __typename?: 'Category', name: string }, tags: Array<{ __typename?: 'Tag', name: string }> }> };

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllCategoriesQuery = { __typename?: 'Query', getAllCategories: Array<{ __typename?: 'Category', id: string, name: string }> };

export type GetCategoryByIdQueryVariables = Exact<{
  getCategoryByIdId: Scalars['String']['input'];
}>;


export type GetCategoryByIdQuery = { __typename?: 'Query', getCategoryById: { __typename?: 'Category', id: string, name: string, ads: Array<{ __typename?: 'Ad', id: string, location: string, owner: string, picture?: string | null, price: number, title: string, createdAt?: any | null, description?: string | null, tags: Array<{ __typename?: 'Tag', id: string, name: string }>, category: { __typename?: 'Category', id: string, name: string } }> } };

export type GetAllTagsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllTagsQuery = { __typename?: 'Query', getAllTags: Array<{ __typename?: 'Tag', id: string, name: string }> };


export const CreateAdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateAd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"AdInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createAd"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<CreateAdMutation, CreateAdMutationVariables>;
export const UpdateAdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateAd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateAdInput"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updateAdId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateAd"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}},{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updateAdId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<UpdateAdMutation, UpdateAdMutationVariables>;
export const DeleteAdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteAd"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"deleteAdId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"deleteAd"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"deleteAdId"}}}]}]}}]} as unknown as DocumentNode<DeleteAdMutation, DeleteAdMutationVariables>;
export const GetAllAdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllAds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllAds"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetAllAdsQuery, GetAllAdsQueryVariables>;
export const GetAdByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAdById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getAdByIdId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAdById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getAdByIdId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<GetAdByIdQuery, GetAdByIdQueryVariables>;
export const SearchAdsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"SearchAds"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"searchAds"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"searchTerm"},"value":{"kind":"Variable","name":{"kind":"Name","value":"searchTerm"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]} as unknown as DocumentNode<SearchAdsQuery, SearchAdsQueryVariables>;
export const GetAllCategoriesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllCategories"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetAllCategoriesQuery, GetAllCategoriesQueryVariables>;
export const GetCategoryByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCategoryById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"getCategoryByIdId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getCategoryById"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"getCategoryByIdId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"ads"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"owner"}},{"kind":"Field","name":{"kind":"Name","value":"picture"}},{"kind":"Field","name":{"kind":"Name","value":"price"}},{"kind":"Field","name":{"kind":"Name","value":"tags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"category"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"description"}}]}}]}}]}}]} as unknown as DocumentNode<GetCategoryByIdQuery, GetCategoryByIdQueryVariables>;
export const GetAllTagsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getAllTags"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<GetAllTagsQuery, GetAllTagsQueryVariables>;