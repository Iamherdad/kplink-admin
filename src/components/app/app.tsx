import React, { FC } from "react";
import styles from "./app.module.css";
import { Col, Row, Tag } from "antd";
import AppParameter from "../app-parameter/app-parameter";
import { IAppProps } from "@/types/app";
import dayjs from "dayjs";

const Com: FC<IAppProps> = (props: any) => {
  const { name, version, icon, description, create_at, update_at } = props;
  const [drawer, setDrawer] = React.useState(false);

  const drawerClose = () => {
    console.log("close");
    setDrawer(false);
  };
  const showDrawer = () => {
    setDrawer(true);
  };
  return (
    <Row gutter={16} className={styles.container}>
      <Col span={6} style={{ height: "100%" }}>
        <img src={icon} alt="" className={styles.icon} />
      </Col>
      <Col span={18} className={styles.content}>
        <Row justify="start" className={styles.name}>
          <Col span={24}>{name}</Col>
        </Row>
        <Row justify="start" className={styles.version}>
          <Col span={24} className={styles.version}>
            版本: {version}
          </Col>
        </Row>
        <Row justify="start" className={styles.descriptionRow}>
          <Col span={12}>
            创建时间: {dayjs(create_at).format("YYYY-MM-DD HH:mm:ss")}
          </Col>
          <Col span={12}>
            更新时间: {dayjs(update_at).format("YYYY-MM-DD HH:mm:ss")}
          </Col>
        </Row>
        <Row gutter={8} className={styles.tools} justify="start">
          <Col span={12}>
            <Tag>删除</Tag>
          </Col>
          <Col span={12}>
            <Tag onClick={showDrawer} style={{ cursor: "pointer" }}>
              参数
            </Tag>
            <AppParameter open={drawer} onClose={drawerClose} data={props} />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Com;
