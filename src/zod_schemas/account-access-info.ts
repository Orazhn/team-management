import { z } from "zod";

export const AccountAccessSchema = z.object({
  email: z.string().email("Invalid email address"),
  slackID: z.string().min(9, "Slack ID must be at least 9 characters"),
  skypeID: z.string().min(6, "Skype ID must be at least 6 characters"),
  githubID: z.string().min(1, "github ID must have at least 1 character"),
});

export type AccountAccessFormData = z.infer<typeof AccountAccessSchema>;
