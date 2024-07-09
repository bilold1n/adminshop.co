import React from "react";
import type { TableColumnsType } from "antd";
import { Image, Table } from "antd";
import useGetData from "../hooks/usegetdata";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";

interface DataType {
  key: string;
  title: string;
  price: number;
  image: string;
  rating: string;
  catygory: string;
  services: string;
}

const TableComponent: React.FC = () => {
  const columns: TableColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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
      dataIndex: "Image",
      key: "Image",
    },
    {
      title: "Services",
      dataIndex: "services",
      key: "services",
    },
  ];

  const { data } = useGetData("products", false);
  const data1: DataType[] = data.map((item) => ({
    key: item.id,
    name: item.title,
    price: item.price,
    rating: item.rating,
    catygory: item.catygory,
    Image: <Image src={item.image} alt={item.image} width={100} />,
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
      dataSource={data1}
      style={{ borderRadius: "12px" }}
    />
  );
};

export default TableComponent;
