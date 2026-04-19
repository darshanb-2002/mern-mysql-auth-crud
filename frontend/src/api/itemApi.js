import api from "./axios";

// GET ALL ITEMS
export const getItems = () => {
  return api.get("/api/items");
};

// ADD ITEM
export const addItem = (data) => {
  return api.post("/api/items", data);
};

// DELETE ITEM
export const deleteItem = (id) => {
  return api.delete(`/api/items/${id}`);
};

// UPDATE ITEM
export const updateItem = (id, data) => {
  return api.put(`/api/items/${id}`, data);
};

// GET STATS
export const getStats = () => {
  return api.get("/api/items/stats");
};