import z from "zod";

export const authDataSchema = z.object({
  email: z.email().min(1, { message: "Email wajib diisi" }),
  password: z
    .string()
    .min(1, { message: "Password wajib diisi" })
    .max(25, { message: "Password minimal 25 karakter" }),
});

export type AuthDataSchema = z.infer<typeof authDataSchema>;
