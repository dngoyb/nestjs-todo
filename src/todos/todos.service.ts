import { Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { InjectDatabase } from '../database/database.decorator';
import { DrizzleDatabase } from '../database/database.interface';
import { todos } from 'src/drizzle/schema';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(@InjectDatabase() private readonly db: DrizzleDatabase) {}

  async create(createTodoDto: CreateTodoDto) {
    const [todo] = await this.db
      .insert(todos)
      .values(createTodoDto)
      .returning();
    return todo;
  }

  async findAll() {
    return this.db.select().from(todos);
  }

  async findOne(id: number) {
    return this.db.select().from(todos).where(eq(todos.id, id));
  }

  async update(id: number, updateTodoDto: UpdateTodoDto) {
    const [todo] = await this.db
      .update(todos)
      .set({
        ...updateTodoDto,
        updatedAt: new Date(), // Explicitly set updatedAt
      })
      .where(eq(todos.id, id))
      .returning();
    return todo;
  }

  async remove(id: number) {
    const [todo] = await this.db
      .delete(todos)
      .where(eq(todos.id, id))
      .returning();
    return todo;
  }
}
