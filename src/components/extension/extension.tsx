import React from "react";
import { useLoaderData } from "react-router-dom";

const Extension: React.FC = () => {
  const data = useLoaderData();
  console.log(data);
  return <div>extension</div>;
};

export default Extension;
