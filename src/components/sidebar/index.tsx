import {
  ProductOutlined,
  AccountBookOutlined,
  AppstoreAddOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import type { MenuProps } from "antd";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    key: "ki",
    label: <h3 className="text-white text-center text-xl p-2">Shop.co</h3>,
    disabled: true,
  },
  {
    key: "dashboard",
    icon: <AccountBookOutlined />,
    label: <NavLink to={"/dashboard"}>Dashboard</NavLink>,
  },
  {
    key: "Addproduct",
    icon: <AppstoreAddOutlined />,
    label: <NavLink to={"/Addproduct"}>Add Product</NavLink>,
  },
  {
    key: "product",
    icon: <ProductOutlined />,
    label: <NavLink to={"/product"}>Products</NavLink>,
  },
];

export default function Sidebar() {
  const { pathname } = useLocation();
  return (
    <>
      <Menu
        style={{ width: 256, height: "100vh" }}
        selectedKeys={[pathname.slice(1)]}
        items={items}
        theme="dark"
        className="sidebar"
      />
    </>
  );
}
