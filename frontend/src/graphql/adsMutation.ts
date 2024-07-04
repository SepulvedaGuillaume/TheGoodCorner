import { gql } from "@apollo/client";

export const CREATE_AD_MUTATION = gql`
  mutation CreateAd($data: AdInput!) {
    createAd(data: $data) {
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

export const UPDATE_AD_MUTATION = gql`
  mutation UpdateAd($data: UpdateAdInput!, $updateAdId: String!) {
    updateAd(data: $data, id: $updateAdId) {
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

export const DELETE_AD_MUTATION = gql`
  mutation DeleteAd($deleteAdId: String!) {
    deleteAd(id: $deleteAdId)
  }
`;
