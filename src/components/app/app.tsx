import React, { FC } from "react";
import styles from "./app.module.css";
import { Col, Row, Tag } from "antd";

const Com: FC = (props: any) => {
  console.log("==>", props);
  const { name, version, icon, description } = props;
  return (
    <Row gutter={16} className={styles.container}>
      <Col span={6}>
        <img src={icon} alt="" className={styles.icon} />
      </Col>
      <Col span={16} className={styles.content}>
        <Row justify="start" className={styles.name}>
          <Col span={24}>{name}</Col>
        </Row>
        <Row justify="start" className={styles.version}>
          <Col span={24} className={styles.version}>
            版本: {version}
          </Col>
        </Row>
        <Row justify="start" className={styles.descriptionRow}>
          <Col span={24} className={styles.description}>
            {description}
          </Col>
        </Row>
        <Row gutter={8} className={styles.tools} justify="start">
          <Col span={12}>
            <Tag>删除</Tag>
          </Col>
          <Col span={12}>
            <Tag>参数</Tag>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Com;
