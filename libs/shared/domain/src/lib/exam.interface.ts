// Entidade Exame => ENEM, FUVEST, FATEC, etc

export interface IExam {
  id: string;
  acronym: string; // Sigla do Exame => FATEC, FUVEST, UFABC
  name?: string; // Nome completo da instituição
  // website: string; // Site da instituição
  // description: string; // Descrição ou resumo da instituição
  // foundedYear: number; // Ano de fundação da instituição
  // logo: string; // Link para a imagem do logotipo da instituição
  status: string | EExamStatus; // Indica se a matéria está ativa, inativa, pendente de revisão, etc.
  createdAt: string | Date; // A data foi ADICIONADA no sistema
  updatedAt: string | Date; // A data foi ATUALIZADA no sistema
}

export enum EExamStatus {
  ACTIVE = 'ACTIVE',
  PENDING_REVIEW = 'PENDING_REVIEW',
  ARCHIVED = 'ARCHIVED',
}
