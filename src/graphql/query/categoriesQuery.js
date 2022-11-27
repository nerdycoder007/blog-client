import gcl from "../index";

import { gql } from "graphql-request";

const getCategories = async () => {
  const getCategoriesQuery = gql`
    query getAllCategories {
      getCategories {
        id
        title
      }
    }
  `;

  const result = await gcl.request(getCategoriesQuery);
  return result;
};

export default getCategories;
