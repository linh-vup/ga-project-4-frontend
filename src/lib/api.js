import axios from 'axios';
import { AUTH } from './auth';

const ENDPOINTS = {
  login: `${process.env.REACT_APP_BASE_URL}/api/auth/login/`,
  register: `${process.env.REACT_APP_BASE_URL}/api/auth/register/`,
  getAllFoods: `${process.env.REACT_APP_BASE_URL}/api/foods/`,
  getAllColors: `${process.env.REACT_APP_BASE_URL}/api/colors/`,
  getSingleColor: (id) => `/api/colors/${id}/`,
  createUserDay: `${process.env.REACT_APP_BASE_URL}/api/userdays/`,
  getAllUserDays: `${process.env.REACT_APP_BASE_URL}/api/userdays/`,
  singleUserDay: (id) =>
    `${process.env.REACT_APP_BASE_URL}/api/userdays/${id}/`,
  search: (query) =>
    `${process.env.REACT_APP_BASE_URL}/api/foods/search/?search=${query}`,
  cloudinary: `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`
};

const getHeaders = () => ({
  headers: { Authorization: `Bearer ${AUTH.getToken()}` }
});

const GET = (endpoint, headers = null) => axios.get(endpoint, headers);
const POST = (endpoint, body, headers) =>
  headers ? axios.post(endpoint, body, headers) : axios.post(endpoint, body);
const PUT = (endpoint, body, headers) => axios.put(endpoint, body, headers);
const DELETE = (endpoint, headers) => axios.delete(endpoint, headers);

export const API = { GET, POST, PUT, DELETE, ENDPOINTS, getHeaders };
