import React from "react";
import { useRoutes, Redirect } from "raviger";
import { User } from "../types/userTypes";
import LazyLoading from "../components/LazyLoading";
import AppContainer from "../components/AppContainer";
const About = React.lazy(() => import("../components/About"));
const ReactForm = React.lazy(() => import("../components/ReactForm"));
const PreviewForm = React.lazy(() => import("../components/PreviewForm"));
const Login = React.lazy(() => import("../components/Login"));
const Submissions = React.lazy(() => import("../components/Submissions"));
const Home = React.lazy(() => import("../components/Home"));

const routes = {
  "/": () => (
    <React.Suspense fallback={<LazyLoading />}>
      <Home />
    </React.Suspense>
  ),
  "/about": () => (
    <React.Suspense fallback={<LazyLoading />}>
      <About />
    </React.Suspense>
  ),
  "/login": () => (
    <React.Suspense fallback={<LazyLoading />}>
      <Login />
    </React.Suspense>
  ),
  "/forms/:id": ({ id }: { id: string }) => (
    <React.Suspense fallback={<LazyLoading />}>
      <ReactForm id={Number(id)} />
    </React.Suspense>
  ),
  "/preview/:formId": ({ formId }: { formId: string }) => (
    <React.Suspense fallback={<LazyLoading />}>
      <PreviewForm formId={Number(formId)} />
    </React.Suspense>
  ),
  "/submissions/:id": ({ id }: { id: string }) => (
    <React.Suspense fallback={<LazyLoading />}>
      <Submissions id={Number(id)} />
    </React.Suspense>
  ),
  "*": () => <Redirect to="/" />,
};

export default function AppRouter(props: { currentUser: User }) {
  let routeResult = useRoutes(routes);
  return (
    <AppContainer currentUser={props.currentUser}>{routeResult}</AppContainer>
  );
}
