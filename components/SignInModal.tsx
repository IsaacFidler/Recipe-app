import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/Modal.module.scss";
import { AiOutlineClose } from "react-icons/ai";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from "firebase/auth";
type Props = {
  isOpen: boolean;
  openModal: any;
  closeModal: any;
};

const Modal = ({ isOpen, openModal, closeModal }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, data.email, data.password)
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

  return (
    <div
      className={styles.modalContainer}
      style={{ display: isOpen ? "flex" : "none", flexDirection: "column" }}
    >
      <button onClick={() => closeModal()} className={styles.closeButton}>
        <AiOutlineClose />
      </button>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <label>Email2</label>
        <input className={styles.input} {...register("email")} />
        <label>Password</label>
        <input
          className={styles.input}
          type={"password"}
          {...register("password", { required: true })}
        />
        {/* errors will return when field validation fails */}
        {errors.exampleRequired && <span>This field is required</span>}
        <input className={"button1"} type="submit" />
      </form>
    </div>
  );
};

export default Modal;
