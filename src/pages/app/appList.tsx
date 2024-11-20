import React, { useState } from "react";
import {
  Pagination,
  Modal,
  Form,
  Input,
  Button,
  Select,
  Upload,
  message,
  Steps,
  theme,
} from "antd";
import type { FormProps } from "antd";
import { useLoaderData } from "react-router-dom";
import APP from "@/components/app/app";
import { IAppProps } from "@/types/app";
import { IoMdAdd } from "react-icons/io";
import { uploadAppFile } from "@/service/api/app";

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
        ></Modal>
      </>
    </div>
  );
};

export default Com;
