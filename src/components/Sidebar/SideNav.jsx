import { Avatar } from "@mui/material";
import { signOut } from "firebase/auth";
import React from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

const SideNav = () => {
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  // console.log(currentUser);

  const logOut = () => {
    signOut(auth);
    navigate("/login");
  };

  return (
    <div className="navbar">
      <span className="logo">MG Chat</span>
      <div className="user">
        <Avatar
          src={currentUser.photoURL}
          alt={currentUser.displayName}
          sx={{
            background: "rgb(5, 94, 129)",
            width: "30px",
            height: "30px",
            fontSize: "15px",
          }}
        />

        <span>{currentUser.displayName}</span>
        <button onClick={logOut}>logout</button>
      </div>
    </div>
  );
};

export default SideNav;
