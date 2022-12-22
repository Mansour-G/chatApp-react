import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, getDoc, serverTimestamp, updateDoc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const handelSubmit = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;
    const password = e.target[1].value;

    // try {
    //   await signInWithEmailAndPassword(auth, email, password);

    //   // await setDoc(doc(db, "userChats", res.user.uid), {}); //database for user's chats
    //   const res = await getDoc(doc(db, "userChats", currentUser.uid));

    //   if (!res.exists()) {
    //     await updateDoc(doc(db, "userChats", currentUser.uid), {
    //       [currentUser + ".userInfo"]: {
    //         uid: currentUser.uid,
    //         displayName: currentUser.displayName,
    //         photoURL: currentUser.photoURL,
    //       },
    //       [currentUser + ".date"]: serverTimestamp(),
    //     });
    //   }

    //   navigate("/");
    //   // setError(false);
    // } catch (error) {
    //   setError(true);
    // }
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      error(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">MG Chat</span>
        <span className="title">Sign in</span>
        <form action="" onSubmit={handelSubmit}>
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <button>Sign in</button>
          {error && <span>something went wrong {error}</span>}
          {/* {error && <span>something went wrong</span>} */}
        </form>
        <p>
          You don't have an account? <Link to="/register">Register</Link>{" "}
        </p>
      </div>
    </div>
  );
}

export default Login;
