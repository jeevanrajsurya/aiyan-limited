-- CreateTable safely if it does not already exist
CREATE TABLE IF NOT EXISTS "newsletter_submissions" (
    "id" VARCHAR(64) NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255),
    "email" VARCHAR(255) NOT NULL,
    "phone" VARCHAR(100),
    "zip" VARCHAR(50),
    "position" VARCHAR(255),
    "resume_url" TEXT,
    "status" VARCHAR(50) DEFAULT 'NEW',
    "submitted_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "newsletter_submissions_pkey" PRIMARY KEY ("id")
);
