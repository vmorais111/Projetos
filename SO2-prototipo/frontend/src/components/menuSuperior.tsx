import { Link } from "react-router-dom";
import Home from "./home";


const MenuSuperior = () => {
  return (
    <div className="h-10 w-screen pr-10 gap-10 flex justify-end items-center bg-slate-200 border-b border-gray-400  ">
        <Link to={"/home"} className="bg-slate-100 p-1 rounded-md hover:bg-slate-300 border border-gray-300">Home</Link>
        <Link to={'/cadastro'} className="bg-slate-100 p-1 rounded-md hover:bg-slate-300 border border-gray-300">Cadastro</Link>
    </div>
  )
}

export default MenuSuperior;
