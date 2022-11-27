import gcl from "..";
import { gql } from "graphql-request";
const blogPost = async (blogPostInput) => {
  const blogPostMutation = gql`
    mutation ($blogPostInput: blogPostInput!) {
      blogPost(blogPostInput: $blogPostInput) {
        blogTitle
        blogContent
      }
    }
  `;

  const result = await gcl.request(blogPostMutation, { blogPostInput });
  return result;
};
export default blogPost;
