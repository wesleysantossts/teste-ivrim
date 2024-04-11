export enum Status {
  AFAZER = "a fazer",
  PROGRESSO = "em progresso",
  CONCLUIDO = "concluido"
}

export type TaskPayload = {
  titulo: string,
  descricao: string,
  status: Status,
}