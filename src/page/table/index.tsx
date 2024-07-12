import React, { useState, useEffect } from "react";
import type { TableColumnsType } from "antd";
import { Form, Image, Input, message, Modal, Select, Table } from "antd";
import useGetData from "../hooks/usegetdata";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { DeleteDocitem, storege } from "../../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { getproduct } from "../store/product";
import UploadImage from "../product/uploadimage";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface DataType {
  key: string;
  title: string;
  price: number;
  image: any;
  rating: string;
  category: string;
  services: any;
}

interface TableComponentProps {
  setfresh: React.Dispatch<React.SetStateAction<boolean>>;
  fresh: boolean;
}

const TableComponent: React.FC<TableComponentProps> = ({ setfresh, fresh }) => {
  const dispatch = useDispatch();
  const [malumot, setMalumot] = useState<DataType[]>([]);
  const [modal2Open, setModal2Open] = useState<boolean>(false);

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
      rating: item.rating,
      category: item.category,
      image: <Image src={item.image} alt={item.image} width={100} />,
      services: (
        <div className="flex items-center gap-5">
          <span
            onClick={() => setModal2Open(true)}
            style={{ zoom: "2" }}
            className="cursor-pointer"
          >
            <EditOutlined className="text-[#edcb34]" />
          </span>
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
            style={{ zoom: "2" }}
            className="cursor-pointer"
          >
            <DeleteOutlined style={{ color: "red" }} />
          </span>
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
  });
  const onFinish = async () => {
    if (
      productdata.title !== "" &&
      productdata.description !== "" &&
      productdata.price !== "" &&
      productdata.rating !== "" &&
      productdata.category !== "" &&
      productdata.color !== ""
    ) {
      if (file.length > 0) {
        try {
          const imageUrls = await Promise.all(
            file.map(async (element) => {
              const storageRef = ref(storege, "products/" + element.name);
              const snap = await uploadBytes(storageRef, element);
              console.log(snap);

              const url = await getDownloadURL(
                ref(storege, "products/" + element.name)
              );
              return url;
            })
          );

          const updatedProductData = {
            ...productdata,
            image: imageUrls,
          };
          console.log(updatedProductData);

          // await addDoc(collection(db, "products"), updatedProductData);

          setModal2Open(false);
          setProductData({
            title: "",
            description: "",
            image: [],
            price: "",
            rating: "",
            category: "",
            color: "",
          });
          setFile([]);
          message.success("Product added successfully!");
          setfresh((prev) => !prev);
        } catch (error) {
          console.error("Upload failed:", error);
          message.error("Failed to upload image or add product.");
        }
      } else {
        message.error("Please upload an image");
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
        key="add-product-modal"
      >
        <Form
          onFinish={onFinish}
          className="container flex flex-col items-center gap-5 justify-center"
          key="add-product-form"
        >
          <Input
            required
            placeholder="Title"
            key="title-input"
            value={productdata.title}
            onChange={(e) =>
              setProductData({ ...productdata, title: e.target.value })
            }
          />
          <Input
            value={productdata.price}
            onChange={(e) =>
              setProductData({ ...productdata, price: e.target.value })
            }
            required
            type="number"
            minLength={4}
            placeholder="Price"
            key="price-input"
          />
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
          <Select
            placeholder="Filter by category"
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
          <Input
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
          <Input
            required
            placeholder="rating"
            key="rating-input"
            value={productdata.rating}
            onChange={(e) =>
              setProductData({
                ...productdata,
                rating: e.target.value,
              })
            }
          />
          <UploadImage setFile={setFile} key="upload-image" />
        </Form>
      </Modal>
    </>
  );
};

export default TableComponent;
