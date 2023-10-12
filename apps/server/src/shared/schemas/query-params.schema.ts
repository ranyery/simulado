import { createZodDto } from 'nestjs-zod';
import { z } from 'nestjs-zod/z';

const MIN_TAKE_VALUE = 0;
const DEFAULT_TAKE_VALUE = 20;
const MAX_TAKE_VALUE = 100;

const DEFAULT_SKIP_VALUE = 0;

const transformTake = (value: string) => {
  const parsedValue = parseInt(value, 10);
  if (!isNaN(parsedValue) && parsedValue >= MIN_TAKE_VALUE && parsedValue <= MAX_TAKE_VALUE) {
    return parsedValue;
  }
  return DEFAULT_TAKE_VALUE;
};

const transformSkip = (value: string) => {
  const parsedValue = parseInt(value, 10);
  if (!isNaN(parsedValue) && parsedValue >= DEFAULT_SKIP_VALUE) {
    return parsedValue;
  }
  return DEFAULT_SKIP_VALUE;
};

const transformOrderBy = (order: string) => {
  const allowedOrders = ['asc', 'desc'];
  if (allowedOrders.includes(order)) {
    return order;
  }
  return 'asc';
};

const QueryParamsSchema = z.object({
  search: z.string().trim().toLowerCase().optional(),
  take: z.string().trim().optional().default('20').transform(transformTake),
  skip: z.string().trim().optional().default('0').transform(transformSkip),
  orderBy: z.string().trim().toLowerCase().optional().default('asc').transform(transformOrderBy),
});

// Usar como referência de dados RECEBIDOS do Front-End
export class QueryParamsRequestDTO extends createZodDto(QueryParamsSchema) {}
