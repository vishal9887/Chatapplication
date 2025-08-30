import React, { useContext, useState } from "react";
import Sidebar from "../components/Sidebar";
import ChatContainer from "../components/ChatContainer";
import RightSidebar from "../components/RightSidebar";
import { ChatContext } from "../../context/ChatContext";

const HomePage = () => {
  const { selectedUser } = useContext(ChatContext);

  return (
    <div className="w-full h-screen max-sm:p-0 sm:px-[5%] md:px-[10%] lg:px-[15%] sm:py-[2%] md:py-[3%] lg:py-[5%]">
      <div
        className={`backdrop-blur-xl max-sm:border-0 border-2 border-gray-600 rounded-2xl max-sm:rounded-none overflow-hidden h-[100%] grid grid-cols-1 relative ${
          selectedUser
            ? "md:grid-cols-[1.2fr_2fr_1fr] lg:grid-cols-[1fr_2fr_1fr]"
            : "md:grid-cols-[1.2fr_2fr]"
        }`}
      >
        <Sidebar />
        <ChatContainer />
        <RightSidebar />
      </div>
    </div>
  );
};

export default HomePage;
