import Cookies from "js-cookie";
import axiosInstance from "../network/apis";

export function getToken() {
  return Cookies.get("token");
}

export function getUserId() {
  return JSON.parse(Cookies.get("user")).user_id;
}

export function getUserRole() {
  return JSON.parse(Cookies.get("user")).roles;
}

export function isAuthenticatedUser() {
  const roles = Cookies.get("user") && JSON.parse(Cookies.get("user")).roles;
  console.log("roles: ", roles == "user");

  if (roles == "USER") {
    return true;
  }
  return false;
}

export function isAuthenticatedAdmin() {
  const roles = Cookies.get("admin") && JSON.parse(Cookies.get("admin")).roles;

  console.log("roles: ", roles == "admin");
  if (roles == "ADMIN") {
    return true;
  }
  return false;
}

export async function isProfileNull() {
  const userId = getUserId();
  const user = await axiosInstance
    .get(`/user/${userId}`, { data: "" })
    .then((res) => res.data.data)
    .catch((err) => {
      console.log(err);
    });

  const isNullish = Object.values.some((value) => {
    if (value === null || value === undefined || value === "") {
      return true;
    } else {
      return false;
    }
  });
  return isNullish;
}
