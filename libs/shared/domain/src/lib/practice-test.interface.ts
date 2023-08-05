// Entidade Simulado
import { EDifficultyLevel, IQuestion, ISubject } from './question.interface';

export interface IPracticeTest {
  id: string;
  title: string;
  description: string;
  currentQuestionIndex: number; // ! Pode ser implementada no Front-End e remover daqui
  questions: IQuestion[];
  answeredQuestionIds: string[]; // Lista de IDs das questões respondidas
  pendingQuestionIds: string[]; // Lista de IDs das questões pendentes
  // markForReviewQuestionIds: string[]; // Lista de IDs das questões marcadas para revisão
  correctQuestionIds: string[]; // Lista de IDs das questões respondidas corretamente
  incorrectQuestionIds: string[]; // Lista de IDs das questões respondidas incorretamente
  duration: number; // Duração em minutos
  subject: ISubject[]; // Matéria
  difficultyLevel: EDifficultyLevel; // Nível de dificuldade do simulado
  startDate: string; // Data de início do período de disponibilidade do simulado
  endDate: string; // Data de término do período de disponibilidade do simulado
  isCompleted: boolean;
  passingScore?: number; // Pontuação mínima para aprovação no simulado
  attempts?: number; // Número máximo de tentativas permitidas para o simulado
  reviewBeforeSubmit?: boolean; // Revisar respostas antes de enviar o simulado
  featuredImage?: string; // Link para imagem destacada ou capa do simulado
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
