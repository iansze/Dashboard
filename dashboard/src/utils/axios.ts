import axios from "axios";

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const requests = {
  fetchUsers: `/users`,
  fetchProducts: `/products`,
  fetchOrders: `/orders`,
  postCalendarEvent: `/calendar/events`,
};
