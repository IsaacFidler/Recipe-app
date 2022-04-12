import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/SettingsModal.module.scss";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

import { AiOutlineClose } from "react-icons/ai";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { auth, firestore } from "../lib/firebase";
import toast from "react-hot-toast";
import { doc, writeBatch } from "firebase/firestore";

type Props = {
  user: any;
  isOpen: any;
  openModal: any;
  settingOpen: any;
};

const SettingsModal = ({ user, isOpen, openModal, settingOpen }: Props) => {
  const [uploading, setUploading] = useState(false);
  const [downloadURL, setDownloadURl] = useState<any>(null);

  const { register, handleSubmit } = useForm();
  const uid = auth.currentUser!.uid;
  const onSubmit = async (data: any) => {
    setUploading(true);
    // Create a root reference
    const storage = getStorage();

    const file = data.picture[0];
    const fileName = file.name;
    // Create a reference to 'mountains.jpg'
    const storageRef = ref(storage, `${uid}/${fileName}`);
    // 'file' comes from the Blob or File API

    // console.log(file);
    await uploadBytes(storageRef, file).then((snapshot) => {
      toast("File uploaded!");
    });

    setUploading(true);

    getDownloadURL(ref(storage, `${uid}/${fileName}`))
      .then((url) => {
        setDownloadURl(url);
      })
      .catch((error) => {
        // Handle any errors
      });

    settingOpen(false);
  };

  console.log(user.uid);
  return (
    <div
      className={"modalContainer"}
      style={{ display: isOpen ? "flex" : "none" }}
    >
      <h1>Settings</h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("picture")} type="file" />
        <button className="button1">Submit</button>
      </form>
      <h1 style={{ display: uploading ? "flex" : "none" }}>Loading .....</h1>
      {downloadURL && (
        <code className="upload-snippet">{`![alt](${downloadURL})`}</code>
      )}
      <button onClick={() => settingOpen(false)} className="button1">
        <AiOutlineClose className={styles.closeButton} />
      </button>
    </div>
  );
};

export default SettingsModal;
