import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Sidebar from "../components/Sidebar";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <NavBar />
      
        <div className="flex flex-1 container mx-auto">
          <aside className="w-52 block border-r h-[calc(100vh-4rem)] sticky top-16">
            <Sidebar />
          </aside>
          <main className="flex-1 bg-white">
            <Outlet />
          </main>
        </div>
      </div>
    
  );
};

export default MainLayout;
