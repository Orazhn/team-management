import "dotenv/config";
import type { Config } from "drizzle-kit";
export default {
  dialect: "postgresql",
  schema: "./src/db/schema/*",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_NEON_DATABASE_URL!,
  },
} satisfies Config;
