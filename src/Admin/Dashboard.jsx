import { Routes, Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import Products from "./Products";
import Category from "./Category";
import Orders from "./Orders";
import BottomBar from "./BottomBar";


export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="flex-1 p-6 overflow-auto">
         <Routes>
  <Route index element={<Category />} />
  <Route path="products" element={<Products />} />
  <Route path="category" element={<Category />} />
    
  <Route path="orders" element={<Orders />} />
</Routes>

        </div>
        <BottomBar />
      </div>
    </div>
  );
}
