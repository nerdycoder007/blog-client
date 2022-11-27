import React from "react";

function LinkText({ className, children, ...rest }) {
  return (
    <div
      {...rest}
      className={`cursor-pointer font-heading text-sm text-gray-700 hover:text-gray-900 dark:text-slate-100  ${className}  `}
    >
      {children}
    </div>
  );
}

export default LinkText;
