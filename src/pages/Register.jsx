import React, { useState } from "react";
import Avatar from "@mui/icons-material/AddPhotoAlternateRounded";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handelSubmit = async (e) => {
    e.preventDefault();

    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const storageRef = ref(storage, displayName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        (error) => {
          // Handle unsuccessful uploads
          setError(error);
        },
        // Handle successful uploads on complete
        () => {
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            console.log("File available at", downloadURL);
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            // Set the database
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {}); //database for user's chats
            navigate("/");
          });
        }
      );
      // To see your percentag upload //
      // "state_changed",
      // (snapshot) => {
      //   // Observe state change events such as progress, pause, and resume
      //   // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      //   const progress =
      //     (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //   console.log("Upload is " + progress + "% done");
      //   switch (snapshot.state) {
      //     case "paused":
      //       console.log("Upload is paused");
      //       break;
      //     case "running":
      //       console.log("Upload is running");
      //       break;
      //   }
      // },
    } catch (error) {
      setError(true);
    }
  };

  // const handelSubmit = async (e) => {
  //   e.preventDefault();

  //   const displayName = e.target[0].value;
  //   const email = e.target[1].value;
  //   const password = e.target[2].value;
  //   const file = e.target[3].files[0];

  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((userCredential) => {
  //       // Signed in
  //       const user = userCredential.user;
  //       console.log(user);
  //       // ...
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       // ..
  //     });
  // };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">MG Chat</span>
        <span className="title">Register</span>
        <form action="" onSubmit={handelSubmit}>
          <input type="text" placeholder="text" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <Avatar
              // fontSize="73px"
              sx={{ color: "rgb(5, 94, 129)", fontSize: "40px" }}
            />
            <span>Add an avatar</span>
          </label>
          <button>Sign up</button>
          {error && <span>something went wrong {error}</span>}
          {/* {error && <span>something went wrong</span>} */}
        </form>
        <p>
          You do have an account?<Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
