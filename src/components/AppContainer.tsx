import React from "react";
import Header from "./Header";
import { User } from "../types/userTypes";

const AppContainer = (props: {
  currentUser: User;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-screen bg-gray-100 items-center">
      <div className="mx-auto bg-white shadow-lg rounded-xl overflow-hidden">
        <Header currentUser={props.currentUser} />
        <div className="p-4 h-full overflow-y-auto">{props.children}</div>
      </div>
    </div>
  );
};

export default AppContainer;
