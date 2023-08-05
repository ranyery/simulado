export interface IQuestion {
  id: string;
  text: string;
  answers: IAnswer[];
  correctAnswerId: string;
  questionType: EQuestionType;
  source: ISource;
  images: IImage[];
  answerExplanation: string;
  difficultyLevel: EDifficultyLevel;
  additionalInfo: string;
  subject: ISubject; // Matéria
  topics: ITopic[]; // Tópico da matéria
  status: EQuestionStatus;
  createdAt: string;
  updatedAt: string;
}

export const enum EDifficultyLevel {
  EASY = 'Fácil',
  MEDIUM = 'Médio',
  HARD = 'Difícil',
}

export const enum EQuestionType {
  MULTIPLE_CHOICE = 'Múltipla Escolha',
  TRUE_FALSE = 'Verdadeiro ou Falso',
  FILL_IN_THE_BLANK = 'Preenchimento de Espaço em Branco',
}

export const enum EQuestionStatus {
  ACTIVE = 'Ativa',
  INACTIVE = 'Inativa',
  UNDER_REVIEW = 'Em Revisão',
}

export interface IAnswer {
  id: string;
  text: string;
  order: number;
}

export interface ISubject {
  id: string;
  text: string;
  description: string;
}

export interface ITopic {
  id: string;
  text: string;
  description: string;
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
