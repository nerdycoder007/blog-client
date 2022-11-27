import React from "react";
import { useRouter } from "next/router";
import Button from "../../components/utils/Button";
import Link from "next/link";
import Image from "next/image";
function SinglePost() {
  const { query } = useRouter();
  console.log(query.postSlug);
  return (
    <div className="my-8 flex items-start  p-2 ">
      <div className="flex-2 flex flex-[4_4_0%] flex-col items-start gap-8  px-16 ">
        <div className="mb-4 p-2 shadow-md">
          <h1 className=" cursor-pointer font-content text-3xl  text-slate-700  dark:text-slate-200">
            The Rise of Artificial Intelligence and the Future of Humans in the
            name of Dominancy
          </h1>
          <Link href="/author" passHref>
            <div className="my-4 flex w-fit cursor-pointer items-center gap-4">
              <div className="relative h-6 w-6 rounded-full">
                <Image
                  className="rounded-full"
                  src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <p className="font-heading text-sm text-gray-500 dark:text-gray-300">
                Joshua Wood
              </p>
              <div className="h-1 w-1 rounded-full bg-gray-500 dark:text-gray-300"></div>
              <p className="font-heading text-sm text-gray-500 dark:text-gray-300">
                October 22, 2022
              </p>
            </div>
          </Link>
        </div>
        <div className="relative mx-auto h-96 w-full cursor-pointer rounded-md shadow-md duration-300">
          <Image
            priority
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
            src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          />
        </div>

        <div
          className=" prose-zinc prose font-content prose-h1:font-normal prose-h1:text-slate-700 prose-p:text-slate-700  dark:prose-invert"
          dangerouslySetInnerHTML={{
            __html: `<p>OK <code>npm run dev</code> to get all exclusive features </p>
            <pre><code>function onEditorStateChange(editorState) {<br>    setEditorState(editorState);<br>  }</code></pre>
            <h1>This should be ok</h1>
`,
          }}
        ></div>
      </div>
      <div className="flex-2 flex-1 flex-col gap-y-8 border-l-[1px] border-l-slate-500  px-4  ">
        {/* Top Buttons */}
        <div className="flex justify-between gap-4 ">
          <div className="flex-1">
            <Button className={"w-full"}>Create</Button>
          </div>
          <button className="link">Sign in</button>
        </div>
        {/* User details */}
        <div className="my-4 flex flex-col justify-start">
          <div className="relative h-16 w-16 rounded-full">
            <Image
              className="rounded-full"
              src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePost;
