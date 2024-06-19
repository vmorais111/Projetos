
import MenuSuperior from './menuSuperior'
import { useState } from 'react'
import { Salas } from '../usefulBits/salasInterface'
import dbConnection from '../usefulBits/dbConnection'
import axios from 'axios'


function Cadastro() {
  
  const [nome,setNome] = useState<string>("")
  const [local,setLocal] = useState<string>("")
  const [dia,setDia] = useState<string>();
  const [horaInicial,setHoraInicial] = useState<string>("")
  const [horaFinal,setHoraFinal] = useState<string>("")
  const [respons,setRepons] = useState<string>("")
  const [motivo,setMotivo] = useState<string>("")
  const [aditionalInfo,setAditionalInfo] = useState<string>("")
  const [convidados,setConvidados] = useState<string[]>([])
  const [convidado,setConvidado] = useState<string>("")

  const handleAddConv = () =>{
    setConvidados([...convidados,convidado])
  }

  const convertToDate:any = (e:string) => {
    const a = new Date(e)
    return a
  }



  async function handleSubmit(e:any){

    const Model: Salas ={
      salaId: 3,
      salaNome: nome,
      caminhoImagem: "",
      salaLocal: local,
      salaDataUso: convertToDate(dia),
      salaHoraInicio: horaInicial,
      salaHoraFinal: horaFinal,
      salaResponsavel: respons,
      salaMotivo: motivo,
      salaInfo: aditionalInfo,
      salaConvidados: JSON.parse(JSON.stringify(convidados))
    }
    
    e.preventDefault();
    const url = `${dbConnection}/salas`

    try {
      const response = await axios.post(url,Model)
      console.log(response)
    } catch (error) {
      console.error(error)
    }
  }


  return (
    <div className="bg-slate-400 w-screen h-screen" >
      <MenuSuperior/>
      <div className="mt-8 flex justify-center items-center w-screen h-5/6 ">
        <div className='bg-slate-200 h-4/5 w-3/12 flex flex-col items-center'>
          <div>
            <label className='font-semibold'>Insira uma nova reunião</label>
          </div>

          <div className=' h-[23rem] w-80 border-2 border-slate-400 rounded'>
            <div className='h-full p-5 flex flex-col justify-center '>
            <form className='flex flex-col gap-1'>
              <input type="text" placeholder='Nome' onChange={(e)=>setNome(e.target.value)}/>
              <input type="text" placeholder='Local' onChange={(e)=>setLocal(e.target.value)}/>
              <input type="date" placeholder='Dia' onChange={(e)=>setDia(e.target.value)}/>
              <input type="text" placeholder='Hora inicial (hh:mm)'onChange={(e)=>setHoraInicial(e.target.value)}/>
              <input type="text" placeholder='Hora final (hh:mm)' onChange={(e)=>setHoraFinal(e.target.value)}/>
              <input type="text" placeholder='Responsável' onChange={(e)=>setRepons(e.target.value)}/>
              <input type="text" placeholder='Motivo' onChange={(e)=>setMotivo(e.target.value)}/>
              <input type="text" placeholder='informações adicionais' onChange={(e)=>setAditionalInfo(e.target.value)}/>
              <input type="text" placeholder='Convidados' onChange={(e)=>{setConvidado(e.target.value)}}/>
              <button type="button"  className='bg-slate-600 text-white rounded-lg mt-2' onClick={handleAddConv}>Adicionar convidado</button>
              <button type="button" className='bg-slate-600 text-white rounded-lg mt-2' onClick={handleSubmit}>Cadastrar</button>
            </form>
            </div>

          </div>       
        </div>
      </div>
    </div>
  )
}

export default Cadastro
