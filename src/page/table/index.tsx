import React from "react";
import type { TableColumnsType } from "antd";
import { Image, Table } from "antd";
import useGetData from "../hooks/usegetdata";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface DataType {
  key: string;
  title: string;
  price: number;
  image: any;
  rating: string;
  catygory: string;
  services: any;
}

const TableComponent: React.FC = () => {
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
      title: "Catygory",
      dataIndex: "catygory",
      key: "catygory",
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

  const { data } = useGetData("products", false);

  const malumot: DataType[] = data.map((item) => ({
    key: item.id,
    title: item.title,
    price: item.price,
    rating: item.rating,
    catygory: item.catygory,
    image: <Image src={item.image} alt={item.title} width={100} />,
    services: (
      <div className="flex items-center gap-5">
        <span style={{ zoom: "2" }} className="cursor-pointer">
          <EditOutlined className="text-[#edcb34]" />
        </span>
        <span style={{ zoom: "2" }} className="cursor-pointer">
          <DeleteOutlined style={{ color: "red" }} />
        </span>
      </div>
    ),
  }));

  return (
    <Table
      className="w-[1000px] mx-auto"
      columns={columns}
      dataSource={malumot}
      style={{ borderRadius: "12px" }}
    />
  );
};

export default TableComponent;
