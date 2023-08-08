import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { randomUUID } from 'crypto';

interface UserParams {
  readonly id: string;
}

interface UserBody {
  readonly name: string;
  readonly age: number;
}

@Controller('users')
export class UsersController {
  @Get('/:id')
  public findById(@Param() params: UserParams) {
    const id = params.id;
    return `Hello, User! ${id}`;
  }

  @Post()
  public create(@Body() body: UserBody) {
    return {
      id: randomUUID(),
      ...body,
    };
  }
}
