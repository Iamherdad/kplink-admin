import request from "../index";

const getStoreList = async () => {
  return request.get("/store");
};

const addStore = async (data: any) => {
  return request.post("/store", data);
};

export { getStoreList, addStore };
