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
      <div className="z-50">
        <Header />
      </div>
      <div className="z-30">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}
