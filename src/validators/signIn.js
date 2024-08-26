import { z } from "zod";

export const signInSchema = z.object({
  username: z
    .string()
    .min(4, "Username must be at least 4 characters long")
    .max(20, "Username must be less than 20 characters long"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(64, "Password must be less than 64 characters long"),
});
