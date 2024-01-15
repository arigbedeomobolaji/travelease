import axios from "../utils/axios";
export const logoutUser = (obj) => {
  const token = obj.queryKey[2];
  console.log(token);
  return axios.get("/users/logout", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
