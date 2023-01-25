import axios from 'axios';
import { AUTH } from './auth';

const ENDPOINTS = {
  login: '/api/auth/login/',
  register: '/api/auth/register/',
  getAllFoods: '/api/foods/',
  getAllColors: '/api/colors/',
  getSingleColor: (id) => `/api/colors/${id}/`,
  createUserDay: '/api/userdays/',
  getAllUserDays: '/api/userdays/',
  singleUserDay: (id) => `/api/userdays/${id}/`,
  search: (query) => `/api/foods/search/?search=${query}`,
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
