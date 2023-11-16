import axios from "axios";


const API_URL = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_PATH + "api/v1/front/votes/",
 
});

export default API_URL