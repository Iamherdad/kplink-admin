import request from "../index";

const addTag = async (name: String) => {
  return request.post("/tag", { name });
};

const getTagList = async () => {
  return request.get("/tag");
};

export { addTag, getTagList };
