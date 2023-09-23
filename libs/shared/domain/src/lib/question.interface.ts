// Entidades Pergunta e Resposta

export interface IQuestion {
  id: string;
  statement: string; // Enunciado => A pergunta ou problema apresentado
  answerOptions: IAnswer[]; // Uma lista de opções para a resposta da questão (para questões de múltipla escolha)
  correctAnswerId: string; // Identificador da resposta correta
  questionType: EQuestionType;
  source: ISource;
  difficultyLevel: EDifficultyLevel;
  subject: ISubject; // A matéria à qual a questão está relacionada (matemática, história, etc.)
  relatedTopics: ITopic[]; // Tópicos ou tags (da matéria) que ajudam a categorizar ou relacionar a questão a conceitos específicos (Matemática => Equação de 1º grau).
  isActive: boolean;
  // author: string; // O autor da questão, se você desejar rastrear quem criou a questão.
  // questionStatus: string; // Indica se a questão está ativa, inativa, pendente de revisão, etc.
  createdAt: string; // A data foi ADICIONADA no sistema
  updatedAt: string; // A data foi ATUALIZADA no sistema
}

export interface IAnswer {
  id: string;
  text: string;
  explanation?: string; // Uma explicação opcional que fornece informações adicionais sobre a resposta correta
}

export const enum EQuestionType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE', // Múltipla Escolha,
  TRUE_OR_FALSE = 'TRUE_OR_FALSE', // Verdadeiro ou Falso,
  FILL_IN_THE_BLANK = 'FILL_IN_THE_BLANK', // Preenchimento de Espaço em Branco,
}

export const enum EDifficultyLevel {
  EASY = 'EASY', // Fácil,
  MEDIUM = 'MEDIUM', // Médio,
  HARD = 'HARD', // Difícil,
}

export interface ISubject {
  id: string;
  text: string;
  description: string; // Descrição sobre a matéria para SEO
}

export interface ITopic extends ISubject {
  subjectId: string;
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
