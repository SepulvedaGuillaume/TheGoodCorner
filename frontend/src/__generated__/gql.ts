/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  mutation CreateAd($data: AdInput!) {\n    createAd(data: $data) {\n      id\n      title\n      description\n      owner\n      price\n      picture\n      location\n      createdAt\n      category {\n        name\n      }\n      tags {\n        name\n      }\n    }\n  }\n": types.CreateAdDocument,
    "\n  mutation UpdateAd($data: UpdateAdInput!, $updateAdId: String!) {\n    updateAd(data: $data, id: $updateAdId) {\n      id\n      title\n      description\n      owner\n      price\n      picture\n      location\n      createdAt\n      category {\n        name\n      }\n      tags {\n        name\n      }\n    }\n  }\n": types.UpdateAdDocument,
    "\n  mutation DeleteAd($deleteAdId: String!) {\n    deleteAd(id: $deleteAdId)\n  }\n": types.DeleteAdDocument,
    "\n  query GetAllAds {\n    getAllAds {\n      id\n      title\n      description\n      owner\n      price\n      picture\n      location\n      createdAt\n      category {\n        name\n      }\n      tags {\n        name\n      }\n    }\n  }\n": types.GetAllAdsDocument,
    "\n  query GetAdById($getAdByIdId: String!) {\n    getAdById(id: $getAdByIdId) {\n      id\n      title\n      description\n      owner\n      price\n      picture\n      location\n      createdAt\n      category {\n        name\n      }\n      tags {\n        name\n      }\n    }\n  }\n": types.GetAdByIdDocument,
    "\n  query SearchAds($searchTerm: String!) {\n    searchAds(searchTerm: $searchTerm) {\n      id\n      title\n      description\n      owner\n      price\n      picture\n      location\n      createdAt\n      category {\n        name\n      }\n      tags {\n        name\n      }\n    }\n  }\n": types.SearchAdsDocument,
    "\n  query GetAllCategories {\n    getAllCategories {\n      id\n      name\n    }\n  }\n": types.GetAllCategoriesDocument,
    "\n  query GetCategoryById($getCategoryByIdId: String!) {\n    getCategoryById(id: $getCategoryByIdId) {\n      id\n      name\n      ads {\n        id\n        location\n        owner\n        picture\n        price\n        tags {\n          id\n          name\n        }\n        category {\n          id\n          name\n        }\n        title\n        createdAt\n        description\n      }\n    }\n  }\n": types.GetCategoryByIdDocument,
    "\n  query GetAllTags {\n    getAllTags {\n      id\n      name\n    }\n  }\n": types.GetAllTagsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateAd($data: AdInput!) {\n    createAd(data: $data) {\n      id\n      title\n      description\n      owner\n      price\n      picture\n      location\n      createdAt\n      category {\n        name\n      }\n      tags {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation CreateAd($data: AdInput!) {\n    createAd(data: $data) {\n      id\n      title\n      description\n      owner\n      price\n      picture\n      location\n      createdAt\n      category {\n        name\n      }\n      tags {\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateAd($data: UpdateAdInput!, $updateAdId: String!) {\n    updateAd(data: $data, id: $updateAdId) {\n      id\n      title\n      description\n      owner\n      price\n      picture\n      location\n      createdAt\n      category {\n        name\n      }\n      tags {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateAd($data: UpdateAdInput!, $updateAdId: String!) {\n    updateAd(data: $data, id: $updateAdId) {\n      id\n      title\n      description\n      owner\n      price\n      picture\n      location\n      createdAt\n      category {\n        name\n      }\n      tags {\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation DeleteAd($deleteAdId: String!) {\n    deleteAd(id: $deleteAdId)\n  }\n"): (typeof documents)["\n  mutation DeleteAd($deleteAdId: String!) {\n    deleteAd(id: $deleteAdId)\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllAds {\n    getAllAds {\n      id\n      title\n      description\n      owner\n      price\n      picture\n      location\n      createdAt\n      category {\n        name\n      }\n      tags {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAllAds {\n    getAllAds {\n      id\n      title\n      description\n      owner\n      price\n      picture\n      location\n      createdAt\n      category {\n        name\n      }\n      tags {\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAdById($getAdByIdId: String!) {\n    getAdById(id: $getAdByIdId) {\n      id\n      title\n      description\n      owner\n      price\n      picture\n      location\n      createdAt\n      category {\n        name\n      }\n      tags {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetAdById($getAdByIdId: String!) {\n    getAdById(id: $getAdByIdId) {\n      id\n      title\n      description\n      owner\n      price\n      picture\n      location\n      createdAt\n      category {\n        name\n      }\n      tags {\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query SearchAds($searchTerm: String!) {\n    searchAds(searchTerm: $searchTerm) {\n      id\n      title\n      description\n      owner\n      price\n      picture\n      location\n      createdAt\n      category {\n        name\n      }\n      tags {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query SearchAds($searchTerm: String!) {\n    searchAds(searchTerm: $searchTerm) {\n      id\n      title\n      description\n      owner\n      price\n      picture\n      location\n      createdAt\n      category {\n        name\n      }\n      tags {\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllCategories {\n    getAllCategories {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetAllCategories {\n    getAllCategories {\n      id\n      name\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetCategoryById($getCategoryByIdId: String!) {\n    getCategoryById(id: $getCategoryByIdId) {\n      id\n      name\n      ads {\n        id\n        location\n        owner\n        picture\n        price\n        tags {\n          id\n          name\n        }\n        category {\n          id\n          name\n        }\n        title\n        createdAt\n        description\n      }\n    }\n  }\n"): (typeof documents)["\n  query GetCategoryById($getCategoryByIdId: String!) {\n    getCategoryById(id: $getCategoryByIdId) {\n      id\n      name\n      ads {\n        id\n        location\n        owner\n        picture\n        price\n        tags {\n          id\n          name\n        }\n        category {\n          id\n          name\n        }\n        title\n        createdAt\n        description\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query GetAllTags {\n    getAllTags {\n      id\n      name\n    }\n  }\n"): (typeof documents)["\n  query GetAllTags {\n    getAllTags {\n      id\n      name\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;