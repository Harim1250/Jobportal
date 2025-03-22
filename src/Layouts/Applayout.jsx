import Header from "../components/Header";
import { Outlet } from "react-router-dom";

const AppLayout = () => {
  return (
    <div>
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>
      <div className="p-10 text-center bg-cyan-500">
        Made with 💗 by Hariom Yadav
      </div>
    </div>
  );
};

export default AppLayout;
