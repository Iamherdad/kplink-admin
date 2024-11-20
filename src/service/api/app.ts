import request from "../index";

const getAppList = async () => {
  return request.get("/app");
};

const uploadAppFile = async (data: any) => {
  return request.post("/file/app", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export { getAppList, uploadAppFile };
