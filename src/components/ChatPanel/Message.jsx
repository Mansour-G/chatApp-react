import React, { useContext, useEffect, useRef } from "react";
import { Avatar } from "@mui/material";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

const Message = ({ message }) => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      {/* <div className="message owner"> */}
      <div className="messageInfo">
        <Avatar
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt={
            message.senderId === currentUser.uid
              ? currentUser.displayName
              : data.user.displayName
          }
          sx={{
            background: "rgb(5, 94, 129)",
            width: "30px",
            height: "30px",
            fontSize: "15px",
          }}
        />
        <span>just now</span>
      </div>

      <div className="messageContent">
        <p>{message.text}</p>
        {message.img && <img src={message.img} alt="" />}
      </div>
    </div>
  );
};

export default Message;
