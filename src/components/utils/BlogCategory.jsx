import { Combobox } from "@headlessui/react";
import React, { useEffect, useRef, useState } from "react";

const BlogCategory = ({ handleSelectedCategories, categories }) => {
  const [showDropdown, setShowDropdown] = useState();
  const comboBoxRef = useRef();
  const [query, setQuery] = useState("");
  const filteredProjects = query
    ? categories.filter((category) =>
        category.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];
  //   useEffect(() => {
  //     function handleOutsideClick(e) {
  //       if (!comboBoxRef.current.contains(e.target)) {
  //         setShowDropdown(false);
  //       }
  //     }
  //     document.addEventListener("click", handleOutsideClick);
  //     return () => {
  //       document.removeEventListener("click", handleOutsideClick);
  //     };
  //   }, []);

  return (
    <Combobox
      as="div"
      className={"relative w-full"}
      onChange={(item) => {
        handleSelectedCategories(item);
      }}
    >
      <Combobox.Input
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        placeholder="Search for categories"
        className={"w-full text-gray-800 placeholder-gray-400"}
      />
      <Combobox.Options
        className={"absolute max-h-52 w-full overflow-auto bg-white shadow-md"}
      >
        {filteredProjects.map((item) => (
          <Combobox.Option key={Math.random()} value={item}>
            {({ active }) => {
              return (
                <ComboBoxOption active={active}>{item.title}</ComboBoxOption>
              );
            }}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
};

function ComboBoxOption({ children, active, ...rest }) {
  return (
    <div
      className={`cursor-pointer p-2 hover:bg-slate-100 ${
        active && "bg-blue-100"
      }`}
      {...rest}
    >
      {children}
    </div>
  );
}

export default BlogCategory;
