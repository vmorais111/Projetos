
import MenuSuperior from './menuSuperior'
import { Salas } from '../usefulBits/salasInterface'
import { useState } from 'react'


function Cadastro() {
  
  const [salaCadastrar,setSalaCadastrar] = useState<Salas>();
  const [nome,setNome] = useState<string>("")
  const [local,setLocal] = useState<string>("")
  const [dia,setDia] = useState<Date>();
  const [horaInicial,setHoraInicial] = useState<string>("")
  const [horaFinal,setHoraFinal] = useState<string>("")
  const [respons,setRepons] = useState<string>("")
  const [motivo,setMotivo] = useState<string>("")
  const [aditionalInfo,setAditionalInfo] = useState<string>("")
  const [convidados,setConvidados] = useState<string[]>([])


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
              <input type="text" placeholder='Nome'/>
              <input type="text" placeholder='Local'/>
              <input type="date" placeholder='Dia'/>
              <input type="text" placeholder='Hora inicial (hh:mm)'/>
              <input type="text" placeholder='Hora final (hh:mm)'/>
              <input type="text" placeholder='Responsável'/>
              <input type="text" placeholder='Motivo'/>
              <input type="text" placeholder='informações adicionais'/>
              <input type="text" placeholder='Convidados'/>
              <button type="button" className='bg-slate-600 text-white rounded-lg mt-2'>Cadastrar</button>
            </form>
            </div>

          </div>       
        </div>
      </div>
    </div>
  )
}

export default Cadastro
