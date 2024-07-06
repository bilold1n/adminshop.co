import { HomeOutlined } from "@ant-design/icons";
import { useLocation } from "react-router-dom";

export default function Header() {
  const { pathname } = useLocation();
  return (
    <header className="bg-[#060B26] p-4">
      <span className="mr-2 text-[#a19e9e]">Pages:</span>
      <span className="text-white">
        <HomeOutlined color="white" />{" "}
        <span>{pathname == "/" ? "/dashboard" : pathname}</span>
      </span>
      <h2 className="my-2 text-white capitalize">
        {pathname == "/" ? "Dashboard" : pathname.slice(1)}
      </h2>
    </header>
  );
}
