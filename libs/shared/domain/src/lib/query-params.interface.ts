export interface IQueryParams {
  search?: string;
  take?: number;
  skip?: number;
  orderBy: 'asc' | 'desc' | string; // TODO: Realizar melhor tipagem => CRIAR ENUM e ajustar Schemas
}
