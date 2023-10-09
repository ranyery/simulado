// Entidade Exame => ENEM, FUVEST, FATEC, etc

export interface IExam {
  id: string;
  acronym: string; // Sigla do Exame => FATEC, FUVEST, UFABC
  fullName: string; // Nome completo da instituição
  // website: string; // Site da instituição
  // description: string; // Descrição ou resumo da instituição
  // foundedYear: number; // Ano de fundação da instituição
  // logo: string; // Link para a imagem do logotipo da instituição
}

// Validar se createdAt, UpdatedAt e status são válidos de serem colocados aqui
