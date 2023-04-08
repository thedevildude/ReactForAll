import React from "react";
import logo from "../logo.svg";

const Home = (props: { openFormCB: () => void }) => {
  return (
    <div className="flex flex-col justify-center">
      <div className="flex">
        <img className="h-48" src={logo} alt="logo" />
        <div className="flex flex-1 items-center justify-center">
          <p>Welcome to the Home Page</p>
        </div>
      </div>
      <button
        className="py-2 px-5 mt-2 text-white bg-blue-500 hover:bg-blue-700 font-semibold rounded-lg"
        onClick={props.openFormCB}
      >
        Open Form
      </button>
    </div>
  );
};

export default Home;
