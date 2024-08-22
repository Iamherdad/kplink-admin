import React from "react";
import { Pagination } from "antd";
import { useLoaderData } from "react-router-dom";
import APP from "@/components/app/app";
import styles from "./app.module.css";

const Com: React.FC = () => {
  const data = useLoaderData() as [];

  return (
    <div className={styles.container}>
      <div className={styles.header}>add</div>
      <div className={styles.content}>
        <div className={styles.app}>
          {data.map((item: any) => {
            return (
              <div key={item.id} className={styles.appContainer}>
                <APP {...item} />
              </div>
            );
          })}
        </div>
      </div>
      <div className={styles.pagintain}>
        <Pagination defaultCurrent={1} total={50} />
      </div>
    </div>
  );
};

export default Com;
