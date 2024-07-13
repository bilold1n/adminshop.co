import React, { useState, useEffect } from "react";
import type { TableColumnsType } from "antd";
import {
  Button,
  Form,
  Image,
  Input,
  message,
  Modal,
  Select,
  Table,
  Checkbox,
  Col,
  Row,
} from "antd";
import useGetData from "../hooks/usegetdata";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { db, DeleteDocitem, storege } from "../../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { getproduct } from "../store/product";
import UploadImage from "../product/uploadimage";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
// import type { CheckboxValueType } from "antd/es/checkbox/Group";

interface DataType {
  key: string;
  title: string;
  price: number;
  image: any;
  rating: string;
  category: string;
  services: any;
  color: string;
  count: string;
}

interface TableComponentProps {
  setfresh: React.Dispatch<React.SetStateAction<boolean>>;
  fresh: boolean;
}

const TableComponent: React.FC<TableComponentProps> = ({ setfresh, fresh }) => {
  const dispatch = useDispatch();
  const [malumot, setMalumot] = useState<DataType[]>([]);
  const [modal2Open, setModal2Open] = useState<boolean>(false);
  const [editProductId, setEditProductId] = useState<string | null>(null);

  const handleDelete = async (id: any) => {
    const status = await DeleteDocitem("products", id);
    console.log(status);
    setfresh((prev) => !prev);
  };

  const columns: TableColumnsType<DataType> = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Rating",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
    },
    {
      title: "Services",
      dataIndex: "services",
      key: "services",
    },
  ];

  const { data } = useGetData("products", fresh);

  useEffect(() => {
    dispatch(getproduct(data));
  }, [data, dispatch]);

  const state = useSelector((state: any) => state.product);
  const basy: any = state.filtereddata;
  console.log(basy);

  useEffect(() => {
    const updatedMalumot: DataType[] = basy.map((item: any) => ({
      key: item.id,
      title: item.title,
      price: item.price,
      color: (
        <Button
          style={{
            height: "20px",
            backgroundColor: item.color,
            paddingInline: "10px",
            borderRadius: "50%",
          }}
        ></Button>
      ),
      rating: item.rating,
      category: item.category,
      image: (
        <div className="flex gap-2">
          {item.image.map((image: any) => (
            <Image src={image} alt={image} width={80} />
          ))}
        </div>
      ),
      services: (
        <div className="flex items-center gap-5">
          <Button className="w-8 h-8">
            <span
              onClick={() => onedit(item.id)}
              style={{ zoom: "1.5" }}
              className="cursor-pointer"
            >
              <EditOutlined className="text-[#edcb34]" />
            </span>
          </Button>
          <Button className="w-8 h-8">
            <span
              onClick={() => {
                const isConfirmed = window.confirm(
                  "Haqiqatdan ham productni o'chirishni xohlaysizmi?"
                );
                if (isConfirmed) {
                  handleDelete(item.id);
                } else {
                  alert("o'chirish bekor qilindi");
                }
              }}
              style={{ zoom: "1.5" }}
              className="cursor-pointer"
            >
              <DeleteOutlined style={{ color: "red" }} />
            </span>
          </Button>
        </div>
      ),
    }));
    setMalumot(updatedMalumot);
  }, [basy]);

  const [productdata, setProductData] = useState({
    title: "",
    description: "",
    image: [] as string[],
    price: "",
    rating: "",
    category: "",
    color: "",
    size: [] as any[],
    count: "",
  });

  const onChangeSize = (checkedValues: any[]) => {
    setProductData({ ...productdata, size: checkedValues });
  };

  const onedit = (id: any) => {
    const product = basy.find((item: any) => item.id === id);
    if (product) {
      setProductData({
        title: product.title,
        description: product.description,
        image: product.image,
        price: product.price,
        rating: product.rating,
        category: product.category,
        color: product.color,
        size: product.size,
        count: product.count,
      });
      setEditProductId(id);
      setModal2Open(true);
    }
  };

  const onFinish = async () => {
    if (
      productdata.title !== "" &&
      productdata.description !== "" &&
      productdata.price !== "" &&
      productdata.rating !== "" &&
      productdata.category !== "" &&
      productdata.count !== "" &&
      productdata.color !== ""
    ) {
      try {
        const imageUrls = await Promise.all(
          file.length > 0
            ? file.map(async (element) => {
                const storageRef = ref(storege, "products/" + element.name);
                const snap = await uploadBytes(storageRef, element);
                console.log(snap);

                const url = await getDownloadURL(
                  ref(storege, "products/" + element.name)
                );
                return url;
              })
            : productdata.image.map(async (element) => {
                const url = element;
                return url;
              })
        );

        const updatedProductData = {
          ...productdata,
          image: imageUrls,
        };
        console.log(updatedProductData);
        if (updatedProductData && editProductId) {
          await setDoc(doc(db, "products", editProductId), updatedProductData);
        }
        setModal2Open(false);
        setProductData({
          title: "",
          description: "",
          image: [],
          price: "",
          rating: "",
          category: "",
          color: "",
          size: [],
          count: "",
        });
        setFile([]);
        setEditProductId(null);
        message.success("Product updated successfully!");
        setfresh((prev) => !prev);
      } catch (error) {
        console.error("Upload failed:", error);
        message.error("Failed to upload image or update product.");
      }
    } else {
      message.error("Please fill in all fields");
    }
  };

  const [file, setFile] = useState<any[]>([]);

  return (
    <>
      <Table
        className="max-w-[1100px] mx-auto max-h-[500px] overflow-y-scroll bg-[#fff]"
        columns={columns}
        dataSource={malumot}
        style={{ borderRadius: "12px" }}
      />
      <Modal
        title={
          <p className="text-2xl font-bold text-center mb-[20px]">
            Change the product
          </p>
        }
        centered
        width={450}
        open={modal2Open}
        onOk={onFinish}
        onCancel={() => setModal2Open(false)}
        key="edit-product-modal"
      >
        <Form
          onFinish={onFinish}
          className="container flex flex-col items-center gap-2 justify-center"
          key="edit-product-form"
        >
          <div className="flex flex-col gap-1 w-full">
            <p>Product Title</p>
            <Input
              required
              placeholder="Title"
              key="title-input"
              value={productdata.title}
              onChange={(e) =>
                setProductData({ ...productdata, title: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <p>Product Price</p>
            <Input
              value={productdata.price}
              onChange={(e) =>
                setProductData({ ...productdata, price: e.target.value })
              }
              required
              type="number"
              placeholder="Price"
              key="price-input"
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <p>Product Color</p>
            <Input
              type="color"
              required
              className="cursor-pointer"
              key="color-input"
              value={productdata.color}
              onChange={(e) =>
                setProductData({ ...productdata, color: e.target.value })
              }
            />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <p>Product Category</p>
            <Select
              placeholder="Category"
              className="w-full"
              key="filter-category-select"
              value={productdata.category}
              onChange={(value) =>
                setProductData({ ...productdata, category: value })
              }
            >
              <Select.Option value="men" key="men-category">
                Men
              </Select.Option>
              <Select.Option value="women" key="women-category">
                Women
              </Select.Option>
            </Select>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <p>Product Description</p>
            <Input.TextArea
              required
              placeholder="Description"
              key="description-input"
              value={productdata.description}
              onChange={(e) =>
                setProductData({
                  ...productdata,
                  description: e.target.value,
                })
              }
            />
          </div>
          <div className="flex gap-2 w-full text-center items-center">
            <div className="w-2/5 flex flex-col gap-1">
              <p>Product Rating</p>
              <Select
                className="min-w-22"
                value={productdata.rating}
                onChange={(value) =>
                  setProductData({
                    ...productdata,
                    rating: value,
                  })
                }
                showSearch
                placeholder="Select rating"
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  { value: "1", label: "1" },
                  { value: "1.5", label: "1.5" },
                  { value: "2", label: "2" },
                  { value: "2.5", label: "2.5" },
                  { value: "3", label: "3" },
                  { value: "3.5", label: "3.5" },
                  { value: "4", label: "4" },
                  { value: "4.5", label: "4.5" },
                  { value: "5", label: "5" },
                ]}
              />
            </div>
            <div className="w-full flex flex-col gap-1">
              <p className="text-start">Product Count</p>
              <Input
                value={productdata.count}
                type="number"
                onChange={(e) =>
                  setProductData({
                    ...productdata,
                    count: e.target.value,
                  })
                }
                placeholder="Product Count"
              />
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full text-center items-center">
            <p className="text-start">Change Size</p>
            <Checkbox.Group
              style={{ width: "100%" }}
              onChange={onChangeSize}
              value={productdata.size}
            >
              <Row>
                <Col span={6}>
                  <Checkbox value="small">Small</Checkbox>
                </Col>
                <Col span={6}>
                  <Checkbox value="medium">Medium</Checkbox>
                </Col>
                <Col span={6}>
                  <Checkbox value="large">Large</Checkbox>
                </Col>
                <Col span={6}>
                  <Checkbox value="XXlarge">XXLarge</Checkbox>
                </Col>
              </Row>
            </Checkbox.Group>
          </div>
          <UploadImage setFile={setFile} key="upload-image" />
        </Form>
      </Modal>
    </>
  );
};

export default TableComponent;
