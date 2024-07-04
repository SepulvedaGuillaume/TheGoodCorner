import { gql } from "@apollo/client";

export const GET_ALL_CATEGORIES_QUERY = gql`
  query GetAllCategories {
    getAllCategories {
      id
      name
    }
  }
`;

export const GET_CATEGORY_AND_ADS_QUERY = gql`
  query GetCategoryById($getCategoryByIdId: String!) {
    getCategoryById(id: $getCategoryByIdId) {
      id
      name
      ads {
        id
        location
        owner
        picture
        price
        tags {
          id
          name
        }
        title
        createdAt
        description
      }
    }
  }
`;
