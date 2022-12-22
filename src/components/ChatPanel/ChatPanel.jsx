import React, { useContext } from "react";
import PersonAddTwoToneIcon from "@mui/icons-material/PersonAddTwoTone";
import VideoCameraFrontTwoToneIcon from "@mui/icons-material/VideoCameraFrontTwoTone";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Messages from "./Messages";
import InputPanel from "./InputPanel";
import { ChatContext } from "../../context/ChatContext";

const ChatPanel = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user.displayName}</span>
        <div className="chatIcon">
          <span>
            <VideoCameraFrontTwoToneIcon sx={{ fontSize: 23 }} />
          </span>
          <span>
            <PersonAddTwoToneIcon sx={{ fontSize: 23 }} />
          </span>
          <span>
            <MoreVertIcon sx={{ fontSize: 23 }} />
          </span>
        </div>
      </div>
      <Messages />
      <InputPanel />
    </div>
  );
};

export default ChatPanel;
