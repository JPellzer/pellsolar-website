CREATE TYPE "public"."website_category" AS ENUM('solar', 'battery', 'ev-charging', 'roofing', 'other');--> statement-breakpoint
CREATE TYPE "public"."website_chatSender" AS ENUM('visitor', 'admin');--> statement-breakpoint
CREATE TYPE "public"."website_chatSessionStatus" AS ENUM('active', 'closed', 'missed');--> statement-breakpoint
CREATE TYPE "public"."website_interestType" AS ENUM('solar', 'battery', 'solar_battery', 'ev_charger', 'other');--> statement-breakpoint
CREATE TYPE "public"."website_leadStatus" AS ENUM('New', 'Contacted', 'Quoted', 'Closed', 'Lost');--> statement-breakpoint
CREATE TYPE "public"."website_ownershipType" AS ENUM('homeowner', 'renter');--> statement-breakpoint
CREATE TYPE "public"."website_paymentPreference" AS ENUM('leasing', 'financing', 'cash');--> statement-breakpoint
CREATE TYPE "public"."website_propertyType" AS ENUM('family_home', 'apartment', 'commercial');--> statement-breakpoint
CREATE TYPE "public"."website_role" AS ENUM('user', 'admin');--> statement-breakpoint
CREATE TYPE "public"."website_solarMotivation" AS ENUM('price_stability', 'reduce_bills', 'all_electric', 'other');--> statement-breakpoint
CREATE TABLE "website_chat_messages" (
	"id" serial PRIMARY KEY NOT NULL,
	"sessionId" integer NOT NULL,
	"sender" "website_chatSender" NOT NULL,
	"message" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "website_chat_sessions" (
	"id" serial PRIMARY KEY NOT NULL,
	"sessionToken" varchar(128) NOT NULL,
	"visitorName" varchar(128),
	"visitorEmail" varchar(320),
	"visitorPhone" varchar(32),
	"status" "website_chatSessionStatus" DEFAULT 'active' NOT NULL,
	"smsSent" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "website_chat_sessions_sessionToken_unique" UNIQUE("sessionToken")
);
--> statement-breakpoint
CREATE TABLE "website_chat_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"isOnline" integer DEFAULT 0 NOT NULL,
	"offlineMessage" text DEFAULT 'We''re currently offline. Leave your name and email and we''ll get back to you shortly!',
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "website_leads" (
	"id" serial PRIMARY KEY NOT NULL,
	"firstName" varchar(128) NOT NULL,
	"lastName" varchar(128) NOT NULL,
	"email" varchar(320) NOT NULL,
	"phone" varchar(32) NOT NULL,
	"address" text,
	"ownershipType" "website_ownershipType" NOT NULL,
	"propertyType" "website_propertyType",
	"zipCode" varchar(10),
	"existingSolar" integer,
	"solarMotivation" "website_solarMotivation",
	"paymentPreference" "website_paymentPreference",
	"monthlyBillRange" varchar(64),
	"interestType" "website_interestType" NOT NULL,
	"interestOtherText" text,
	"billFileKey" text,
	"billFileUrl" text,
	"billFileName" varchar(256),
	"status" "website_leadStatus" DEFAULT 'New' NOT NULL,
	"source" varchar(64) DEFAULT 'homepage' NOT NULL,
	"notes" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "website_project_photos" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256) NOT NULL,
	"description" text,
	"imageUrl" text NOT NULL,
	"imageKey" text,
	"category" "website_category" DEFAULT 'solar' NOT NULL,
	"location" varchar(256),
	"featured" integer DEFAULT 0 NOT NULL,
	"sortOrder" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "website_unsubscribes" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(320) NOT NULL,
	"token" varchar(128) NOT NULL,
	"campaign" varchar(256),
	"ipAddress" varchar(64),
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "website_unsubscribes_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "website_users" (
	"id" serial PRIMARY KEY NOT NULL,
	"openId" varchar(64) NOT NULL,
	"name" text,
	"email" varchar(320),
	"loginMethod" varchar(64),
	"role" "website_role" DEFAULT 'user' NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	"lastSignedIn" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "website_users_openId_unique" UNIQUE("openId")
);
