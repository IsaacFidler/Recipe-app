import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/Modal.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
type Props = {
  isOpen: boolean;
  openModal: any;
  closeModal: any;
};

const Modal = ({ isOpen, openModal, closeModal }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  // const onSubmit = (e: any) => {
  //   signInWithEmail();
  // };
  const onSubmit = (data: any) => {
    console.log(data.email);
    console.log(data.password);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
    closeModal();
  };

  const signInWithEmail = async () => {
    const auth = getAuth();
  };
  return (
    <div
      className={styles.modalContainer}
      style={{ display: isOpen ? "flex" : "none", flexDirection: "column" }}
    >
      <button onClick={closeModal} className={styles.closeButton}>
        <AiOutlineClose />
      </button>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <input defaultValue="test" {...register("email")} />

          {/* include validation with required or other standard HTML validation rules */}
          <input
            type={"password"}
            {...register("password", { required: true })}
          />
          {/* errors will return when field validation fails  */}
          {errors.exampleRequired && <span>This field is required</span>}

          <input type="submit" />
        </form>
      </div>
    </div>
  );
};

export default Modal;
