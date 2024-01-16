import axios from "../utils/axios";

export const authMutation = (userData) => {
  const route = userData.route ? `/${userData.route}` : "";
  delete userData.route;
  return axios.post("/users" + route, userData);
};

export const updateRegistrationMutation = (userData, context) => {
  console.log(userData, context);
  const { token } = userData;
  delete userData.token;
  return axios.post("/users/registration", userData, {
    headers: {
      Authorization: "Bearer " + token,
    },
  });
};
