import { z } from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .min(4, "Username must be at least 4 characters long")
    .max(20, "Username cannot exceed 20 characters"),
  email: z.string().email(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(64, "Password cannot exceed 64 characters"),
});
