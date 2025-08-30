import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/ChatContext";
import { AuthContext } from "../../context/AuthContext";
import assets from "../assets/assets";

const RightSidebar = () => {
  const { selectedUser, messages } = useContext(ChatContext);
  const { logout, onlineUsers } = useContext(AuthContext);
  const [msgImages, setMsgImages] = useState([]);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  //get all the images from the messages and set them to state
  useEffect(() => {
    setMsgImages(messages.filter((msg) => msg.image).map((msg) => msg.image));
  }, [messages]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    // No need to set isLoggingOut to false as the component will unmount after logout
  };

  return (
    selectedUser && (
      <div
        className={`bg-[#8185B2]/10 text-white w-full relative overflow-y-scroll ${
          selectedUser ? "max-md:hidden" : ""
        }`}
      >
        <div className="pt-16 flex flex-col items-center gap-2 text-xs font-light mx-auto">
          <img
            src={selectedUser?.profilePic || assets.avatar_icon}
            alt=""
            className="w-20 aspect-[1/1] rounded-full"
          />
          <h1 className="px-10 text-xl font-medium mx-auto flex items-center gap-2">
            {onlineUsers.includes(selectedUser._id) && (
              <p className="w-2 h-2 rounded-full bg-green-500"></p>
            )}
            {selectedUser.fullName}
          </h1>
          <p className="px-10 mx-auto">{selectedUser.bio}</p>
        </div>
        <hr className="border-[#ffffff50] my-4" />
        <div className="px-5 text-sm">
          <p>Media</p>
          <div className="mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4 opacity-80">
            {msgImages.map((url, index) => (
              <div
                key={index}
                onClick={() => window.open(url)}
                className="cursor-pointer rounded"
              >
                <img src={url} alt="" className="h-full rounded-md" />
              </div>
            ))}
          </div>
        </div>
        <button
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="absolute bottom-5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none text-sm font-light py-2 px-20 rounded-full cursor-pointer flex items-center justify-center"
        >
          {isLoggingOut ? (
            <>
              <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent mr-2"></span>
              Logging out...
            </>
          ) : (
            "Logout"
          )}
        </button>
      </div>
    )
  );
};

export default RightSidebar;
