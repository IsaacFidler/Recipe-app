import { doc, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "./firebase";

export const useUserData = () => {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);
  useEffect(() => {
    //turn off realtime subscription
    let unsubscribe;

    if (user) {
      unsubscribe = onSnapshot(doc(firestore, "users", user.uid), (doc) => {
        console.log("Current data: ", doc.data());
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }
  }, [user]);

  return { user, username };
};
