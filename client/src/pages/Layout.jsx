import { useContext } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { AppContext } from "../App";
export default function Layout() {
  const { setCurrent, setToggleDate } = useContext(AppContext);
  return (
    <div
      onClickCapture={() => {
        setCurrent("");
        setToggleDate(false);
      }}
    >
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
