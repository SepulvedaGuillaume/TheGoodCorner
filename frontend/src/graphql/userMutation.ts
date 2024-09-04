import { gql } from "@apollo/client";

export const USER_REGISTER_MUTATION = gql`
  mutation RegisterUser($email: String!, $password: String!, $role: String!) {
    createUser(email: $email, password: $password, role: $role) {
      id
      email
      role
    }
  }
`;
