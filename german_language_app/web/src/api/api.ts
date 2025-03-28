import axios from "axios";
import config from "../config";

const API = axios.create({
    baseURL: config.API_BASE_URL
});

export default API;