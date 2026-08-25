import { integer, pgEnum, pgTable, text, timestamp, varchar, serial } from "drizzle-orm/pg-core";

export const website_roleEnum = pgEnum("website_role", ["user", "admin"]);
export const website_ownershipTypeEnum = pgEnum("website_ownershipType", ["homeowner", "renter"]);
export const website_propertyTypeEnum = pgEnum("website_propertyType", ["family_home", "apartment", "commercial"]);
export const website_solarMotivationEnum = pgEnum("website_solarMotivation", ["price_stability", "reduce_bills", "all_electric", "other"]);
export const website_paymentPreferenceEnum = pgEnum("website_paymentPreference", ["leasing", "financing", "cash"]);
export const website_interestTypeEnum = pgEnum("website_interestType", ["solar", "battery", "solar_battery", "ev_charger", "other"]);
export const website_leadStatusEnum = pgEnum("website_leadStatus", ["New", "Contacted", "Quoted", "Closed", "Lost"]);
export const website_categoryEnum = pgEnum("website_category", ["solar", "battery", "ev-charging", "roofing", "other"]);
export const website_chatSessionStatusEnum = pgEnum("website_chatSessionStatus", ["active", "closed", "missed"]);
export const website_chatSenderEnum = pgEnum("website_chatSender", ["visitor", "admin"]);

export const website_users = pgTable("website_users", {
  id: serial("id").primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: website_roleEnum("role").default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof website_users.$inferSelect;
export type InsertUser = typeof website_users.$inferInsert;

export const website_leads = pgTable("website_leads", {
  id: serial("id").primaryKey(),

  // Contact info
  firstName: varchar("firstName", { length: 128 }).notNull(),
  lastName: varchar("lastName", { length: 128 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 32 }).notNull(),
  address: text("address"),

  // Qualification
  ownershipType: website_ownershipTypeEnum("ownershipType").notNull(),
  propertyType: website_propertyTypeEnum("propertyType"),
  zipCode: varchar("zipCode", { length: 10 }),
  existingSolar: integer("existingSolar"),
  solarMotivation: website_solarMotivationEnum("solarMotivation"),
  paymentPreference: website_paymentPreferenceEnum("paymentPreference"),
  monthlyBillRange: varchar("monthlyBillRange", { length: 64 }),
  interestType: website_interestTypeEnum("interestType").notNull(),
  interestOtherText: text("interestOtherText"),

  // Bill upload
  billFileKey: text("billFileKey"),
  billFileUrl: text("billFileUrl"),
  billFileName: varchar("billFileName", { length: 256 }),

  // CRM
  status: website_leadStatusEnum("status").default("New").notNull(),
  source: varchar("source", { length: 64 }).default("homepage").notNull(),
  notes: text("notes"),

  // Timestamps
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

export type Lead = typeof website_leads.$inferSelect;
export type InsertLead = typeof website_leads.$inferInsert;

export const website_projectPhotos = pgTable("website_project_photos", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 256 }).notNull(),
  description: text("description"),
  imageUrl: text("imageUrl").notNull(),
  imageKey: text("imageKey"),
  category: website_categoryEnum("category").default("solar").notNull(),
  location: varchar("location", { length: 256 }),
  featured: integer("featured").default(0).notNull(),
  sortOrder: integer("sortOrder").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ProjectPhoto = typeof website_projectPhotos.$inferSelect;
export type InsertProjectPhoto = typeof website_projectPhotos.$inferInsert;

export const website_unsubscribes = pgTable("website_unsubscribes", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 320 }).notNull(),
  token: varchar("token", { length: 128 }).notNull().unique(),
  campaign: varchar("campaign", { length: 256 }),
  ipAddress: varchar("ipAddress", { length: 64 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Unsubscribe = typeof website_unsubscribes.$inferSelect;
export type InsertUnsubscribe = typeof website_unsubscribes.$inferInsert;

// Live Chat
export const website_chatSettings = pgTable("website_chat_settings", {
  id: serial("id").primaryKey(),
  isOnline: integer("isOnline").default(0).notNull(), // 0 = offline, 1 = online
  offlineMessage: text("offlineMessage").default("We're currently offline. Leave your name and email and we'll get back to you shortly!"),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

export type ChatSettings = typeof website_chatSettings.$inferSelect;

export const website_chatSessions = pgTable("website_chat_sessions", {
  id: serial("id").primaryKey(),
  sessionToken: varchar("sessionToken", { length: 128 }).notNull().unique(),
  visitorName: varchar("visitorName", { length: 128 }),
  visitorEmail: varchar("visitorEmail", { length: 320 }),
  visitorPhone: varchar("visitorPhone", { length: 32 }),
  status: website_chatSessionStatusEnum("status").default("active").notNull(),
  smsSent: integer("smsSent").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
});

export type ChatSession = typeof website_chatSessions.$inferSelect;

export const website_chatMessages = pgTable("website_chat_messages", {
  id: serial("id").primaryKey(),
  sessionId: integer("sessionId").notNull(),
  sender: website_chatSenderEnum("sender").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type ChatMessage = typeof website_chatMessages.$inferSelect;

// Export aliases for backwards compatibility with existing imports
export const users = website_users;
export const leads = website_leads;
export const projectPhotos = website_projectPhotos;
export const unsubscribes = website_unsubscribes;
export const chatSettings = website_chatSettings;
export const chatSessions = website_chatSessions;
export const chatMessages = website_chatMessages;
