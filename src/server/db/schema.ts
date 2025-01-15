import { relations, sql } from "drizzle-orm";
import {
  index,
  integer,
  pgTableCreator,
  pgEnum,
  primaryKey,
  text,
  timestamp,
  date,
  varchar,
} from "drizzle-orm/pg-core";
import { type AdapterAccount } from "next-auth/adapters";

export const appStatusEnum = pgEnum("appstatus", [
  "interviewed",
  "pending",
  "rejected",
]);
export const secondaryStatusesEnum = pgEnum("secondaryStatuses", [
  "",
  "received take-home",
  "completed take-home",
  "invited to interview",
  "completed recruiter interview",
  "completed tech interview",
  "completed interview rounds",
  "received offer",
]);

export const statusTypes = appStatusEnum.enumValues;
export const secondaryStatusTypes = secondaryStatusesEnum.enumValues;

export const accessEnum = pgEnum("accesslevels", [
  "write",
  "admin",
  "special",
  "demo",
]);

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `jat_${name}`);

export const users = createTable("user", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 255 }).notNull(),
  emailVerified: timestamp("email_verified", {
    mode: "date",
    withTimezone: true,
  }).default(sql`CURRENT_TIMESTAMP`),
  image: varchar("image", { length: 255 }),
  accessLevel: accessEnum().default("write"),
});

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  applications: many(applications),
}));

export const applications = createTable("applications", {
  id: integer("id").primaryKey().generatedByDefaultAsIdentity(),
  role: varchar("role", { length: 256 }).notNull(),
  company: varchar("company", { length: 256 }).notNull(),
  applicationStatus: appStatusEnum().default("pending"),
  secondaryStatus: secondaryStatusesEnum().default(""),
  appliedAt: date("applied_at", { mode: "string" }).notNull(),
  statusUrl: varchar("statusurl", { length: 1024 }).default(""),
  descriptionUrl: varchar("descriptionurl", { length: 1024 }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).$onUpdate(
    () => new Date(),
  ),
  createdBy: integer("created_by"),
});

export const applicationRelations = relations(applications, ({ one }) => ({
  user: one(users, {
    fields: [applications.createdBy],
    references: [users.id],
  }),
}));

export const accounts = createTable(
  "account",
  {
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    type: varchar("type", { length: 255 })
      .$type<AdapterAccount["type"]>()
      .notNull(),
    provider: varchar("provider", { length: 255 }).notNull(),
    providerAccountId: varchar("provider_account_id", {
      length: 255,
    }).notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: varchar("token_type", { length: 255 }),
    scope: varchar("scope", { length: 255 }),
    id_token: text("id_token"),
    session_state: varchar("session_state", { length: 255 }),
  },
  (account) => ({
    compoundKey: primaryKey({
      columns: [account.provider, account.providerAccountId],
    }),
    userIdIdx: index("account_user_id_idx").on(account.userId),
  }),
);

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, { fields: [accounts.userId], references: [users.id] }),
}));

export const sessions = createTable(
  "session",
  {
    sessionToken: varchar("session_token", { length: 255 })
      .notNull()
      .primaryKey(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (session) => ({
    userIdIdx: index("session_user_id_idx").on(session.userId),
  }),
);

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));

export const verificationTokens = createTable(
  "verification_token",
  {
    identifier: varchar("identifier", { length: 255 }).notNull(),
    token: varchar("token", { length: 255 }).notNull(),
    expires: timestamp("expires", {
      mode: "date",
      withTimezone: true,
    }).notNull(),
  },
  (vt) => ({
    compoundKey: primaryKey({ columns: [vt.identifier, vt.token] }),
  }),
);
