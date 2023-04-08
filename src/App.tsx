import AppContainer from "./AppContainer";
import Header from "./Header";
import ReactForm from "./ReactForm";

const formFields = [
  {  id:1, label:"First Name", type:"text" },
  {  id:2, label:"Last Name", type:"text"},
  {  id:3, label:"Email", type:"email"},
  {  id:4, label:"Date of Birth", type:"date"},
  {  id:5, label:"Phone number", type:"number"}
];

function App() {
  return (
    <AppContainer>
      <div className="p-4 mx-auto bg-white shadow-lg rounded-xl">
        <Header title="Welcome to Lesson 5 of $react-typescript with #tailwindcss" />
        <ReactForm formFields={formFields} />
        <button className="py-2 px-5 mt-2 text-white bg-blue-500 font-semibold rounded-lg">Submit</button>
      </div>
    </AppContainer>
  );
}

export default App;
