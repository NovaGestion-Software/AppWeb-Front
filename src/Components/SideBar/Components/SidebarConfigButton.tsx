import { Link } from "react-router-dom";
interface SidebarLogoutButtonProps {
  open: boolean;
}
import { setting } from "@/frontend-resourses/assets/icons";
export default function SidebarConfigButton({ open }: SidebarLogoutButtonProps) {
  return (
    <Link
      to="/configuracion"
      className="flex justify-start 
      items-start gap-1  w-full
     duration-100 hover:translate-x-1 transition-all hover:scale-105"
    >
      <div className="cursor-pointer w-8">
        <img src={setting} alt="Configuración" className="w-6 h-6" />
      </div>
      <span className={` text-white transition-opacity duration-500 ${open ? "opacity-100 " : " opacity-0 invisible"}`}>Configuración</span>
    </Link>
  );
}
