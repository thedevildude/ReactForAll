import { useState } from "react";
import AppContainer from "./AppContainer";
import Header from "./Header";
import Home from "./components/Home";
import FormList from "./components/FormList";

function App() {
  const [state, setState] = useState("HOME");

  const openForm = () => {
    setState("FORM");
  };
  const closeForm = () => {
    setState("HOME");
  };

  return (
    <AppContainer>
      <div className="p-4 mx-auto bg-white shadow-lg rounded-xl">
        <Header title="Welcome to Lesson 5 of $react-typescript with #tailwindcss" />
        {state === "HOME" ? (
          <Home openFormCB={openForm} />
        ) : (
          <FormList closeFormCB={closeForm}/>
        )}
      </div>
    </AppContainer>
  );
}

export default App;
