import * as z from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Yêu cầu nhập email.").email("Email không hợp lệ."),
  password: z
    .string()
    .min(8, "Mật khẩu tối thiểu 8 ký tự.")
    .max(26, "Mật khẩu không được quá 26 ký tự."),
});

export type LoginSchema = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    name: z
    .string()
    .min(1, "Yêu cầu nhập họ và tên.")
    .max(100, "Họ và tên không được quá 100 ký tự."),
    email: z
      .string()
      .min(1, "Yêu cầu nhập email.")
      .email("Email không hợp lệ."),
    username: z
      .string()
      .min(1, "Yêu cầu nhập tên đăng nhập.")
      .max(32, "Tên đăng nhập không được quá 32 ký tự.")
      .regex(
        /^[a-zA-Z0-9_]+$/,
        "Tên đăng nhập không được chứa ký tự đặc biệt."
      ),
    password: z
      .string()
      .min(8, "Mật khẩu tối thiểu 8 ký tự.")
      .max(26, "Mật khẩu không được quá 26 ký tự."),
    confirmPassword: z.string().min(1, "Yêu cầu nhập lại mật khẩu."),
    acceptTerms: z.boolean().refine((data) => data, {
      message: "Yêu cầu chấp nhận điều khoản",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match",
  });

export type RegisterSchema = z.infer<typeof registerSchema>;