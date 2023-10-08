import { ITopic } from './topic.interface';

export interface ISubject {
  id: string;
  name: string;
  description?: string; // Descrição sobre a matéria para SEO
  topics: ITopic[];
  status: string | ESubjectStatus; // Indica se a matéria está ativa, inativa, pendente de revisão, etc.
  createdAt: string | Date; // A data foi ADICIONADA no sistema
  updatedAt: string | Date; // A data foi ATUALIZADA no sistema
}

export enum ESubjectStatus {
  ACTIVE = 'ACTIVE', // Matéria ativa e disponível para uso.
  PENDING_REVIEW = 'PENDING_REVIEW', // Matéria aguardando revisão.
  ARCHIVED = 'ARCHIVED', // Matéria arquivada.
}
