import { integer, pgTable, serial, varchar, timestamp} from "drizzle-orm/pg-core";


export const rolesTable = pgTable("roles", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
});

export const usersTable = pgTable("users", {
  id: serial().primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  lastname: varchar({length: 255}),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar().notNull(),
  created_at: timestamp().defaultNow(),
  role_id: integer().notNull().references(() => rolesTable.id)
});

