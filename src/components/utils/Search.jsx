import { Combobox } from "@headlessui/react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
const Search = ({ onClick, placement }) => {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const comboBoxRef = useRef(null);
  const inputRef = useRef(null);
  const mainBoxRef = useRef(null);
  const [categories, setCategories] = useState([{ id: 1, title: "Hello" }]);
  console.log("Searchbar rendered");
  // Click outside to hide search panel
  useEffect(() => {
    function handleOutsideClick(e) {
      if (placement === "navbar" && !comboBoxRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
      if (placement !== "navbar" && !mainBoxRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  // Graphql Request to get categories
  async function queryCategories(keyword) {
    // if (keyword) {
    //   try {
    //     const result = await getCategories(keyword);
    //     if (result.getCategories) {
    //       setCategories(result.getCategories);
    //     } else {
    //       setCategories([]);
    //     }
    //   } catch (error) {
    //     setCategories([]);
    //     console.log(error);
    //   }
    // } else {
    //   setCategories([]);
    // }
  }
  return (
    <Combobox
      as="div"
      className={"relative ml-auto  w-[30%]"}
      onChange={(item) => {
        router.push(
          `/search/[searchId]?id=${item.id}`,
          `/search/${item.title.toLowerCase()}`
        );
      }}
      ref={mainBoxRef}
    >
      <div
        ref={comboBoxRef}
        className={`flex items-center border bg-white  dark:border-gray-900 dark:bg-black ${
          showDropdown
            ? `rounded-bl-none rounded-br-none  shadow-sm`
            : `rounded-md   `
        }  `}
      >
        <Combobox.Input
          onFocus={() => setShowDropdown(true)}
          onChange={(e) => {
            queryCategories(e.target.value);
            //TODO: Make new api calls everytime on change to get categories
          }}
          ref={inputRef}
          className="h-12 w-full border-0 bg-transparent text-sm font-semibold text-gray-500 placeholder:text-sm  placeholder:text-gray-400  focus:ring-0 dark:text-gray-200  placeholder:dark:text-gray-300 "
          placeholder="Search by title or categories"
        />
        <button>
          <MagnifyingGlassIcon className="h-12 w-12 cursor-pointer border-l border-gray-300 px-3 text-gray-500 transition duration-200 ease-in-out hover:text-blue-700 dark:border-gray-500 dark:text-gray-200" />
        </button>
      </div>

      <Combobox.Options
        static={showDropdown}
        className={
          "absolute z-10 mb-4 h-96 w-full overflow-auto rounded-bl-md rounded-br-md border border-t bg-white py-4 dark:border-gray-600 dark:bg-slate-900  dark:text-gray-200"
        }
      >
        {categories.length ? (
          categories.map((item) => {
            return (
              <Combobox.Option value={item} key={item.id}>
                {({ active }) => (
                  <ComboboxOption active={active}>
                    {item.title.toLowerCase()}
                  </ComboboxOption>
                )}
              </Combobox.Option>
            );
          })
        ) : (
          <p className="select-none px-3 text-slate-400 dark:text-gray-300">
            Type to start search
          </p>
        )}

        <div className={`mb-4 mt-4 px-3 `}>
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold  text-gray-700 dark:text-gray-200">
              Recent searches
            </h1>
            <button className="text-sm font-semibold text-gray-500  transition hover:text-gray-700 dark:text-gray-300">
              Clear
            </button>
          </div>
          <div className="my-2 flex flex-wrap gap-4  ">
            <Link href="/about">
              <div className="flex cursor-pointer items-center  gap-2 rounded-md border p-2 transition duration-200 hover:border-gray-700 dark:border-gray-600 dark:bg-slate-900 dark:hover:bg-slate-800">
                <h4 className="text-sm font-semibold text-gray-900  dark:text-gray-200">
                  Football
                </h4>
                <MagnifyingGlassIcon className="h-4 w-4 font-bold  text-gray-400 dark:text-gray-200" />
              </div>
            </Link>
          </div>
        </div>
      </Combobox.Options>
    </Combobox>
  );
};

export default Search;
export const MemorizedSearchBar = React.memo(Search);

function ComboboxOption({ active, children }) {
  return (
    <div
      className={`cursor-pointer py-1 px-3 text-lg font-medium text-gray-400 hover:bg-blue-100 hover:text-black dark:text-gray-200 dark:hover:bg-slate-800 ${
        active ? "bg-blue-200 dark:bg-gray-700" : ""
      } `}
    >
      {children}
    </div>
  );
}
