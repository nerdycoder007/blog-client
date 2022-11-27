import { GraphQLClient } from "graphql-request";
console.log(process.env.GRAPHQL_ENDPOINT);
const gcl = new GraphQLClient("http://localhost:8000/graphql");
export default gcl;
