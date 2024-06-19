import MenuSuperior from "./menuSuperior"
import { Salas } from "../usefulBits/salasInterface"
import { useEffect, useState } from "react"
import dbConnection from "../usefulBits/dbConnection"
import axios from "axios"
import separaDataHora from "../usefulBits/separarDataHora"


function Home() {
  const [salas,setSalas] = useState<Salas[]>([])
  const [salaNome, setSalaNome] = useState<Salas>();
  const [nome,setNome] = useState<string>("")

  async function handlePopCombo(){
    const url = `${dbConnection()}/salas`
    try {
      const response = await axios.get(url);
      setSalas(response.data)
    } catch (error) {
      console.error('There was an error!', error);
    }
  }

  const updateHora:any = (e:Date) =>{
    const formatar = e.toString()
    const jsl = separaDataHora(formatar)
    const retorno = jsl?.[0]
    return retorno
  }

  useEffect(()=>{
    handlePopCombo()
  },[])
  
  useEffect(()=>{
    console.log(salas)
  },[nome])

  return (
  <>
    <div className="bg-slate-400 w-screen h-screen ">
      <MenuSuperior/>
      <div className="flex justify-center items-center w-screen h-[41vw]">
        <div className="bg-slate-200 w-4/5 h-4/5 pt-1 pb-5 px-5">
        
          <div className="flex justify-center">
            <label className="font-semibold"> Listagem de Salas</label>
          </div>

          <div className=" h-[95%] border-2 border-slate-400 rounded">
            <div className="p-1 border-b border-slate-400">
              <label>Pesquisar: </label>
              <input className="pl-1" type="text" placeholder="Nome da Sala" onChange={(e)=>setNome(e.target.value)}/>
            </div>
            <div className="flex overflow-y-auto p-1">
              {salas.map((sala,index)=>
                <div key={index} className="p-8 border border-gray-500 flex flex-col">
                  <label>Nome: {sala.salaNome}</label>
                  <label>Local: {sala.salaLocal}</label>
                  <label>Data de uso: {updateHora(sala.salaDataUso)}</label>
                  <label>Hora inicial: {sala.salaHoraInicio}</label>
                  <label>Hora final: {sala.salaHoraFinal}</label>
                  <label>Responsável: {sala.salaResponsavel}</label>
                </div>
              )}
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Home
