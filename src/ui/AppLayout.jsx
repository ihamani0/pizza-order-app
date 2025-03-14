import React from "react";
import { Outlet, useNavigation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import Loader from "./Loader";

function AppLayout() {
  const navigate = useNavigation();
  const loadingSpinner = navigate.state === "loading";
  return (
    <div className="grid h-dvh  bg-grid  grid-rows-[auto_1fr_auto]">
      {loadingSpinner && <Loader />}
      <Header />

      <div className="overflow-auto h-full">
        <div className="mx-auto max-w-3xl ">
          <Outlet />
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AppLayout;
