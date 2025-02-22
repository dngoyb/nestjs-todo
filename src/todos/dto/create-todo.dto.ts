import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { TodoStatus } from '../enums';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  status: TodoStatus;
}
