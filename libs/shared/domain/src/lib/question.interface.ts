// Entidade Pergunta

export interface IQuestion {
  id: string;
  statement: string; // Enunciado => A pergunta ou problema apresentado
  answerOptions: IAnswer[]; // Uma lista de opções para a resposta da questão (para questões de múltipla escolha)
  explanation?: string | null; // Uma explicação opcional que fornece informações adicionais sobre a resposta correta
  type: EQuestionType;
  source: ISource; // Exemplo (ENEM 2022)
  difficultyLevel: EQuestionDifficultyLevel;
  subjectId: string; // ISubject => A matéria à qual a questão está relacionada (matemática, história, etc.)
  relatedTopicIds: string[]; // ITopic[] => Tópicos ou tags (da matéria) que ajudam a categorizar ou relacionar a questão a conceitos específicos (Matemática => Equação de 1º grau).
  status: EQuestionStatus; // Indica se a questão está ativa, inativa, pendente de revisão, etc.
  // authorId: string; // O autor da questão, se você desejar rastrear quem criou a questão.
  createdAt: string | Date; // A data foi ADICIONADA no sistema
  updatedAt: string | Date; // A data foi ATUALIZADA no sistema
}

// Náo é uma entidade
export interface IAnswer {
  text: string;
  isCorrect: boolean;
}

export enum EQuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE', // Múltipla Escolha => Default
  TRUE_OR_FALSE = 'TRUE_OR_FALSE', // Verdadeiro ou Falso
  FILL_IN_THE_BLANK = 'FILL_IN_THE_BLANK', // Preenchimento de Espaço em Branco
}

export enum EQuestionDifficultyLevel {
  EASY = 'EASY', // Fácil,
  MEDIUM = 'MEDIUM', // Médio => Default
  HARD = 'HARD', // Difícil,
}

export enum EQuestionStatus {
  ACTIVE = 'ACTIVE', // Questão ativa e disponível para uso.
  PENDING_REVIEW = 'PENDING_REVIEW', // Questão aguardando revisão.
  ARCHIVED = 'ARCHIVED', // Questão arquivada, não é exibida nos simulados atuais.
}

export interface IImage {
  url: string;
}

export interface ISource {
  institution: Pick<IInstitution, 'id' | 'name'>;
  year: number;
}

export interface IInstitution {
  id: string;
  name: string; // Nome da instituição
  website: string; // Site da instituição
  description: string; // Descrição ou resumo da instituição
  foundedYear: number; // Ano de fundação da instituição
  logo: string; // Link para a imagem do logotipo da instituição
}
