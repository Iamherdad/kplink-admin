import request from "../index";

const getAppList = async () => {
  return request.get("/app");
};

export { getAppList };
