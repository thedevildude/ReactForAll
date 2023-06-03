import React from "react";
import { useRoutes, Redirect } from "raviger";
import About from "../components/About";
import AppContainer from "../components/AppContainer";
import ReactForm from "../components/ReactForm";
import PreviewForm from "../components/PreviewForm";
import Login from "../components/Login";
import { User } from "../types/userTypes";
import Submissions from "../components/Submissions";
const Home = React.lazy(() => import("../components/Home"));

const routes = {
  "/": () => (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Home />
    </React.Suspense>
  ),
  "/about": () => <About />,
  "/login": () => <Login />,
  "/forms/:id": ({ id }: { id: string }) => <ReactForm id={Number(id)} />,
  "/preview/:formId": ({ formId }: { formId: string }) => (
    <PreviewForm formId={Number(formId)} />
  ),
  "/submissions/:id": ({ id }: { id: string }) => (
    <Submissions id={Number(id)} />
  ),
  "*": () => <Redirect to="/" />,
};

export default function AppRouter(props: { currentUser: User }) {
  let routeResult = useRoutes(routes);
  return (
    <AppContainer currentUser={props.currentUser}>{routeResult}</AppContainer>
  );
}
