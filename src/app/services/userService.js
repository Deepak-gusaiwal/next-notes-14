import { axiosCreator } from "@/axiosCreator/axiosCreator";

export const createUser = async (userDetails) => {
  const { data } = await axiosCreator.post("/api/users", userDetails);
  return data;
};
export const loginUser = async (userDetail) => {
  const { data } = await axiosCreator.post("/api/users/login", userDetail);
  return data;
};
export const currentUser = async () => {
  const { data } = await axiosCreator.get("/api/users/current");
  return data;
};
export const logoutUser =async()=>{
  const { data } = await axiosCreator.post("/api/logout");
  return data;
}