import { useRoutes, Redirect } from "raviger";
import About from "../components/About";
import AppContainer from "../AppContainer";
import ReactForm from "../components/ReactForm";
import Home from "../components/Home";
import PreviewForm from "../components/PreviewForm";

const routes = {
  "/": () => <Home />,
  "/about": () => <About />,
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
