import { useRoutes, Redirect } from "raviger";
import About from "../components/About";
import AppContainer from "../components/AppContainer";
import ReactForm from "../components/ReactForm";
import Home from "../components/Home";
import PreviewForm from "../components/PreviewForm";
import Login from "../Login";

const routes = {
  "/": () => <Home />,
  "/about": () => <About />,
  "/login": () => <Login />,
  "/forms/:id": ({ id }: { id: string }) => <ReactForm id={Number(id)} />,
  "/preview/:formId": ({ formId }: { formId: string }) => (
    <PreviewForm formId={Number(formId)} />
  ),
  "*": () => <Redirect to="/" />,
};

export default function AppRouter() {
  let routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
