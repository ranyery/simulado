import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { CreateUserDTO } from '../dto/user.dto';

@Injectable()
export class CreateUserValidationPipe implements PipeTransform {
  transform({ email, password }: CreateUserDTO, metadata: ArgumentMetadata) {
    if (!email || !password) {
      throw new HttpException('[email, password] is required', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    return { email, password } as CreateUserDTO;
  }
}
