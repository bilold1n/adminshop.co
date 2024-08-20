import Sidebar from "../../components/sidebar";
import { Outlet } from "react-router-dom";
import Header from "../../components/header";
export default function Layout() {
  return (
    <div className="flex bg-[#060B26] owflow-hidden">
      <Sidebar />
      <div className="flex flex-col w-full">
        <Header />
        <main>
          <Outlet></Outlet>
        </main>
      </div>
    </div>
  );
}
