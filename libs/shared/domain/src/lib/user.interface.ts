import { IPracticeTest } from './practice-test.interface';

export interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  role: EUserRole;
  lastLogin?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface IUserProfile extends IUser {
  fullName: string;
  avatar?: string;
  bio?: string; // Biografia ou descrição do usuário
  birthDate?: string; // Data de nascimento do usuário
  address?: IUserAddress; // Endereço do usuário
  phone?: string; // Número de telefone do usuário
  country?: ECountry; // País em que o usuário reside
  language?: ELanguage; // Idioma preferido do usuário na plataforma
  socialMedia?: IUserSocialMedia; // Links para contas de redes sociais do usuário
  favoriteSubjects?: ESubject[]; // Lista de matérias favoritas do usuário (enum)
  educationInfo?: IEducationInfo; // Informações Educacionais
  // ! Criar uma entidade para armazenar informações de histórico
  practiceTestHistory: IPracticeTestHistory[]; // Histórico de Simulados
  accessHistory: IAccessHistory[]; // Histórico de Acessos
}

export enum ECountry {
  USA = 'USA',
  BRAZIL = 'Brazil',
}

export enum ELanguage {
  ENGLISH = 'English',
  PORTUGUESE = 'Portuguese',
}

export enum ESubject {
  MATH = 'Math',
  ENGLISH = 'English',
  SCIENCE = 'Science',
}

export enum EUserRole {
  USER = 'User',
  TEACHER = 'Teacher',
  ADMIN = 'Admin',
}

export interface IUserAddress {
  street: string;
  number: string;
  city: string;
  state: string;
  zipCode: string;
}

export interface IUserSocialMedia {
  linkedIn?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  youtube?: string;
}

export interface IPracticeTestHistory {
  id: string; // ID do simulado realizado
  score: number; // Pontuação obtida no simulado
  completionDate: string; // Data de conclusão do simulado
  practiceTestId: Pick<IPracticeTest, 'id'>;
}

export interface IAccessHistory {
  loginDate: string; // Data e hora do último login do usuário
}

export interface IEducationInfo {
  degree: string; // Grau acadêmico (por exemplo, graduação, pós-graduação)
  fieldOfStudy: string; // Área de estudo
  university: string; // Universidade ou instituição de ensino
  graduationYear: number; // Ano de graduação
}
