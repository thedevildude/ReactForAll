import React from "react";
import Header from "./Header";
import { User } from "../types/userTypes";

const AppContainer = (props: { currentUser: User, children: React.ReactNode }) => {
  return (
    <div className="flex h-screen bg-gray-100 items-center">
      <div className="p-4 mx-auto max-h-screen bg-white shadow-lg rounded-xl">
        <Header currentUser={props.currentUser}/>
        {props.children}
      </div>
    </div>
  );
};

export default AppContainer;
