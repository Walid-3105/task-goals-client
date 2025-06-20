import { auth } from "@/Firebase/firebase.config";
import axios from "axios";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import React, { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();
const Provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Google sign in
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, Provider);
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
      if (currentUser?.email) {
        const user = { email: currentUser.email };
        axios.post("https://task-goals-server.onrender.com/jwt", user, {
          withCredentials: true,
        });
        // .then((data) => console.log(data.data));
        setLoading(false);
      } else {
        axios.post(
          "https://task-goals-server.onrender.com/logout",
          {},
          {
            withCredentials: true,
          }
        );
        // .then((res) => console.log("logOut token", res.data));
        setLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const AuthInfo = {
    user,
    loading,
    signInWithGoogle,
    logOut,
  };
  return (
    <AuthContext.Provider value={AuthInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
