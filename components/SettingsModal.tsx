import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/SettingsModal.module.scss";
import { getStorage, ref, uploadBytes } from "firebase/storage";

import { AiOutlineClose } from "react-icons/ai";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth } from "../lib/firebase";
type Props = {
  user: any;
  isOpen: any;
  openModal: any;
  closeModal: any;
};

const SettingsModal = ({ user, isOpen, openModal, closeModal }: Props) => {
  console.log(isOpen);
  const { register, handleSubmit } = useForm();
  const uid = auth.currentUser!.uid;
  const onSubmit = (data: any) => {
    // Create a root reference
    const storage = getStorage();

    const file = data.picture[0];
    const fileName = file.name;
    // Create a reference to 'mountains.jpg'
    const storageRef = ref(storage, `${uid}/profilePicture/${fileName}`);
    // 'file' comes from the Blob or File API

    // console.log(file);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  };

  console.log(user.uid);
  return (
    <div
      className={"modalContainer"}
      style={{ display: isOpen ? "flex" : "none" }}
    >
      <h1>Settings</h1>
      <button onClick={closeModal} className={styles.closeButton}>
        <AiOutlineClose />
      </button>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("picture")} type="file" />
        <button className="button1">Submit</button>
      </form>
    </div>
  );
};

export default SettingsModal;
