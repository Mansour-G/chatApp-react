import React from "react";
import ChatPanel from "../components/ChatPanel/ChatPanel";
import Sidebar from "../components/Sidebar/Sidebar";
const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <ChatPanel />
      </div>
    </div>
  );
};

export default Home;
