import axios from "../utils/customize-axios";
const Callregister = (fullName, email, password, phone) => {
  return axios.post("/api/v1/user/register", {
    fullName,
    email,
    password,
    phone,
  });
};
const CallLogin = (username, password) => {
  return axios.post("/api/v1/auth/login", { username, password });
};
const CallFetchAccount = () => {
  return axios.get("/api/v1/auth/account");
};

export { Callregister, CallLogin, CallFetchAccount };
