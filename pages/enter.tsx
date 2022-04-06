import type { NextPage } from "next";
import { auth, googleAuthProvider } from "../lib/firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import styles from "../styles/enter.module.scss";
const enterPage: NextPage = ({}) => {
  // 1. user signed out <SignInButton/>
  // 2. user signed in , but missing username <UsernameForm/>
  // 3. user signed in, has username <SignOutButton/>
  const user = null;
  const username = null;
  return (
    <main>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
};

export default enterPage;

const SignInButton = () => {
  const signInWithGoogle = async () => {
    const auth = getAuth();
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
        }
        // The signed-in user info.
        const user = result.user;
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <button className={styles.buttonGoogle} onClick={signInWithGoogle}>
      sign in with google
    </button>
  );
};

const UsernameForm = () => {
  return null;
};

const SignOutButton = () => {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
};
