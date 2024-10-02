import { useEffect, useState } from "react";
import {
  ArrowPathRoundedSquareIcon,
  ChatBubbleLeftIcon,
  EllipsisHorizontalIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";

import {
  Avatar,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Dayjs } from "dayjs";
import { User } from "../../types/user.type";
import { useUsersStore } from "../../store/usersStore";
import { Clipboard } from "lucide-react";

export const Profilepage = () => {
  const [user, setUser] = useState<User | null>(null);

  const [isOpen, setIsOpen] = useState(false);
  const [gender, setGender] = useState("");
  const [bio, setBio] = useState("");
  const [website, setWebsite] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = useState<Dayjs | null>(null);

  const formatDate = (date: Dayjs | null) => {
    return date ? date.format("YYYY-MM-DD") : "";
  };
  const label = { inputProps: { "aria-label": "Switch demo" } };

  const handleUpdateProfile = async () => {
    if (file) {
      const data = await uploadAvatar(file as File);
      await updateProfile({
        name,
        bio,
        website,
        gender,
        day_of_birth: formatDate(value),
        avatar: data,
      });
      window.location.reload();
      return;
    }

    await updateProfile({
      name,
      bio,
      website,
      gender,
      day_of_birth: formatDate(value),
    });

    window.location.reload();
  };

  const { getMe, updateProfile, uploadAvatar } = useUsersStore();

  useEffect(() => {
    const checkMe = async () => {
      const data = await getMe();
      setUser(data);
    };
    checkMe();
  }, []);

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFile(file);
    }
  };

  const handleFileUploadClick = () => {
    document.getElementById("fileInput")?.click();
  };

  return (
    <div className="bg-white max-w-2xl rounded-t-3xl border shadow-lg min-h-screen mx-auto mt-24 md:mt-8">
      <div className="flex flex-col">
        <div className="p-4 mb-4 ">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-3xl font-bold ml-4">{user?.name}</h3>
              <p className="text-base ml-4">{user?.username}</p>
            </div>
            <img
              src={user?.avatar || "/avatar.png"}
              alt={user?.username}
              className="w-16 h-16 object-cover rounded-full mt-7 mr-4"
            />
          </div>
          <div className="flex justify-between items-center mx-4">
            <span className="opacity-45">
              {user?.followers?.length} người theo dõi
            </span>
            <Clipboard/>
          </div>
          <div className="ml-4">{user?.bio}</div>
        </div>
        <div className="p-4 mb-4">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className=" border px-4 py-1 rounded-md w-full font-medium"
          >
            Chỉnh sửa trang cá nhân
          </button>
        </div>
        <div className="flex justify-between items-center border-b p-4">
          <div className="relative flex-1 text-center text-gray-500 hover:text-black focus:text-black cursor-pointer">
            <span className="hover:underline focus:underline">Blog</span>
            <div className="absolute right-0 top-0 h-full border-r"></div>
          </div>
          <div className="relative flex-1 text-center text-gray-500 hover:text-black focus:text-black cursor-pointer">
            <span className="hover:underline focus:underline">
              Blog trả lời
            </span>
            <div className="absolute right-0 top-0 h-full border-r"></div>
          </div>
          <div className="flex-1 text-center text-gray-500 hover:text-black focus:text-black cursor-pointer">
            <span className="hover:underline focus:underline">
              Bài đăng lại
            </span>
          </div>
        </div>
        <div className="flex justify-between py-4 px-5">
          <div className="font-bold opacity-65">Hoàn tất trang cá nhân</div>
          <div className="font-normal opacity-70">Còn 3</div>
        </div>
        <hr />
        <div className="flex flex-col justify-center gap-4 p-4">
          <div className="flex gap-4 mx-2">
            <div className="cursor-pointer mt-2">
              <Avatar
                src={user?.avatar || "/avatar.png"}
                alt={user?.username}
                className="w-6"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-2">
                <div className="flex flex-1 justify-between">
                  <div className="flex gap-2 font-bold cursor-pointer">
                    wnhu293
                    <span className="opacity-15 font-normal">18 giờ</span>
                  </div>
                  <button className="rounded-full p-1 hover:bg-gray-300">
                    <EllipsisHorizontalIcon className="size-5" />
                  </button>
                </div>
                <p className="text-sm font-normal">tho bay mau</p>
                <div className="flex gap-2">
                  <img
                    src="https://intomau.com/Content/upload/images/tho-bay-mau-quan-khan.jpg"
                    alt=""
                    className="w-full h-72 rounded-lg"
                  />
                </div>
                <div className="flex gap-4">
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
        </div>
      </div>
      {isOpen && (
        <>
          <div
            className="bg-[#4b4b4b] fixed top-0 left-0 right-0 bottom-0 z-20 opacity-40"
            onClick={() => {
              setIsOpen(!isOpen);
              setName(user?.name || "");
            }}
          ></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 max-w-xl w-full ">
            <div className="max-w-xl">
              <h1 className="text-lg text-white font-bold text-center">
                Chỉnh sửa trang cá nhân
              </h1>
              <div className="flex justify-center  ">
                <div className="bg-white w-[540px] pb-6 rounded-3xl border shadow-lg ">
                  <div className="flex p-4">
                    <div className="flex flex-1 pb-2 ">
                      <div className="flex flex-1 flex-col mr-4">
                        <FormControl variant="standard">
                          <p className="font-semibold">Họ tên</p>
                          <Input
                            id="component-simple"
                            defaultValue={user?.name}
                            className="opacity-45"
                            onChange={(e) => setName(e.target.value)}
                          />
                        </FormControl>
                      </div>
                    </div>
                    <div onClick={handleFileUploadClick}>
                      <input
                        id="fileInput"
                        type="file"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                      {file ? (
                        <Avatar
                          alt={user?.username}
                          src={URL.createObjectURL(file)}
                          sx={{ width: 56, height: 56 }}
                        />
                      ) : (
                        <Avatar
                          alt={user?.username}
                          src={user?.avatar}
                          sx={{ width: 56, height: 56 }}
                        />
                      )}
                    </div>
                  </div>
                  <div className="flex">
                    <div className="flex flex-1 flex-col ml-4 mr-4 pb-2">
                      <FormControl variant="standard">
                        <p className="font-semibold">Tiểu sử </p>
                        <Input
                          id="component-simple"
                          placeholder="+ Viết tiểu sử"
                          className="opacity-45"
                          onChange={(e) => setBio(e.target.value)}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className="flex mt-3">
                    <div className="flex flex-1 flex-col ml-4 mr-4 pb-2">
                      <FormControl variant="standard">
                        <p className="font-semibold">Liên kết</p>
                        <Input
                          id="component-simple"
                          placeholder="+ Viết liên kết"
                          className="opacity-45"
                          onChange={(e) => setWebsite(e.target.value)}
                        />
                      </FormControl>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex-1 ml-4 mr-4 pb-2">
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          <DatePicker
                            label="Ngày sinh"
                            name="startDate"
                            value={value}
                            onChange={(newValue) => setValue(newValue)}
                          />
                        </DemoContainer>
                      </LocalizationProvider>
                    </div>
                    <div className="flex-1 mr-4">
                      <FormControl fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          Giới tính
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={gender}
                          label="gioi tinh"
                          onChange={(e) => setGender(e.target.value as string)}
                        >
                          <MenuItem value={"male"}>Nam</MenuItem>
                          <MenuItem value={"female"}>Nữ</MenuItem>
                          <MenuItem value={"other"}>
                            Không muốn tiết lộ
                          </MenuItem>
                        </Select>
                      </FormControl>
                    </div>
                  </div>
                  <div className="flex items-center justify-between ">
                    <div className="font-medium ml-4 ">
                      Trang cá nhân riêng tư
                    </div>
                    <Switch {...label} className="mr-4" />
                  </div>
                  <div className="text-center mt-4">
                    <button
                      className="bg-black text-white w-5/6 center border py-2 pb-2 rounded-md"
                      onClick={handleUpdateProfile}
                    >
                      Xong
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
