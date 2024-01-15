/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { MenuOutlined, UserOutlined } from "@ant-design/icons";
import Search from "./search/Search";
import { useMediaQuery } from "@react-hook/media-query";
import Container from "./Container";
import AuthModal from "./modal/AuthProcess/AuthModal";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserAndToken,
  selectToken,
  selectUser,
} from "../redux/slices/userSlice";
import { useQuery } from "@tanstack/react-query";
import { logoutUser } from "../queries/user.queries";
import { toast } from "react-toastify";
import { errorFormat } from "../utils/errorFormat";
import { AppContext } from "../App";

const authItems = [
  {
    label: "Register",
    key: "register",
    route: "register",
  },
  {
    label: "Login",
    key: "login",
    route: "login",
  },
];

function MenuItem({ label, route, handleOpenAuthModal, setLabel }) {
  const navigate = useNavigate();

  function handleClick() {
    if (route === "register" || route === "login") {
      setLabel(label);
      handleOpenAuthModal();
    } else {
      navigate("/" + route);
    }
  }
  return (
    <div
      key={route}
      className="text-gray-800 rounded-lg cursor-pointer  p-3 hover:bg-red-50"
      onClick={handleClick}
    >
      {label}
    </div>
  );
}

export default function Header() {
  const isVerySmallScreen = useMediaQuery("(max-width: 450px)");
  const [toggleMenu, setToggleMenu] = useState(false);
  const [label, setLabel] = useState("");
  const user = useSelector(selectUser);
  const token = useSelector(selectToken);
  const logout = useQuery({
    queryKey: ["logout", user?._id, token],
    queryFn: logoutUser,
    retry: false,
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (logout?.data) {
      dispatch(deleteUserAndToken());
    }
  }, [dispatch, logout, logout.data]);

  useEffect(() => {
    if (logout?.isError) {
      // if (errorFormat(logout.error) === "");
      const { status, message } = errorFormat(logout.error);
      if (status === 401) {
        dispatch(deleteUserAndToken());
        toast(message, {
          position: "top-right",
        });
      } else {
        // dispatch(deleteUserAndToken());
        toast(message, {
          position: "top-right",
        });
      }
    }
  }, [dispatch, logout.error, logout.isError]);

  const { handleOpenAuthModal, openAuthModal } = useContext(AppContext);
  return (
    <>
      <div className="shadow-md shadow-red-50 drop-shadow-sm font-lato py-5 relative z-20">
        <Container>
          <div className="h-20 flex justify-between items-center">
            <div>
              <Link to={"/"}>
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/Hotels.com_Logo.png/150px-Hotels.com_Logo.png"
                  alt="logo"
                  loading="lazy"
                  className={`${
                    isVerySmallScreen ? "w-[90px]" : "w-[100px]"
                  } md:w-full h-full object-contain`}
                />
              </Link>
            </div>
            <div className="flex gap-3 h-full items-center">
              {!isVerySmallScreen && (
                <Link
                  to="/service"
                  className="text-red-500 text-xs font-medium md:font-normal md:text-md font-lato"
                >
                  Own a Service?
                </Link>
              )}

              <div
                className="text-white flex items-center gap-1 bg-red-500 h-2/3 px-7 rounded-full shadow-lg shadow-red-100 relative"
                onClick={() => setToggleMenu(!toggleMenu)}
              >
                <MenuOutlined
                  className={`{${
                    isVerySmallScreen ? "text-[17px]" : "text-[20px]"
                  }}`}
                />
                <UserOutlined
                  className={`{${
                    isVerySmallScreen ? "text-[17px]" : "text-[20px]"
                  }}`}
                />
                {/* Menu */}

                {toggleMenu && (
                  <div className="absolute top-20 right-0 shadow-md shadow-red-50 z-50 bg-white">
                    <div key="items" mode="vertical" className="w-[200px]">
                      {user?._id && token ? (
                        <div
                          className="text-gray-800 rounded-lg cursor-pointer p-3 hover:bg-red-50"
                          onClick={() => logout.refetch()}
                        >
                          Log out
                        </div>
                      ) : (
                        authItems.map((item) => (
                          <MenuItem
                            key={item.route}
                            route={item.route}
                            label={item.label}
                            handleOpenAuthModal={handleOpenAuthModal}
                            setLabel={setLabel}
                          />
                        ))
                      )}
                      {isVerySmallScreen && (
                        <MenuItem
                          label="Own a Service"
                          key={"sellers"}
                          route="sellers"
                        />
                      )}
                      <div className="w-full h-0 py-3 shadow-sm shadow-red-50 border-red-100" />
                      <MenuItem key={"hello"} label="Hello" route="hello" />
                      <MenuItem
                        label="Contact"
                        key={"contact"}
                        route="contact"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {!isVerySmallScreen && <Search />}
        </Container>
      </div>
      {/* Modal codes comes here */}
      <AuthModal label={label} open={openAuthModal} />
    </>
  );
}
