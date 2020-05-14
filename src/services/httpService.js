import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = 'http://localhost:4000/api';

axios.interceptors.response.use(null, error => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;
  if (!expectedError) {
    toast.error("An unexpected error occured");
    console.log(error);
  }
  return Promise.reject(error);
});


export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
