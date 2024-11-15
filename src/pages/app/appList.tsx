import React, { useState } from "react";
import { Pagination, Modal, Form, Input, Button, Select, Upload } from "antd";
import type { FormProps } from "antd";
import { useLoaderData } from "react-router-dom";
import APP from "@/components/app/app";
import { IAppProps } from "@/types/app";
import { IoMdAdd } from "react-icons/io";

type FieldType = {
  updateDesc: string;
  icon: string;
  desc: string;
  version: string;
  name: string;
  app: any;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

const Com: React.FC = () => {
  const data = useLoaderData() as [IAppProps];
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleFileUpload = (info: any) => {
    console.log("info", info);
  };
  return (
    <div className=" h-full flex flex-col">
      <div className="h-16 border-b-2 border-blue-100  box-border flex  items-center ">
        <IoMdAdd size={36} className=" cursor-pointer" onClick={showModal} />
      </div>
      <div className="flex-1">
        <div className="flex flex-wrap gap-10">
          {data.map((item: any) => {
            return (
              <div
                key={item.id}
                className="flex-grow flex-shrink basis-[calc(33.33%-20px)] min-w-[375px] h-[154px] m-[10px] rounded-[5px] p-[20px] box-border border border-[#f2f2f2]"
              >
                <APP {...item} />
              </div>
            );
          })}
        </div>
      </div>
      <div className="h-16 border-blue-300  border">
        <Pagination defaultCurrent={1} total={50} />
      </div>
      <>
        <Modal
          title="新增"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <Form
            name="basic"
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="名称"
              name="name"
              rules={[{ required: true, message: "请输入名称!" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item<FieldType>
              label="版本"
              name="version"
              rules={[{ required: true, message: "请输入应用版本!" }]}
            >
              <Input disabled placeholder="1.0.0" />
            </Form.Item>
            <Form.Item<FieldType>
              label="描述"
              name="desc"
              rules={[{ required: true, message: "请输入应用描述!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="图标"
              name="icon"
              rules={[{ required: true, message: "请上传图标!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="更新描述"
              name="updateDesc"
              rules={[{ required: true, message: "请上传更新描述!" }]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="应用资源"
              name="app"
              rules={[{ required: true, message: "请上传应用!" }]}
            >
              <Select
                dropdownRender={() => {
                  return (
                    <Upload accept=".zip" onChange={handleFileUpload}>
                      <Button>上传</Button>
                    </Upload>
                  );
                }}
              ></Select>
            </Form.Item>

            <Form.Item
              label={null}
              className="flex items-center justify-end mt-10 mb-0  "
            >
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </Form.Item>
          </Form>
        </Modal>
      </>
    </div>
  );
};

export default Com;
