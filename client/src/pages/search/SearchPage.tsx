import { Avatar } from "@mui/material";
import { useUsersStore } from "../../store/usersStore";
import { useEffect, useState } from "react";
import { User } from "../../types/user.type";
import { SearchSkeleton } from "../../components/skeleton/SearchSkeleton";

export const SearchPage = () => {
  const [userSuggests, setUserSuggests] = useState<User[]>([]);
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [search, setSearch] = useState("");

  const { user, getUserSuggests, searchUser, followUser, gettingUserSuggests, searchingUser } = useUsersStore();

  useEffect(() => {
    const fetchUserSuggests = async () => {
      const data = await getUserSuggests();

      setUserSuggests(data);
    };

    fetchUserSuggests();
  }, []);
  const handleFollow = async (user: User) => {
    await followUser(user._id);
  };
  const handleSearch = async () => {
    const data = await searchUser(search);
    setSearchResults(data);
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-t-3xl border shadow-lg min-h-screen mt-24 md:mt-8">
      <div className="flex flex-col justify-center">
        <div className="p-6 rounded-lg">
          <div className="relative">
            <button
              className="absolute inset-y-0 right-0 flex items-center px-4 text-gray-500"
              onClick={handleSearch}
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35M16.65 12A6.65 6.65 0 1 1 12 5.35a6.65 6.65 0 0 1 4.65 6.65z"
                />
              </svg>
            </button>
            <input
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Tìm kiếm"
              className="bg-gray-100 w-full px-4 py-2 pr-12 border rounded-2xl focus:outline-none"
            />
          </div>
        </div>
        <div className="ml-6 opacity-30">
          <b>Gợi ý theo dõi</b>
        </div>
        {gettingUserSuggests && (<SearchSkeleton/>)}
        {searchingUser && (<SearchSkeleton/>)}
        {searchResults.length === 0
          ? userSuggests?.map((userSuggest) => (
              <div key={userSuggest._id} className="flex gap-5 pl-5 pt-6">
                <Avatar
                  src={userSuggest.avatar || "/avatar.png"}
                  className="mt-2"
                />
                <div className=" flex flex-col flex-1 border-b pb-2 pr-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold">{userSuggest.username}</div>
                      <div className="opacity-50 font-normal">
                        {userSuggest.name}
                      </div>
                    </div>
                    {userSuggest.followers?.some(
                      (item) => item.user_id === user._id
                    ) ? (
                      <button
                        onClick={() => handleFollow(userSuggest)}
                        className="font-semibold border px-4 py-1 rounded-xl border-gray-500 text-gray-400"
                      >
                        Đang theo dõi
                      </button>
                    ) : (
                      <button
                        onClick={() => handleFollow(userSuggest)}
                        className="font-semibold border px-4 py-1 rounded-xl border-gray-500"
                      >
                        Theo dõi
                      </button>
                    )}
                  </div>
                  <div className="mt-2">
                    {userSuggest.followers?.length} người theo dõi
                  </div>
                </div>
              </div>
            ))
          : searchResults?.map((userSearch) => (
              <div key={userSearch._id} className="flex gap-5 pl-5 pt-6">
                <Avatar
                  src={userSearch.avatar || "/avatar.png"}
                  className="mt-2"
                />
                <div className=" flex flex-col flex-1 border-b pb-2 pr-5">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="font-bold">{userSearch.username}</div>
                      <div className="opacity-50 font-normal">
                        {userSearch.name}
                      </div>
                    </div>
                    {userSearch.followers?.some(
                      (item) => item._id === user._id
                    ) ? (
                      <button
                        onClick={() => handleFollow(userSearch)}
                        className="font-semibold border px-4 py-1 rounded-xl border-gray-500 text-gray-400"
                      >
                        Đang theo dõi
                      </button>
                    ) : (
                      <button
                        onClick={() => handleFollow(userSearch)}
                        className="font-semibold border px-4 py-1 rounded-xl border-gray-500"
                      >
                        Theo dõi
                      </button>
                    )}
                  </div>
                  <div className="mt-2">
                    {userSearch.followers?.length} người theo dõi
                  </div>
                </div>
              </div>
            ))}
      </div>
    </div>
  );
};
