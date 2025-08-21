import { useState } from "react";
import { Outlet } from "react-router-dom";
import { useViewportGuard } from "@/Hooks/useViewportGuard";
import ViewportBlocker from "./ViewportBlocker";
import SideBar from "@/Components/SideBar/SideBar";

export default function Layout() {
  const isBlocked = useViewportGuard();
  const [open, setOpen] = useState(false);
  const environment = import.meta.env.VITE_ENV;

  return (
    <div className="min-h-screen h-full flex flex-col">
      <SideBar open={open} setOpen={setOpen} />

      <div className="flex flex-col w-full min-h-screen pl-16 transition-all duration-300 bg-layout relative">
        {environment === "development" && (
          <div className="fixed top-0 left-1/2 z-50 transform -translate-x-1/2">
            <div className="p-1 2xl:p-2 text-white font-bold text-xl bg-red-600 hover:bg-red-700 border-b-2 border-x-2 border-red-800 shadow-2xl rounded-b-md cursor-default transition">Desarrollo</div>
          </div>
        )}

        {isBlocked && <ViewportBlocker />}

        <div className="relative z-10">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
