import { Outlet } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";

function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}

export default RootLayout;