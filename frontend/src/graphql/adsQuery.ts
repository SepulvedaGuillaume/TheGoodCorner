import { gql } from "@apollo/client";

export const GET_ALL_ADS_QUERY = gql`
  query GetAllAds {
    getAllAds {
      id
      title
      description
      owner
      price
      picture
      location
      createdAt
      category {
        name
      }
      tags {
        name
      }
    }
  }
`;

export const GET_AD_QUERY = gql`
  query GetAdById($getAdByIdId: String!) {
    getAdById(id: $getAdByIdId) {
      id
      title
      description
      owner
      price
      picture
      location
      createdAt
      category {
        name
      }
      tags {
        name
      }
    }
  }
`;

export const SEARCH_ADS_QUERY = gql`
  query SearchAds($searchTerm: String!) {
    searchAds(searchTerm: $searchTerm) {
      id
      title
      description
      owner
      price
      picture
      location
      createdAt
      category {
        name
      }
      tags {
        name
      }
    }
  }
`;
