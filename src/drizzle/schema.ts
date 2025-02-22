// schema.ts
import {
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
  index,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';

export const todos = pgTable(
  'todos',
  {
    id: serial('id').primaryKey(),
    title: varchar('title', { length: 256 }).notNull(),
    description: text('description'),
    status: varchar('status', { length: 100 }).default('pending'),
    createdAt: timestamp('created_at').defaultNow().notNull(),
    updatedAt: timestamp('updated_at').defaultNow().notNull(),
    deletedAt: timestamp('deleted_at'),
  },
  (table) => ({
    statusIdx: index('status_idx').on(table.status),
    createdAtIndex: index('created_at_idx').on(table.createdAt),
    activeTodosIdx: index('active_todos_idx')
      .on(table.id)
      .where(sql`${table.deletedAt} IS NULL`),
  }),
);

// Keep the TypeScript enum for validation
export enum TodoStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
}
