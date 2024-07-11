import React, { useState, useEffect } from "react";
import type { TableColumnsType } from "antd";
import { Image, Table } from "antd";
import useGetData from "../hooks/usegetdata";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { DeleteDocitem } from "../../../firebase/config";
import { useDispatch, useSelector } from "react-redux";
import { getproduct } from "../store/product";

interface DataType {
  key: string;
  title: string;
  price: number;
  image: any;
  rating: string;
  catygory: string;
  services: any;
}

const TableComponent: React.FC = ({ setfresh1 }: any) => {
  console.log(setfresh1);
  const dispatch = useDispatch();
  const [fresh, setfresh] = useState(false);
  const [malumot, setMalumot] = useState<DataType[]>([]);

  const hendledelete = async (id: any) => {
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
      title: "Pricee",
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
      catygory: item.category,
      image: <Image src={item.image} alt={item.image} width={100} />,
      services: (
        <div className="flex items-center gap-5">
          <span style={{ zoom: "2" }} className="cursor-pointer">
            <EditOutlined className="text-[#edcb34]" />
          </span>
          <span
            onClick={() => {
              const isConfirmed = window.confirm(
                "Haqiqatdan ham productni o'chirishni xohlaysizmi?"
              );
              if (isConfirmed) {
                hendledelete(item.id);
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

  return (
    <Table
      className="max-w-[1100px] mx-auto max-h-[500px] overflow-y-scroll"
      columns={columns}
      dataSource={malumot}
      style={{ borderRadius: "12px" }}
    />
  );
};

export default TableComponent;
