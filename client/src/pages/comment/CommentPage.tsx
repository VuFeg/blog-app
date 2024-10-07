import { Ellipsis, HeartIcon, MoveLeft } from "lucide-react";
import {
  ArrowPathRoundedSquareIcon,
  ChatBubbleLeftIcon,
  EllipsisHorizontalIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import { ChevronRight } from "lucide-react";
import { Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePostStore } from "../../store/postStore";
import { CommentType, PostType } from "../../types/post.type";
import { formatDistanceToNow } from "date-fns";
import { vi } from "date-fns/locale";
import { useUsersStore } from "../../store/usersStore";
import { PostRepCmt } from "../../components/PostRepCmt";

export const CommentPage = () => {
  const [post, setPost] = useState<PostType>();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [open, setOpen] = useState(false);
  const { postId } = useParams();

  const { user } = useUsersStore();
  const { getPost, likePost, getComments } = usePostStore();

  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        const data = await getPost(postId);
        setPost(data);
      }
    };
    fetchPost();
    window.scrollTo(0, 0);
  }, [postId]);

  useEffect(() => {
    const fetchComments = async () => {
      if (postId) {
        const data = await getComments(postId);
        setComments(data);
      }
    };
    fetchComments();
  }, [postId]);

  const handleLike = async (post: PostType) => {
    await likePost(post._id);
    const data = await getPost(post._id);
    setPost(data);
  };

  const handleBack = () => {
    window.history.back();
  };

  return (
    <div className="mx-auto w-full md:max-w-xl">
      <div className="hidden md:flex justify-between items-center h-16 mx-4">
        <div
          className="p-1 bg-white border rounded-full cursor-pointer"
          onClick={handleBack}
        >
          <MoveLeft className="size-4" />
        </div>
        <h3 className="text-base font-semibold ml-4 cursor-pointer">Blog</h3>
        <div className="p-1 bg-white border rounded-full cursor-pointer">
          <Ellipsis className="size-4" />
        </div>
      </div>

      <div className="bg-white min-h-screen md:border md:rounded-t-3xl pt-12 md:pt-0 mt-4">
        <div className="flex gap-5 px-6 py-4 ">
          <div className="flex flex-col flex-1 gap-5 py-4 border-b">
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center font-bold ">
                <div className="flex items-center gap-4 cursor-pointer">
                  <div>
                    <Avatar
                      src={post?.user?.avatar || "/avatar.png"}
                      alt={post?.user?.username}
                      sx={{ height: 36, width: 36 }}
                    />
                  </div>
                  {post?.user?.username}
                  <span className="opacity-15 font-normal">
                    {post?.created_at &&
                      formatDistanceToNow(new Date(post?.created_at ?? ""), {
                        addSuffix: true,
                        locale: vi,
                      })}
                  </span>
                </div>
                <button className="rounded-full p-1 hover:bg-gray-300">
                  <EllipsisHorizontalIcon className="size-5" />
                </button>
              </div>
              <div className="flex gap-2 flex-col">
                <p>{post?.captions}</p>
                <img
                  src={post?.medias[0].url}
                  alt=""
                  className="h-72 w-full object-cover rounded-2xl"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <button
                className="rounded-full p-1 hover:scale-125 flex items-center gap-1"
                onClick={() => post && handleLike(post)}
              >
                {post?.like?.some((item) => item.user_id === user?._id) ? (
                  <HeartIcon fill="red" className="size-5 text-red-500" />
                ) : (
                  <HeartIcon className="size-5" />
                )}
                <span className="text-sm">{post?.like?.length || ""}</span>
              </button>
              <button
                className="flex items-center gap-1 rounded-full p-1 hover:scale-125"
                onClick={() => setOpen(true)}
              >
                <ChatBubbleLeftIcon className="size-5" />
                <span>{comments?.length || ""}</span>
              </button>
              {post && (
                <PostRepCmt
                  open={open}
                  setOpen={setOpen}
                  post={post}
                  setComments={setComments}
                />
              )}
              <button className="rounded-full p-1 hover:scale-125">
                <ArrowPathRoundedSquareIcon className="size-5" />
              </button>
              <button className="rounded-full p-1 hover:scale-125">
                <PaperAirplaneIcon className="size-5" />
              </button>
            </div>
          </div>
        </div>
        <div className="flex justify-between ml-8 mr-8 mb-4">
          <div className="flex font-bold ">Blog trả lời</div>
          <div className="flex opacity-40 cursor-pointer">
            Xem hoạt động
            <ChevronRight />
          </div>
        </div>
        <hr />
        {comments?.map((comment) => (
          <div key={comment._id} className="flex gap-4 p-4 border-b">
            <div className="cursor-pointer mt-3">
              <Avatar
                src={comment.user?.avatar}
                alt=""
                sx={{ height: 36, width: 36 }}
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex flex-col">
                <div className="flex flex-1 justify-between">
                  <div className=" flex font-bold cursor-pointer">
                    {comment.user?.username}
                    <span className=" flex ml-3 opacity-15 font-normal">
                      {formatDistanceToNow(new Date(comment.created_at ?? ""), {
                        addSuffix: true,
                        locale: vi,
                      })}
                    </span>
                  </div>
                  <button className="rounded-full p-1 hover:bg-gray-300">
                    <EllipsisHorizontalIcon className="size-5" />
                  </button>
                </div>
                <div className="flex flex-col flex-1">
                  {comment.content
                    ?.split("\n")
                    .map((text: string, index: number) => (
                      <span key={index}>
                        {text}
                        <br />
                      </span>
                    ))}
                </div>
                <div className="flex gap-4 mt-2">
                  <button className="rounded-full p-2 hover:bg-gray-300 opacity-50">
                    <HeartIcon className="size-5" />
                  </button>
                  <button className="flex items-center gap-1 rounded-full p-2 hover:bg-gray-300 opacity-50">
                    <ChatBubbleLeftIcon className="size-5" />
                  </button>
                  <button className="rounded-full p-2 hover:bg-gray-300 opacity-50">
                    <ArrowPathRoundedSquareIcon className="size-5" />
                  </button>
                  <button className="rounded-full p-2 hover:bg-gray-300 opacity-50">
                    <PaperAirplaneIcon className="size-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
