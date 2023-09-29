export interface ITopic {
  id: string;
  name: string;
  description?: string | null; // Descrição sobre o tópico para SEO
  subjectId: string; // ISubject;
  status: string | ETopicStatus; // Indica se tópico está ativo, inativo ou pendente para revisão, etc.
  // authorId: string; // O autor da questão, se você desejar rastrear quem criou a questão.
  createdAt: string | Date; // A data foi ADICIONADA no sistema
  updatedAt: string | Date; // A data foi ATUALIZADA no sistema
}

export enum ETopicStatus {
  ACTIVE = 'ACTIVE', // Questão ativa e disponível para uso.
  PENDING_REVIEW = 'PENDING_REVIEW', // Questão aguardando revisão.
  ARCHIVED = 'ARCHIVED', // Questão arquivada, não é exibida nos simulados atuais.
}
