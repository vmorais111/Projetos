import MenuSuperior from "./menuSuperior"
import { Salas } from "../interfaces/salasInterface"
import { useEffect, useState } from "react"
import dbConnection from "../dbRoutes/dbConnection"
import separaDataHora from "../usefulBits/separarDataHora"


function Home() {
  const [busca,setBusca] = useState<Salas[]>([])
  const [salas,setSalas] = useState<Salas[]>([])
  const [nomeBusca,setNomeBusca] = useState<string>("")

  useEffect(()=>{
    handlePopCombo()
  },[])

  async function handlePopCombo(){
    const url = `${dbConnection()}/salas`
    try {
      const response = await fetch(url);
      if(!response.ok){
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const data = await response.json()
      setSalas(data)
    } catch (error) {
      console.error('There was an error!', error);
    }
  }

  const updateHora:any = (e:any) =>{
    if (typeof e ==='string'){
    const formatar = e.toString()
    const jsl = separaDataHora(formatar)
    const retorno = jsl?.[0]
    return retorno
    }
  }

  const search = (): void => {
    try {
      const jsl = nomeBusca;

      // Clear previous search results
      setBusca([]);
  
      // Filter salas and update busca state
      salas.forEach((sala) => {
        if (sala.salaNome === jsl) {
          setBusca((prevBusca) => [...prevBusca, sala]);
        }
      });
    } catch (error) {
      console.error(error)
    }
    
  };

  const Cards = <>
              {salas.map((sala,index)=>
                <div key={index} className="p-5 border border-gray-500 flex flex-col w-60">
                  <label>Nome: {sala.salaNome}</label>
                  <label>Local: {sala.salaLocal}</label>
                  <label>Data de uso: {updateHora(sala.salaDataUso)}</label>
                  <label>Hora inicial: {sala.salaHoraInicio}</label>
                  <label>Hora final: {sala.salaHoraFinal}</label>
                  <label>Responsável: {sala.salaResponsavel}</label>
                </div>
              )}
  </>

  const CardBusca=<>
                {busca.map((sala,index)=>
                <div key={index} className="p-8 border border-gray-500">
                  <label>Nome: {sala.salaNome}</label>
                  <label>Local: {sala.salaLocal}</label>
                  <label>Data de uso: {updateHora(sala.salaDataUso)}</label>
                  <label>Hora inicial: {sala.salaHoraInicio}</label>
                  <label>Hora final: {sala.salaHoraFinal}</label>
                  <label>Responsável: {sala.salaResponsavel}</label>
                </div>
              )}
  </>



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
              <input className="pl-1" type="text" placeholder="Nome da Sala" onChange={(e)=>setNomeBusca(e.target.value)}/>
              <button type="button" className="px-1 ml-1 bg-slate-600 text-white rounded-lg" onClick={search}>Buscar</button>
            </div>
            <div className=" w-fit h-80 flex overflow-x-auto m-3 mt-6 gap-1">
              {busca.length>0 ? CardBusca: Cards}
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Home
