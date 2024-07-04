import { gql } from "@apollo/client";

export const GET_ALL_TAGS_QUERY = gql`
  query GetAllTags {
    getAllTags {
      id
      name
    }
  }
`;
