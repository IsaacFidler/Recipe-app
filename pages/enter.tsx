import React, { useCallback, useContext, useEffect, useState } from "react";
import type { NextPage } from "next";
import {
  auth,
  emailAuthProvider,
  firestore,
  googleAuthProvider,
} from "../lib/firebase";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import styles from "../styles/enter.module.scss";
import { UserContext } from "../lib/context";
import { debounce } from "lodash";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineMail } from "react-icons/ai";
import Onboarding1 from "../components/Onboarding1";
import Modal from "../components/Modal";
import SignInModal from "../components/SignInModal";
const EnterPage: NextPage = ({}) => {
  // 1. user signed out <SignInButton/>
  // 2. user signed in , but missing username <UsernameForm/>
  // 3. user signed in, has username <SignOutButton/>
  const { user, username } = useContext(UserContext);

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

export default EnterPage;

const SignInButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);

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

  const openModal = () => {
    setIsModalOpen(true);
  };
  const openModal2 = () => {
    setIsModalOpen2(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeModal2 = () => {
    setIsModalOpen2(false);
  };

  return (
    <div>
      <Modal
        isOpen={isModalOpen}
        openModal={openModal}
        closeModal={closeModal}
      />
      <SignInModal
        isOpen={isModalOpen2}
        openModal={openModal2}
        closeModal={closeModal2}
      />
      <div style={{ filter: isModalOpen ? "blur(8px)" : "blur(0px)" }}>
        <button className={"button2"} onClick={signInWithGoogle}>
          <FcGoogle />
          &nbsp; Sign in with Google
        </button>
        <button className={"button2"} onClick={openModal}>
          <AiOutlineMail />
          &nbsp; Sign up with email
        </button>
        <h1>Already have an account?</h1>
        <button className={"button2"} onClick={openModal2}>
          <AiOutlineMail />
          &nbsp; Sign in with email
        </button>
      </div>
    </div>
  );
};

const UsernameForm = () => {
  const [formValue, setFormValue] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const [step, setstep] = useState(1);
  const [formData, setFormData] = useState({
    displayName: "",
    firstName: "",
    lastName: "",
    company: "",
    farmName: "",
    regen: "",
    age: "",
    email: "",
  });

  console.log(setstep);
  // function for going to next step by increasing step state by 1
  const nextStep = () => {
    setstep(step + 1);
  };

  // function for going to previous step by decreasing step state by 1
  const prevStep = () => {
    setstep(step - 1);
  };

  // handling form input data by taking onchange value and updating our previous form data state
  const handleInputData = (input: any) => (e: any) => {
    // input value from the form
    const { value } = e.target;

    //updating for data state taking previous state and then adding new value to create new object
    setFormData((prevState) => ({
      ...prevState,
      [input]: value,
    }));
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    // Create refs for both documents
    const userDoc = doc(firestore, `users/${user.uid}`);
    const usernameDoc = doc(firestore, `usernames/${formValue}`);

    // Commit both docs together as a batch write.
    const batch = writeBatch(firestore);

    batch.set(userDoc, {
      username: formValue,
      photoURL: user.photoURL,
      displayName: `${formData.firstName} ${formData.lastName}`,
      firstName: formData.firstName,
      lastName: formData.lastName,
      company: formData.company,
      farmName: formData.farmName,
      regen: formData.regen,
    });

    batch.set(usernameDoc, { uid: user.uid });

    await batch.commit();
  };

  const onChange = (e: any) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  const checkUsername = useCallback(
    debounce(async (username: any) => {
      if (username.length >= 3) {
        const ref = doc(firestore, `usernames/${username}`);
        const docSnap = await getDoc(ref);

        setIsValid(!docSnap.exists());
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue, checkUsername]);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work

  if (!username) {
    switch (step) {
      // case 1 to show stepOne form and passing nextStep, prevStep, and handleInputData as handleFormData method as prop and also formData as value to the fprm
      case 1:
        return (
          <div className="App">
            <Onboarding1
              nextStep={nextStep}
              prevStep={prevStep}
              handleFormData={handleInputData}
              values={formData}
            />
          </div>
        );

      case 2:
        return (
          <section>
            <h3>Choose Username</h3>
            <form onSubmit={onSubmit}>
              <input
                name="username"
                placeholder="myname"
                value={formValue}
                onChange={onChange}
              />
              <UsernameMessage
                username={formValue}
                isValid={isValid}
                loading={loading}
                className={styles.usernameMessage}
              />
              <button type="submit" className="btn-green" disabled={!isValid}>
                Choose
              </button>

              <h3>Debug State</h3>
              <div>
                Username: {formValue}
                <br />
                Loading: {loading.toString()}
                <br />
                Username Valid: {isValid.toString()}
              </div>
            </form>
          </section>
        );
      // default case to show nothing
      default:
        return <div className="App"></div>;
    }
  } else {
    return <></>;
  }
};

const SignOutButton = () => {
  return <button onClick={() => auth.signOut()}>Sign Out</button>;
};

function UsernameMessage({ username, isValid, loading }: any) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}
