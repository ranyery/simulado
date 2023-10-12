export interface IQueryParams {
  search?: string;
  top?: number;
  skip?: number;
  orderBy: 'asc' | 'desc' | string; // TODO: Realizar melhor tipagem => CRIAR ENUM e ajustar Schemas
}
