export interface Salas{
    salaId: number,
    salaNome: string,
    caminhoImagem: string,
    salaLocal: string,
    salaDataUso: Date,
    salaHoraInicio: string,
    salaHoraFinal: string,
    salaResponsavel: string,
    salaMotivo: string,
    salaInfo: string,
    salaConvidados: JSON
}