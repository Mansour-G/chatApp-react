import React, { useContext, useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import { doc, onSnapshot } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { db } from "../../firebase";
import { ChatContext } from "../../context/ChatContext";

const Chats = () => {
  const [chats, setChats] = useState([]);

  const { currentUser } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  // console.log(Object.entries(chats));

  const handelSelector = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };

  return (
    <div className="chats">
      {Object.entries(chats).map((chat) => (
        <div
          className="userChat"
          onClick={() => handelSelector(chat[1].userInfo)}
        >
          <Avatar
            src={chat[1].userInfo.photoURL}
            alt={chat[1].userInfo.displayName}
            sx={{
              background: "rgb(5, 94, 129)",
              width: "30px",
              height: "30px",
              fontSize: "15px",
            }}
          />
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            {/* <p>{chat[1].lastMessage}</p> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Chats;

{
  /* {Object.entries(chats)
    ?.sort((a, b) => b[1].date - a[1].date)
  .map((chat) => (
    <div
      className="userChat"
      key={chat[0]}
      // onClick={() => handleSelect(chat[1].userInfo)}
    >
    <img src={chat[1].userInfo.photoURL} alt="" />
    <div className="userChatInfo">
    <span>{chat[1].userInfo.displayName}</span>
    <p>{chat[1].lastMessage?.text}</p>
    </div>
    </div>
    ))} */
}
