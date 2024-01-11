import { useContext } from "react";
import { AppContext } from "../App";
import SubFilters from "../components/SubFilters";
import { Divider } from "antd";
import MediumCard from "../components/MediumCard";
import { services } from "../data/services";
import Container from "../components/Container";

export default function Home() {
  const { setToggleGuest, setToggleDate } = useContext(AppContext);

  return (
    <div
      onClick={() => {
        setToggleGuest(false);
        setToggleDate(false);
      }}
    >
      <Container>
        <SubFilters />
        <Divider className="m-0 p-0 border-b-2 border-b-red-50" />
        <div className="grid grid-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 pt-5">
          {services.map((service, index) => {
            return <MediumCard key={service.serviceId + index} {...service} />;
          })}
        </div>
      </Container>
    </div>
  );
}
