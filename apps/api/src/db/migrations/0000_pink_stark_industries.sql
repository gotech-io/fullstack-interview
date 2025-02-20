CREATE TYPE "public"."device_type" AS ENUM('WORKSTATION', 'SERVER', 'MOBILE');--> statement-breakpoint
CREATE TYPE "public"."risk_level" AS ENUM('UNKNOWN', 'LOW', 'MEDIUM', 'HIGH', 'CRITICAL');--> statement-breakpoint
CREATE TABLE "devices" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"hostname" varchar NOT NULL,
	"platform" varchar,
	"os_version" varchar,
	"mac_address" varchar,
	"last_login_at" timestamp,
	"type" "device_type" NOT NULL,
	"risk_level" "risk_level" DEFAULT 'UNKNOWN' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
