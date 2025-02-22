import { IsString, IsOptional, IsIn } from 'class-validator';
import { TodoStatus } from '../enums';

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsIn(Object.values(TodoStatus))
  @IsOptional()
  status?: TodoStatus;
}
