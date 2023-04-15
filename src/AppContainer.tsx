import React from "react";
import Header from "./Header";

const AppContainer = (props: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-100 items-center">
      <div className="p-4 mx-auto max-h-screen bg-white shadow-lg rounded-xl">
        <Header />
        {props.children}
      </div>
    </div>
  );
};

export default AppContainer;
