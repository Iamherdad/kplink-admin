import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import {
  Button,
  Table,
  Modal,
  Steps,
  Form,
  Input,
  Select,
  Upload,
  Divider,
  Space,
  message,
  Tag,
  Tree,
} from "antd";
import type {
  TableColumnsType,
  FormProps,
  UploadProps,
  GetProps,
  TreeDataNode,
} from "antd";
import { HiDownload } from "react-icons/hi";
import { addTag, getTagList } from "@/service/api/tag";
import { getStoreList, addStore } from "@/service/api/store";

type DirectoryTreeProps = GetProps<typeof Tree.DirectoryTree>;

const { DirectoryTree } = Tree;

interface DataType {
  key: React.ReactNode;
  name: string;
  version: string;
  desc: string;
  operation?: React.ReactNode;
  children?: DataType[];
}

type FieldType = {
  name?: string;
  version?: string;
  desc?: string;
  file?: string;
};

const columns: TableColumnsType<DataType> = [
  {
    title: "名称",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "版本",
    dataIndex: "version",
    key: "version",
    width: "12%",
  },
  {
    title: "描述",
    dataIndex: "desc",
    width: "30%",
    key: "desc",
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
  },
];

// const data: DataType[] = [
//   {
//     key: 1,
//     name: "AI小鲲图像化编程",
//     version: "1.0.0",
//     desc: "初次发版",
//     children: [
//       {
//         key: 11,
//         name: "AI小鲲图像化编程",
//         version: "1.0.0",
//         desc: "初次发版",
//         operation: (
//           <Button
//             shape="circle"
//             icon={<HiDownload />}
//             type="primary"
//             size="small"
//           ></Button>
//         ),
//       },
//       {
//         key: 12,
//         name: "AI小鲲图像化编程",
//         version: "1.0.0",
//         desc: "初次发版",
//       },
//     ],
//   },
//   {
//     key: 13,
//     name: "模拟器",
//     version: "1.0.0",
//     desc: "London No. 1 Lake Park",
//     children: [
//       {
//         key: 131,
//         name: "Jim Green",
//         version: "1.0",
//         desc: "London No. 2 Lake Park",
//         children: [
//           {
//             key: 1311,
//             name: "Jim Green jr.",
//             version: "1.0.1",
//             desc: "London No. 3 Lake Park",
//           },
//           {
//             key: 1312,
//             name: "Jimmy Green sr.",
//             version: "1",
//             desc: "London No. 4 Lake Park",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     key: 2,
//     name: "Joe Black",
//     version: "111",
//     desc: "Sydney No. 1 Lake Park",
//   },
// ];

const Com: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectList, setSelectList] = useState<any[]>([]);
  const [selectLoading, setSelectLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [selectInputValue, setSelectInputValue] = useState("");
  const [fileList, setFileList] = useState<any[]>([]);
  const [storeList, setStoreList] = useState([]);
  const [form] = Form.useForm();
  const selectInputRef = useRef<any>(null);
  const [treeData, setTreeData] = useState([]);
  const [startPath, setStartPath] = useState("");
  const [tagId, setTagId] = useState("");

  useEffect(() => {
    getStores();
  }, []);

  const getStores = async () => {
    const res = await getStoreList();
    const data = res.data.map((item: any) => {
      return {
        key: item.t_id,
        name: item.t_name,
        version: "-",
        desc: "-",
        children: item.apps.map((app: any) => {
          return {
            key: app.id,
            name: item.t_name,
            version: <Tag color="blue">{app.version}</Tag>,
            desc: <p className=" h-10 line-clamp-2 ">{app.description}</p>,
            operation: (
              <Button
                shape="circle"
                icon={<HiDownload />}
                type="primary"
                size="small"
              ></Button>
            ),
          };
        }),
      };
    });
    setStoreList(data);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const next = async () => {
    if (current === 0) {
      form
        .validateFields()
        .then((values) => {
          console.log("values", values.file[0]);
          const tree = values.file[0].response.data.file_tree;

          setTreeData(tree);
          setCurrent(current + 1);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const formData = form.getFieldsValue(true);

      const { desc, version, file } = formData;
      const file_id = file[0].response.data.file_id;

      const data = {
        file_id: file_id,
        description: desc,
        tag_id: tagId,
        version: version,
        start_path: startPath,
      };

      try {
        const res: any = await addStore(data);
        if (res.code === 1000) {
          message.success("添加成功");
          setIsModalOpen(false);
          getStores();
          form.resetFields();
          setFileList([]);
          setCurrent(0);
          setStartPath("");
          setTagId("");
        } else {
          message.error(res.message);
        }
      } catch (err) {
        console.log(err);
      }
    }
  };

  const prev = () => {
    setCurrent(current - 1);
    setStartPath("");
  };

  const addSelectItem = async (e: any) => {
    e.preventDefault();
    if (!selectInputValue) {
      message.error("请输入分类名称");
      return;
    }

    const res: any = await addTag(selectInputValue);
    if (res.code === 1000) {
      message.success("添加成功");

      setTimeout(() => {
        selectInputRef.current?.focus && selectInputRef.current.focus();
      }, 0);

      await getSlectList();
    } else {
      message.error(res.message);
    }
  };

  const getSlectList = async () => {
    const res: any = await getTagList();
    if (res.code === 1000) {
      const data = res.data.map((ite: any) => {
        return { value: ite.name, label: ite.name, key: ite.id };
      });

      setSelectList(data);
    } else {
      message.error(res.msg);
      throw new Error(res.msg);
    }
  };

  const onDropdownVisibleChange = async (e: any) => {
    if (e) {
      setSelectLoading(true);
      try {
        await getSlectList();
        setSelectLoading(false);
      } catch (error) {
        setSelectLoading(false);
      }
    } else {
      setSelectList([]);
    }
  };

  const normFile = (e: any) => {
    const { file, fileList } = e;

    if (Array.isArray(e)) {
      return e;
    }

    if (file.status === "done" && file.response.code == 1000) {
      // 此处处理整体返回数据
      return standardization(fileList);
    }
    if (file.status === "done" && file.response.code != 1000) {
      message.warning(file.response.message);
      setFileList([]);
      return [];
    }

    return e && fileList;
  };

  const standardization = (arr: any) => {
    let resArr: any = [];
    arr.forEach((item: any) => {
      if (item.response.code === "1000") {
        let obj = {
          uid: item.uid,
          name: item.name,
          status: "done",
          response: item.response, // custom error message to show
          url: "",
        };
        resArr.push(obj);
      } else {
        // 后面应该不处理 失败了 不应展示 所以可以直接去掉
        let obj = {
          uid: item.uid,
          name: item.name,
          status: "done",
          response: item.response, // custom error message to show
          url: item.thumbUrl || item.url,
        };
        resArr.push(obj);
      }
    });
    return resArr;
  };

  const onSelect: DirectoryTreeProps["onSelect"] = (keys: any) => {
    console.log("Trigger Select", keys);
    setStartPath(keys[0]);
  };

  const onExpand: DirectoryTreeProps["onExpand"] = (keys, info) => {};

  const steps = [
    {
      title: "填写基本信息",
      content: (
        <div>
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            autoComplete="off"
          >
            <Form.Item<FieldType>
              label="分类"
              name="name"
              rules={[{ required: true, message: "请选择要上传的应用!" }]}
            >
              <Select
                onDropdownVisibleChange={onDropdownVisibleChange}
                loading={selectLoading}
                options={selectList}
                onSelect={(value, info) => {
                  setTagId(info.key);
                }}
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider
                      style={{
                        margin: "8px 0",
                      }}
                    />
                    <Space
                      style={{
                        padding: "0 8px 4px",
                      }}
                    >
                      <Input
                        placeholder="创建新分类"
                        ref={selectInputRef}
                        value={selectInputValue}
                        onChange={(e) => {
                          setSelectInputValue(e.target.value);
                        }}
                      />
                      <Button
                        type="text"
                        icon={<IoMdAdd></IoMdAdd>}
                        onClick={addSelectItem}
                      >
                        创建
                      </Button>
                    </Space>
                  </>
                )}
              ></Select>
            </Form.Item>

            <Form.Item<FieldType>
              label="版本"
              name="version"
              rules={[
                { required: true, message: "请输入版本号!" },
                {
                  pattern: /^\d+\.\d+\.\d+$/,
                  message: "版本号格式应为 x.y.z，例如 1.0.0",
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item<FieldType>
              label="描述"
              name="desc"
              rules={[
                { required: true, message: "请输入描述!" },
                { min: 1, message: "描述至少需要1个字符!" },
                { max: 255, message: "描述最多不能超过255个字符!" },
              ]}
            >
              <Input.TextArea />
            </Form.Item>
            <Form.Item<FieldType>
              label="应用"
              name="file"
              valuePropName="fileList"
              rules={[{ required: true, message: "请上传应用!" }]}
              getValueFromEvent={normFile}
            >
              <Upload
                action={"http://127.0.0.1:8854/file/app"}
                accept=".zip"
                fileList={fileList}
                maxCount={1}
                onChange={({ file, fileList }) => {
                  return fileList;
                }}
              >
                <Button>上传</Button>
              </Upload>
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      title: "选择启动项",
      content: (
        <div className=" h-80 ">
          <DirectoryTree
            rootStyle={{ height: "100%", overflowY: "scroll" }}
            defaultExpandAll
            onSelect={onSelect}
            onExpand={onExpand}
            treeData={treeData}
          />
        </div>
      ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <div className="w-full h-full flex flex-col">
      <div className="h-16 border-b-2 border-blue-100  box-border flex  items-center">
        <IoMdAdd size={36} className=" cursor-pointer" onClick={showModal} />
      </div>
      <div className="flex-1  overscroll-y-auto ">
        <Table<DataType>
          columns={columns}
          dataSource={storeList}
          pagination={false}
        />
      </div>

      <>
        <Modal
          title="添加应用"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
        >
          <Steps current={current} items={items} />
          <div className="h-80 w-full mt-8 border-dashed border-[#dadada]">
            {steps[current].content}
          </div>
          <div className=" w-full  flex justify-end">
            <Button
              type="primary"
              className="m-2"
              onClick={prev}
              disabled={current == 0}
            >
              上一步
            </Button>

            <Button
              type="primary"
              className="m-2"
              onClick={next}
              disabled={current == steps.length - 1 && !startPath}
            >
              {current == steps.length - 1 ? "完成" : "下一步"}
            </Button>
          </div>
        </Modal>
      </>
    </div>
  );
};

export default Com;
