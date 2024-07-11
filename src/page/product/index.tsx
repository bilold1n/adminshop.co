import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, Modal, message } from "antd";
import UploadImage from "./uploadimage";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storege } from "../../../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import TableComponent from "../table";
import { filterdata, searchData } from "../store/product.ts";
import { useDispatch } from "react-redux";

const Product: React.FC = () => {
  const [search, setsearch] = useState("");
  // const [fresh, setfresh] = useState(false);
  const [productdata, setproductdata] = useState({
    title: "",
    description: "",
    image: [] as string[],
    price: "",
    rating: "",
    category: "",
    color: "",
  });

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
          });
          setFile([]);
          message.success("Product added successfully!");
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
              className="container flex flex-col items-center gap-5 justify-center"
              key="add-product-form"
            >
              <Input
                required
                placeholder="Title"
                key="title-input"
                value={productdata.title}
                onChange={(e) =>
                  setproductdata({ ...productdata, title: e.target.value })
                }
              />
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
              <Select
                placeholder="Filter by category"
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
              <Input
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
              <Input
                required
                placeholder="rating"
                key="rating-input"
                value={productdata.rating}
                onChange={(e) =>
                  setproductdata({
                    ...productdata,
                    rating: e.target.value,
                  })
                }
              />
              <UploadImage setFile={setFile} key="upload-image" />
            </Form>
          </Modal>
        </div>
      </div>
      <div className="container mt-8">
        <TableComponent />
      </div>
    </section>
  );
};

export default Product;
