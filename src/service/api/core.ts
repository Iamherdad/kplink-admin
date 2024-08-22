import request from "../index";

const getCoreList = async () => {
  return request.get("/core");
};

export { getCoreList };
