import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import SubFilters from "../components/SubFilters";
import { Divider } from "antd";
import MediumCard from "../components/MediumCard";
import Container from "../components/Container";
import useCoordinates from "../hooks/useCoordinates";
import { services } from "../data/services";
import { useDispatch, useSelector } from "react-redux";
import { selectServices, setServices } from "../redux/slices/servicesSlice";
import { useQuery } from "@tanstack/react-query";
import { getServices } from "../queries/servicesQueries";
import Skeleton from "../components/Skeleton";

export default function Home() {
  const { setToggleGuest, setToggleDate } = useContext(AppContext);
  const { lat, long } = useCoordinates();
  // eslint-disable-next-line no-unused-vars
  const dbServices = useSelector(selectServices);
  const [isTrending, setIsTrending] = useState(false);
  const maxDistance = 1000;
  const dispatch = useDispatch();
  const getServicesQuery = useQuery({
    queryKey: ["services", lat, long, maxDistance],
    meta: {
      query: {
        lat,
        long,
        maxDistance,
      },
    },
    queryFn: getServices,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchOnWindowFocus: false,
    retry: false,
    enabled: false,
  });
  const [newServices, setNewServices] = useState([]);

  useEffect(() => {
    if (lat && long) {
      getServicesQuery.refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lat, long]);

  useEffect(() => {
    if (getServicesQuery.isSuccess) {
      dispatch(setServices(getServicesQuery.data.data));
      setNewServices(getServicesQuery.data.data);
    }
  }, [dispatch, getServicesQuery.data, getServicesQuery.isSuccess]);

  return (
    <div
      onClick={() => {
        setToggleGuest(false);
        setToggleDate(false);
      }}
    >
      <Container>
        <SubFilters setIsTrending={setIsTrending} />
        <Divider className="m-0 p-0 border-b-2 border-b-red-50" />

        {
          <div className="grid grid-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 pt-5">
            {!!dbServices?.length &&
              dbServices.map((service, index) => (
                <MediumCard key={service._id + index} {...service} />
              ))}
          </div>
        }
        {!!dbServices && <Divider>NearBy</Divider>}
        {isTrending ? (
          <div className="grid grid-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 pt-5">
            {!!services?.length &&
              services.map((service, index) => (
                <MediumCard key={service._id + index} {...service} />
              ))}
          </div>
        ) : getServicesQuery.isPending ? (
          <div className="grid grid-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 pt-5">
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
            <Skeleton />
          </div>
        ) : newServices?.length ? (
          <div className="grid grid-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 pt-5">
            {newServices.map((service, index) => (
              <MediumCard key={service._id + index} {...service} />
            ))}
          </div>
        ) : (
          <p className="flex items-center justify-center text-2xl font-extrabold text-red-500 my-10">
            No Nearby Hotel found
          </p>
        )}

        {/* {newServices?.length ? (
          <div className="grid grid-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 pt-5">
            {newServices.map((service, index) => (
              <MediumCard key={service._id + index} {...service} />
            ))}
          </div>
        ) : (
          <p className="flex items-center justify-center text-2xl font-extrabold text-red-500 my-10">
            No Nearby Hotel found
          </p>
        )} */}

        {/* testing */}
        {/* {dbServices?.length ? (
          <div className="grid grid-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 pt-5">
            {newServices.map((service, index) => (
              <MediumCard key={service._id + index} {...service} />
            ))}
          </div>
        ) : (
          <p className="flex items-center justify-center text-2xl font-extrabold text-red-500 my-10">
            No Nearby Hotel found
          </p>
        )} */}

        {/* {isTrending && (
          <div className="grid grid-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5 pt-5">
            {!!services?.length &&
              services.map((service, index) => (
                <MediumCard key={service._id + index} {...service} />
              ))}
          </div>
        )} */}
      </Container>
    </div>
  );
}
