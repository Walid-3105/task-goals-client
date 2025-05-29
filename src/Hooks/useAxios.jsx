import axios from "axios";

const axiosPublic = axios.create({
  // baseURL: "https://task-management-server-rm2s.onrender.com"
  baseURL: "http://localhost:5000",
});

const useAxios = () => {
  return axiosPublic;
};

export default useAxios;
