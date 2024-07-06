import { ProductOutlined, HomeOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import type { GetProp, MenuProps } from "antd";
import { NavLink } from "react-router-dom";

type MenuItem = GetProp<MenuProps, "items">[number];

const items: MenuItem[] = [
  {
    key: "1",
    icon: <HomeOutlined />,
    label: <NavLink to={"/dashboard"}>Dashboard</NavLink>,
  },
  {
    key: "2",
    icon: <ProductOutlined />,
    label: <NavLink to={"/product"}>Product</NavLink>,
  },
];

export default function Sidebar() {
  return (
    <>
      <Menu
        style={{ width: 256, height: "100vh" }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        items={items}
        theme="dark"
        className="sidebar"
      />
    </>
  );
}
