import React from "react";

const HomeHeader = () => {
  return (
    <header role="banner" className="w-full p-4 text-right">
      <ul>
        <ul className="pb-4">
          <li>my name is</li>
          <li className="text-lg font-semibold custom-underline inline-block">
            Jose Terrones.
          </li>
        </ul>

        <ul className="pb-4">
          <li>profession</li>
          <li className="text-lg font-semibold custom-underline inline-block">
            Software Engineer.
          </li>
        </ul>
      </ul>
    </header>
  );
};

export default HomeHeader;
