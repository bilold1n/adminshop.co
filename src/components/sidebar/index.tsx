import { ProductOutlined, HomeOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import type { GetProp, MenuProps } from "antd";
import { NavLink } from "react-router-dom";

type MenuItem = GetProp<MenuProps, "items">[number];

const items: MenuItem[] = [
  {
    key: "ki",
    label: <h3 className="text-white text-center text-xl p-2">Shop.co</h3>,
    disabled: true,
  },
  {
    key: "1",
    icon: <HomeOutlined />,
    label: (
      <NavLink style={{ marginTop: "-10px" }} to={"/dashboard"}>
        Dashboard
      </NavLink>
    ),
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
        items={items}
        theme="dark"
        className="sidebar "
      />
    </>
  );
}
