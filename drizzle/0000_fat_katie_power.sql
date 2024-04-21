CREATE TABLE IF NOT EXISTS "artisan_wishlist" (
	"id" serial PRIMARY KEY NOT NULL,
	"artisan_id" integer NOT NULL,
	"thumbnail" varchar(256),
	"ranking" integer,
	"priority" varchar
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "artisans" (
	"id" serial PRIMARY KEY NOT NULL,
	"colourway" varchar(256),
	"maker" varchar(256),
	"sculpt" varchar(256),
	"mount" varchar(256),
	"description" varchar(1024),
	"cover_img" integer,
	"added_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "images_artisans" (
	"image_id" integer NOT NULL,
	"artisan_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "images_keyboards" (
	"image_id" integer NOT NULL,
	"keyboard_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "images" (
	"id" serial PRIMARY KEY NOT NULL,
	"url" varchar(256) NOT NULL,
	"description" varchar(1024),
	"uploaded_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "keyboards" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"description" varchar(1024),
	"cover_img" integer,
	"added_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "artisan_wishlist" ADD CONSTRAINT "artisan_wishlist_artisan_id_artisans_id_fk" FOREIGN KEY ("artisan_id") REFERENCES "artisans"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "artisans" ADD CONSTRAINT "artisans_cover_img_images_id_fk" FOREIGN KEY ("cover_img") REFERENCES "images"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "images_artisans" ADD CONSTRAINT "images_artisans_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "images_artisans" ADD CONSTRAINT "images_artisans_artisan_id_artisans_id_fk" FOREIGN KEY ("artisan_id") REFERENCES "artisans"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "images_keyboards" ADD CONSTRAINT "images_keyboards_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "images_keyboards" ADD CONSTRAINT "images_keyboards_keyboard_id_keyboards_id_fk" FOREIGN KEY ("keyboard_id") REFERENCES "keyboards"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "keyboards" ADD CONSTRAINT "keyboards_cover_img_images_id_fk" FOREIGN KEY ("cover_img") REFERENCES "images"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
