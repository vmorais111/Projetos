
import MenuSuperior from './menuSuperior'
import { Salas } from '../interfaces/salasInterface'
import { useState } from 'react'


function Cadastro() {
  
  const [nome,setNome] = useState<string>("")
  const [local,setLocal] = useState<string>("")
  const [dia,setDia] = useState<string>("");
  const [horaInicial,setHoraInicial] = useState<string>("")
  const [horaFinal,setHoraFinal] = useState<string>("")
  const [respons,setRepons] = useState<string>("")
  const [motivo,setMotivo] = useState<string>("")
  const [aditionalInfo,setAditionalInfo] = useState<string>("")
  const [convidados,setConvidados] = useState<string>("")
 
  const limpar = ()=>{
    setNome("")
    setLocal("")
    setDia("")
    setHoraInicial("")
    setHoraFinal("")
    setRepons("")
    setMotivo("")
    setAditionalInfo("")
    setConvidados("")
  }

  const handleAddSala = () =>{
    const convertToDate:any = (e:string) => {
      const a = new Date(e).toUTCString
      return a
    }

    const meetingData:Salas = {
      "salaNome":nome,
      "caminhoImagem":"",
      "salaLocal":local,
      "salaDataUso":convertToDate(dia),
      "salaHoraInicio":horaInicial,
      "salaHoraFinal":horaFinal,
      "salaResponsavel":respons,
      "salaMotivo":motivo,
      "salaInfo": aditionalInfo,
      "salaConvidados":JSON.parse(JSON.stringify(convidados.split(',').map(guest => guest.trim())))
    };

    fetch('http://127.0.0.1:3000/salas', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(meetingData)
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      limpar();
    })
    .catch(error => {
      console.error('Error:', error);
    });
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
              <input type="text" placeholder='Nome' value={nome} onChange={e => setNome(e.target.value)}/>
              <input type="text" placeholder='Local' value={local} onChange={e => setLocal(e.target.value)}/>
              <input type="date" placeholder='Dia' value={dia} onChange={e => setDia(e.target.value)}/>
              <input type="text" placeholder='Hora inicial (hh:mm)' value={horaInicial} onChange={e => setHoraInicial(e.target.value)}/>
              <input type="text" placeholder='Hora final (hh:mm)'value={horaFinal} onChange={e => setHoraFinal(e.target.value)}/>
              <input type="text" placeholder='Responsável' value={respons} onChange={e => setRepons(e.target.value)}/>
              <input type="text" placeholder='Motivo' value={motivo} onChange={e => setMotivo(e.target.value)} />
              <input type="text" placeholder='informações adicionais' value={aditionalInfo} onChange={e => setAditionalInfo(e.target.value)}/>
              <input type="text" placeholder='Convidados' value={convidados} onChange={e => setConvidados(e.target.value)}/>
              <button type="button" className='bg-slate-600 text-white rounded-lg mt-2' onClick={ e => { e.preventDefault(); handleAddSala(); }}>Cadastrar</button>
            </form>
            </div>

          </div>       
        </div>
      </div>
    </div>
  )
}

export default Cadastro
