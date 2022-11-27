import Image from "next/image";
import React, { useState } from "react";
import Button from "../components/utils/Button";
import { LinkIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Markdown from "markdown-to-jsx";
import blogPost from "../graphql/mutation/blogMutation";
import Code from "../components/Code";
import BlogCategory from "../components/utils/BlogCategory";
import Head from "next/head";
import getCategories from "../graphql/query/categoriesQuery";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

function write({ categoriesData }) {
  const { username, id } = useSelector((state) => state.auth.value);
  const router = useRouter();

  const [blogImage, setBlogImage] = useState("");
  const [blogTitle, setBlogTitle] = useState("");
  const [data, setData] = useState("");
  const [categories, setCategories] = useState(categoriesData);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [localBlogImage, setLocalBlogImage] = useState({
    fileURL: "",
    fileName: "",
    fileSize: "",
  });
  const [markdownFile, setMarkdownFile] = useState();
  function handleSelectedCategories(item) {
    setSelectedCategories((prevItem) => {
      return [...prevItem, item];
    });
    const newCategories = categories.filter(
      (category) => category.title !== item.title
    );
    setCategories(newCategories);
  }
  function handleImageUpload(e) {
    const file = e.target.files[0];
    setBlogImage(file);
    setLocalBlogImage({
      fileURL: URL.createObjectURL(file),
      fileName: file.name,
      fileSize: file.size,
    });
  }
  function handleFileUpload(e) {
    const file = e.target.files[0];
    setMarkdownFile(file);
  }

  async function handleSubmit() {
    // e.preventDefault();
    console.log(selectedCategories.map((item) => Number(item.id)));
    const blogPostInput = {
      blogTitle,
      blogContent: markdownFile,
      blogUserId: id,
      blogImage: blogImage,
      categoriesId: selectedCategories.map((item) => Number(item.id)),
    };
    try {
      const result = await blogPost(blogPostInput);
      setData(result.blogPost.blogContent);
    } catch (error) {
      console.log(error);
    }
  }
  if (!username) {
    router.replace("/");
    return;
  }
  return (
    <div className="flex items-center justify-center">
      <Head>
        <title>Blog | Create</title>
      </Head>
      <div className="my-8 flex w-[50%] flex-col gap-8">
        <div>
          <p className="font-heading text-xl">Blog Title</p>
          <textarea
            name=""
            onChange={(e) => setBlogTitle(e.target.value)}
            value={blogTitle}
            id=""
            cols="30"
            rows="2"
            className="my-2 w-full resize-y p-2  font-source text-3xl focus:outline-none dark:bg-slate-800 "
          ></textarea>
        </div>
        <div>
          <p className="font-heading text-xl">Blog Image</p>
          {localBlogImage.fileURL ? (
            <div className="relative my-4 flex items-center pr-2 shadow-md after:absolute after:top-0 after:left-0 after:h-full after:w-[3px] after:bg-purple-700 dark:bg-slate-800">
              <div className="relative mr-4 h-[100px] w-[100px]">
                <Image
                  src={localBlogImage.fileURL}
                  layout="fill"
                  objectFit="contain"
                />
              </div>
              <p className="mr-auto text-sm text-purple-700 dark:text-purple-400 ">
                {localBlogImage.fileName.length > 25
                  ? localBlogImage.fileName.split(".")[0].slice(0, 26) +
                    "." +
                    localBlogImage.fileName.split(".")[1]
                  : localBlogImage.fileName}
              </p>
              <p className="badge mx-4 rounded-none border-0 bg-green-300 text-slate-800 dark:bg-green-600 dark:text-slate-100">
                {(localBlogImage.fileSize / (1024 * 1024)).toFixed(2)} MB
              </p>
              <button
                onClick={() =>
                  setLocalBlogImage({
                    fileURL: "",
                    fileName: "",
                    fileSize: "",
                  })
                }
                className="btn-error btn-sm  btn rounded-none text-white "
              >
                Remove
              </button>
            </div>
          ) : (
            ""
          )}
          <input
            id="post-image-upload"
            type="file"
            accept="image/*"
            name="postImage"
            hidden
            onChange={(e) => handleImageUpload(e)}
          />
          <label
            htmlFor="post-image-upload"
            className="font-body my-2 flex cursor-pointer items-center justify-center gap-2  border-2 border-purple-700 py-2 px-3   text-purple-700 duration-200 ease-in-out hover:bg-purple-700 hover:text-white  md:px-5  md:py-3"
          >
            <LinkIcon className="icon" />
            Add blog image
          </label>
        </div>
        <div className="flex flex-col gap-2">
          <h1 className="font-heading text-xl">Blog Category</h1>
          <BlogCategory
            categories={categories}
            handleSelectedCategories={handleSelectedCategories}
          />
          <div className="flex flex-wrap gap-2">
            {selectedCategories.map((item) => {
              return (
                <Tag
                  key={Math.random()}
                  onClick={() => {
                    setSelectedCategories(
                      selectedCategories.filter(
                        (category) => category.title !== item.title
                      )
                    );
                    setCategories((prevItem) => {
                      return [...prevItem, item];
                    });
                  }}
                >
                  {item.title}
                </Tag>
              );
            })}
          </div>
        </div>
        <div>
          <p className="font-heading text-xl">Blog Content</p>
          {markdownFile ? (
            <div className="relative my-4 flex h-[100px]  items-center pr-2 shadow-md after:absolute after:top-0 after:left-0 after:h-full after:w-[3px] after:bg-purple-700 dark:bg-slate-800">
              <p className="mr-auto ml-4 text-sm text-purple-700 dark:text-purple-400 ">
                {markdownFile.name}
              </p>
              <p className="badge mx-4 rounded-none border-0 bg-green-300 text-slate-800 dark:bg-green-600 dark:text-slate-100">
                {(markdownFile.size / 1024).toFixed(2)} KB
              </p>
              <button
                onClick={() => setMarkdownFile()}
                className="btn-error btn-sm  btn rounded-none text-white "
              >
                Remove
              </button>
            </div>
          ) : (
            ""
          )}
          <input
            id="blog-file-upload"
            type="file"
            accept=".md"
            name="postImage"
            hidden
            onChange={(e) => handleFileUpload(e)}
          />
          <label
            htmlFor="blog-file-upload"
            className="font-body my-2 flex cursor-pointer items-center justify-center gap-2  border-2 border-purple-700 py-2 px-3   text-purple-700 duration-200 ease-in-out hover:bg-purple-700 hover:text-white  md:px-5  md:py-3"
          >
            <LinkIcon className="icon" />
            Attach markdown file
          </label>
        </div>
        <div className="flex justify-end gap-4 ">
          <Button
            className="w-48"
            onClick={() => {
              // TODO: Save blog to draft
            }}
          >
            Save as draft
          </Button>
          <Button className="w-48" onClick={() => handleSubmit()}>
            publish
          </Button>
        </div>

        {data && (
          <div className="prose dark:prose-invert">
            <Markdown options={{ overrides: { pre: { component: Code } } }}>
              {data}
            </Markdown>
          </div>
        )}

        {/* <MyEditor /> */}
      </div>
    </div>
  );
}
function Tag({ children, ...rest }) {
  return (
    <div
      className="group flex cursor-pointer items-center gap-1 rounded-full bg-slate-200 p-2 "
      {...rest}
    >
      <p className="text-[13px] text-gray-800 transition ease-in-out group-hover:text-red-500">
        {children}
      </p>
      <XMarkIcon className="h-4 w-4 transition ease-in-out group-hover:text-red-500" />
    </div>
  );
}
export default write;
export async function getServerSideProps() {
  const result = await getCategories();
  return {
    props: {
      categoriesData: result.getCategories,
    },
  };
}
