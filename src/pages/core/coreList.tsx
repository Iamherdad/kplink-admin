import React from "react";
import { useLoaderData } from "react-router-dom";

const Com: React.FC = () => {
  const data = useLoaderData();
  console.log(data);
  return <div>core</div>;
};

export default Com;
