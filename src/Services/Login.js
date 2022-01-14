import axios from "axios";

export const LoginApi = (request) => {
  const { email, password } = request;
  const url = "BASE_URL";
  return axios.get(url);
};
