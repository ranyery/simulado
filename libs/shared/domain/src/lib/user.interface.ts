import { IPracticeTest } from './practice-test.interface';

export interface IUser {
  id: string;
  email: string;
  password: string; // Criptografada
  role: string | EUserRole;
  status: string | EUserStatus;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export enum EUserRole {
  USER = 'USER',
  TEACHER = 'TEACHER',
  ADMIN = 'ADMIN',
}

export enum EUserStatus {
  ACTIVE = 'ACTIVE', // Conta ativa e totalmente funcional.
  PENDING_CONFIRMATION = 'PENDING_CONFIRMATION', // Aguardando confirmação de e-mail.
  SUSPENDED = 'SUSPENDED', // Conta suspensa temporariamente.
  BANNED = 'BANNED', // Conta banida permanentemente.
  CLOSED = 'CLOSED', // Conta encerrada permanentemente pelo usuário.
}

export interface IConfirmationCode {
  id: string; // Um identificador único para a confirmação de e-mail.
  userId: string | Pick<IUser, 'id'>; // O ID do usuário associado à confirmação de e-mail.
  code: string; // O código de confirmação enviado por e-mail.
  isConfirmed: boolean; // Indica se foi confirmado com sucesso.
  createdAt: string | Date; // A data e hora em que a confirmação de e-mail foi criada.
  updatedAt: string | Date; // A data e hora da última atualização da confirmação de e-mail.
}

// Interface base para quando for adicionar a funcionalidade/página de perfil do usuário
export interface IUserProfile extends IUser {
  id: string; // Pode ser uma entidade separada do IUser, portanto precisa de um Id
  username: string;
  fullName: string;
  avatar?: string;
  bio?: string; // Biografia ou descrição do usuário
  birthDate?: string | Date; // Data de nascimento do usuário
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
  ENGLISH = 'ENGLISH',
  PORTUGUESE = 'PORTUGUESE',
}

export enum ESubject {
  MATH = 'MATH',
  ENGLISH = 'ENGLISH',
  SCIENCE = 'SCIENCE',
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
  completionDate: string | Date; // Data de conclusão do simulado
  practiceTestId: string | Pick<IPracticeTest, 'id'>;
}

export interface IAccessHistory {
  loginDate: string | Date; // Data e hora do último login do usuário
}

export interface IEducationInfo {
  degree: string; // Grau acadêmico (por exemplo, graduação, pós-graduação)
  fieldOfStudy: string; // Área de estudo
  university: string; // Universidade ou instituição de ensino
  graduationYear: number; // Ano de graduação
}
