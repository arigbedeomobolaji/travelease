import { useContext } from "react";
import Banner from "../components/Banner";
import { AppContext } from "../App";

export default function Home() {
  const { setToggleGuest } = useContext(AppContext);

  return (
    <div onClick={() => setToggleGuest(false)}>
      <Banner />
    </div>
  );
}
