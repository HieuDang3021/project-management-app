import React from "react";

type Props = {
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  buttonComponent?: any;
  isSmallText?: boolean;
};

const Header = ({ name, buttonComponent, isSmallText = false }: Props) => {
  return (
    <div className="mb-5 flex w-full items-center justify-between">
      <h1
        className={`${isSmallText ? "text-lg" : "text-2xl"} font-semibold text-gray-800 dark:text-gray-100`}
      >
        {name}
      </h1>
      {buttonComponent}
    </div>
  );
};

export default Header;
