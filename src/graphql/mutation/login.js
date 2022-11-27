import { gql } from "graphql-tag";

export const USER_LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    userLogin(userLoginInput: { email: $email, password: $password }) {
      accessToken
      id
      username
    }
  }
`;
