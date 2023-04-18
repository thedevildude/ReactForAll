import { useRoutes } from "raviger";
import About from "../components/About";
import AppContainer from "../AppContainer";
import ReactForm from "../ReactForm";
import Home from "../components/Home";

const routes = {
  "/": () => <Home />,
  "/about": () => <About />,
  "/forms/:id": ({ id }: { id: string }) => <ReactForm id={Number(id)} />,
};

export default function AppRouter() {
  let routeResult = useRoutes(routes);
  return <AppContainer>{routeResult}</AppContainer>;
}
