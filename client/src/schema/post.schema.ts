import * as z from "zod";

export const CreatePostSchema = z.object({
  captions: z.string().min(1, "Yêu cầu nhập nội dung bài viết."),
  medias: z
    .array(z.string())
    .nonempty("Yêu cầu chọn ít nhất một ảnh hoặc video."),
});

export type CreatePostSchema = z.infer<typeof CreatePostSchema>;
