import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Modal, message } from "antd";
import UploadImage from "./uploadimage";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storege } from "../../../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import TableComponent from "../table";
import { filterdata, searchData } from "../store/product.ts";
import { useDispatch } from "react-redux";
import { Checkbox, Col, Row } from "antd";
import type { GetProp } from "antd";

const Product: React.FC = () => {
  const [search, setsearch] = useState("");
  const [fresh, setfresh] = useState(false);
  const [productdata, setproductdata] = useState({
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

  const onChange1: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues
  ) => {
    console.log("checked = ", checkedValues);
    setproductdata({ ...productdata, size: checkedValues });
  };
  const [file, setFile] = useState<any[]>([]);
  const [modal2Open, setModal2Open] = useState<any>(false);
  useEffect(() => {
    dispatch(searchData(search));
  }, [search]);

  const onFinish = async () => {
    if (
      productdata.title !== "" &&
      productdata.description !== "" &&
      productdata.price !== "" &&
      productdata.rating !== "" &&
      productdata.category !== "" &&
      productdata.count !== "" &&
      // productdata.size !== any[] &&
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

          await addDoc(collection(db, "products"), updatedProductData);

          setModal2Open(false);
          setproductdata({
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
          message.success("Product added successfully!");
          console.log(updatedProductData);

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
  const onChange = (value: string) => {
    dispatch(filterdata(value));
  };
  const dispatch = useDispatch();
  return (
    <section>
      <div className="container">
        <div className="text-white border-b-4 pb-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold">Product</h1>
          <div>
            <Form className="flex items-center gap-5">
              <Input
                className="w-[230px]"
                placeholder="Search"
                key="search-input"
                onChange={(e) => setsearch(e.target.value)}
              />
              <Select
                onChange={onChange}
                placeholder="Sort by"
                className="w-[110px]"
                key="sort-by"
              >
                <Select.Option value="rating" key="sort-rating">
                  Rating ⭐
                </Select.Option>
                <Select.Option value="price" key="sort-price">
                  Price💲
                </Select.Option>
                <Select.Option value="text" key="sort-text">
                  A-z 📝
                </Select.Option>
                <Select.Option value="!text" key="sort-reverse-text">
                  Z-a 📝
                </Select.Option>
              </Select>
              <Button
                type="primary"
                onClick={() => setModal2Open(true)}
                key="add-product-button"
              >
                Add Product
              </Button>
            </Form>
          </div>
          <Modal
            title={
              <p className="text-2xl font-bold text-center mb-[20px]">
                Add Product
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
              className="container flex flex-col items-center gap-2 justify-center"
              key="add-product-form"
            >
              <div className="flex flex-col gap-1 w-full">
                <p>Product Title</p>
                <Input
                  required
                  placeholder="Title"
                  key="title-input"
                  value={productdata.title}
                  onChange={(e) =>
                    setproductdata({ ...productdata, title: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-1 w-full">
                <p>Product Price</p>
                <Input
                  value={productdata.price}
                  onChange={(e) =>
                    setproductdata({ ...productdata, price: e.target.value })
                  }
                  required
                  type="number"
                  minLength={4}
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
                    setproductdata({ ...productdata, color: e.target.value })
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
                    setproductdata({ ...productdata, category: value })
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
                    setproductdata({
                      ...productdata,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="flex  gap-2 w-full text-center items-center">
                <div className="w-2/5 flex flex-col gap-1">
                  <p>Product Rating</p>
                  <Select
                    className="min-w-22"
                    value={productdata.rating}
                    onChange={(e: any) =>
                      setproductdata({
                        ...productdata,
                        rating: e,
                      })
                    }
                    showSearch
                    placeholder="Select a person"
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
                    onChange={(e: any) =>
                      setproductdata({
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

                <Checkbox.Group style={{ width: "100%" }} onChange={onChange1}>
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

              <UploadImage setvalue={[]} setFile={setFile} key="upload-image" />
            </Form>
          </Modal>
        </div>
      </div>
      <div className="container mt-8">
        <TableComponent setfresh={setfresh} fresh={fresh} />
      </div>
    </section>
  );
};

export default Product;
