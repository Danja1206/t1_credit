import React, { FC, Suspense, useEffect } from "react";
import { Route, Routes } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { RootType } from "./store";
import { toggleOpenMenu, toggleWrapper } from "./store/features/gWrapperslice";
import { toggleUserData } from "./store/features/userSlice";
import { toggleDeleteWind, togglePayment } from "./store/features/alertSlice";

import "./App.scss";

import Navbar from "./components/navbar/Navbar";
import NotFound from "./pages/not-found/NotFound";
import ConfigWindow from "./alerts/config-window/ConfigWindow";
import MakePayment from "./alerts/make-payment/MakePayment";

import AlertWindow from "./alerts/alert-window/AlertWindow";
import PageLoader from "./loaders/page-loader/PageLoader";

const MainPage = React.lazy(() => import("./pages/main-page/MainPage"));
const PersonalAccount = React.lazy(
  () => import("./pages/personal-account/PersonalAccount")
);
const ForDeveloper = React.lazy(
  () => import("./pages/for-developer/ForDeveloper")
);

const App: FC = () => {
  const dispatch = useDispatch();

  const { isGlobal } = useSelector((state: RootType) => state.gWrapperSlice);

  const handleglobal = (): void => {
    dispatch(toggleWrapper(false));
    dispatch(toggleOpenMenu(false));
    dispatch(toggleDeleteWind(false));
    dispatch(togglePayment(false));
  };

  useEffect(() => {
    if (localStorage.getItem("token"))
      dispatch(
        toggleUserData({
          jwtToken: localStorage.getItem("token") || "",
          isAuth: true,
        })
      );
  }, []);

  return (
    <>
      <Navbar />
      <AlertWindow />
      <ConfigWindow />
      <MakePayment />
      <div
        className={isGlobal ? "global-wrapper visible" : "global-wrapper"}
        onClick={handleglobal}
      ></div>

      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<PageLoader />}>
              <MainPage />
            </Suspense>
          }
        />
        <Route
          path="/developer"
          element={
            <Suspense fallback={<PageLoader />}>
              <ForDeveloper />
            </Suspense>
          }
        />
        <Route
          path="/account"
          element={
            <Suspense fallback={<PageLoader />}>
              <PersonalAccount />
            </Suspense>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default App;
