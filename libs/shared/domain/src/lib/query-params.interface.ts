export interface IQueryParams {
  search?: string;
  take?: number;
  skip?: number;
  orderBy: 'asc' | 'desc' | string;
}
