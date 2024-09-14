import React, { FC, useState } from "react";
import {
  Col,
  Drawer,
  Form,
  Image,
  Input,
  Row,
  Select,
  Button,
  Upload,
} from "antd";
import { IAppParameterProps, IAppProps } from "@/types/app";
import TextArea from "antd/es/input/TextArea";
import { UploadOutlined } from "@ant-design/icons";
import styles from "./app-parameter.module.css";

const Com: FC<IAppParameterProps> = ({ open, onClose, data }) => {
  const [isDisabled, setIsDisabled] = useState(true);

  const DRAWER_WIDTH = window.innerWidth * 0.3;
  const handleEditClick = () => {
    if (isDisabled) {
      setIsDisabled(false);
    }
  };

  const handleSubmit = () => {
    if (!isDisabled) {
      setIsDisabled(true);
    }
  };

  const handleCloseWrapper = () => {
    setIsDisabled(true);
    onClose();
  };

  const {
    app_id,
    app_resource,
    create_at,
    description,
    icon,
    id,
    name,
    start_path,
    start_type,
    update_at,
    update_desc,
    version,
  } = data;

  return (
    <div className={styles.container}>
      <Drawer
        open={open}
        onClose={handleCloseWrapper}
        title="参数配置"
        extra={
          <div onClick={handleEditClick} className={styles.drawerExtra}>
            编辑
          </div>
        }
        footer={
          !isDisabled && (
            <div className={styles.drawerFooter}>
              <Button onClick={onClose}>取消</Button>
              <Button type="primary" onClick={handleSubmit}>
                确认
              </Button>
            </div>
          )
        }
        width={DRAWER_WIDTH}
      >
        <div className={styles.formContainer}>
          <Form disabled={isDisabled} labelCol={{ span: 6, offset: 0 }}>
            <Form.Item label="应用ID">
              <Input value={app_id} disabled />
            </Form.Item>
            <Form.Item label="版本号">
              <Input value={version} />
            </Form.Item>
            <Form.Item label="应用资源">
              <Select value={app_resource} defaultValue={app_resource} />
            </Form.Item>
            <Form.Item label="描述">
              <TextArea
                placeholder="请输入描述"
                defaultValue={description}
                rows={4}
              />
            </Form.Item>
            <Form.Item label="图标">
              <Image src={icon} className={styles.img} />
              <Upload
                beforeUpload={() => false} // 阻止自动上传
              >
                <UploadOutlined />{" "}
                <span style={{ cursor: "pointer" }}>点击上传</span>
              </Upload>
            </Form.Item>

            <Form.Item label="名称">
              <Input value={name} />
            </Form.Item>
            <Form.Item label="更新描述">
              <TextArea
                placeholder="请输入描述"
                defaultValue={update_desc}
                rows={4}
              />
            </Form.Item>
          </Form>
        </div>
      </Drawer>
    </div>
  );
};

export default Com;
