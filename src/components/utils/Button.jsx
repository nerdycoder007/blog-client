import React from "react";

function Button({ children, className, ...rest }, ref) {
  return (
    <button
      ref={ref}
      className={`font-body btn cursor-pointer gap-2 rounded-full border-2 border-purple-700  bg-transparent py-3 px-5 text-purple-700   duration-200  ease-in-out hover:border-purple-700 hover:bg-purple-700  hover:text-white dark:text-white md:px-5 md:py-3   ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
}

Button.displayName = "Button";
export default React.forwardRef(Button);
