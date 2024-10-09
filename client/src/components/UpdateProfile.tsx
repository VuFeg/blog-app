import {
  Avatar,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Switch,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { useUsersStore } from "../store/usersStore";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { User } from "../types/user.type";

interface UpdateProfileProps {
  user: User;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const UpdateProfile = ({
  user,
  isOpen,
  setIsOpen,
}: UpdateProfileProps) => {
  const [file, setFile] = useState<File | null>(null);

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

  const { updateProfile, uploadAvatar } = useUsersStore();

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
                      sx={{ width: 56, height: 56, cursor: "pointer" }}
                    />
                  ) : (
                    <Avatar
                      alt={user?.username}
                      src={user?.avatar}
                      sx={{ width: 56, height: 56, cursor: "pointer" }}
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
                      <MenuItem value={"other"}>Không muốn tiết lộ</MenuItem>
                    </Select>
                  </FormControl>
                </div>
              </div>
              <div className="flex items-center justify-between ">
                <div className="font-medium ml-4 ">Trang cá nhân riêng tư</div>
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
  );
};
