import { useState } from "react";
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

  return state === "HOME" ? (
    <Home openFormCB={openForm} />
  ) : (
    <FormList closeFormCB={closeForm} />
  );
}

export default App;
