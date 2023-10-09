import { createZodDto } from 'nestjs-zod';
import { CreateInstituteRequestSchema } from './create-institute.schema';

const PartialInstituteRequestSchema = CreateInstituteRequestSchema.partial();

// Usar como referência de dados RECEBIDOS do Front-End
export class PartialInstituteRequestDTO extends createZodDto(PartialInstituteRequestSchema) {}
