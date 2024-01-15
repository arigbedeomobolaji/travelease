import axios from "../utils/axios";

export const authMutation = (userData) => {
  const route = userData.route ? `/${userData.route}` : "";
  delete userData.route;
  return axios.post("/users" + route, userData);
};
