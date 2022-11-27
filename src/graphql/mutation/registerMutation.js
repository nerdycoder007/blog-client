import gcl from "..";
import { gql } from "graphql-tag";

export const REGISTER_USER = gql`
  mutation (
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    userRegister(
      userRegisterInput: {
        username: $username
        email: $email
        password: $password
        confirmPassword: $confirmPassword
      }
    )
  }
`;
