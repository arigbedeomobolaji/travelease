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
        <div className="flex flex-wrap gap-5 py-5 justify-start mx-5 md:justify-start">
          {services.map((service, index) => {
            return <MediumCard key={service.serviceId + index} {...service} />;
          })}
        </div>
      </Container>
    </div>
  );
}
