import { useState } from "react"
import { useNavigate} from "react-router-dom";
import dbConnection from "../dbRoutes/dbConnection";

function Login() {

    const [email,setEmail] = useState<string>("");
    const [senha,setSenha] = useState<string>("");
    const navigate = useNavigate();

    async function handleSubmit(e:any){
        e.preventDefault();
        const url = `${dbConnection()}/login/${email}/${senha}`
        try {
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            if (data.message === "Login successful") {
              navigate("/home");
            }
        } catch (error) {
            console.error('There was an error!', error);
        }
    }


    return (
        <div className="bg-slate-400 flex justify-center items-center w-screen h-screen">
            <div className="bg-gray-200 h-80 w-60 px-40 flex justify-center items-center">
                <form action="">
                    <div className="border-2 border-slate-400 px-8 py-5 justify-center rounded">
                        <label className="flex justify-center text-lg font-bold">Login</label>

                        <div className="flex flex-col m-1 p-1 gap-1" >
                            <label className=" font-semibold"> Usuario</label>
                            <input className="p-px pl-[0.2rem]" type="email" placeholder="Usuario" onChange={(e)=>setEmail(e.target.value)}/>
                        </div>

                        <div className="flex flex-col m-1 p-1 gap-1">
                            <label className=" font-semibold">Senha</label>
                            <input className="p-px pl-[0.2rem]" type="password" placeholder="Senha" onChange={(e)=>setSenha(e.target.value)}/>
                        </div>

                        <div className="flex justify-center p-3">
                            <button className="bg-slate-500 p-1 px-2 rounded-md text-white" onClick={handleSubmit}>Login</button>
                        </div>
                        
                    </div>

                </form>
            </div>
        </div>
    )
}

export default Login;
