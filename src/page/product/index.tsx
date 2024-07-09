import { Button, Form, Input, Select, Modal } from "antd";
import usegetdata from "../hooks/usegetdata";
import { useState } from "react";
import Table from "../table";
export default function Product() {
  const { data, isPending, error } = usegetdata("products", false);
  console.log(data, isPending, error);
  const [modal2Open, setModal2Open] = useState(false);
  return (
    <section>
      <div className="container">
        <div className=" text-white border-b-4 pb-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Product</h1>
          <div>
            <Form className="flex items-center gap-5">
              <Input className="w-[230px]" placeholder="Search" />
              <Select placeholder="Filter by category" className="w-[180px]">
                <Select.Option value="all">All</Select.Option>
              </Select>
              <Select placeholder="Sort by" className="w-[110px]">
                <Select.Option value="rating">Rating ⭐</Select.Option>
                <Select.Option value="price">Price💲</Select.Option>
                <Select.Option value="text">A-z 📝</Select.Option>
                <Select.Option value="!text">Z-a 📝</Select.Option>
              </Select>
              <Button type="primary" onClick={() => setModal2Open(true)}>
                Add Product
              </Button>
            </Form>
          </div>
          <Modal
            title="Vertically centered modal dialog"
            centered
            open={modal2Open}
            onOk={() => setModal2Open(false)}
            onCancel={() => setModal2Open(false)}
          >
            <Form className="flex items-center gap-5">
              <Input className="w-[230px]" placeholder="Search" />
              <Input className="w-[230px]" placeholder="Search" />
              <Input className="w-[230px]" placeholder="Search" />
            </Form>
          </Modal>
        </div>
      </div>
      <div className="container mt-9">
        <Table />
      </div>
    </section>
  );
}
