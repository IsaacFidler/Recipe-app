import React, { useState } from "react";
import { FiSettings } from "react-icons/fi";
import styles from "../styles/UserProfile.module.scss";
import SettingModal from "./SettingsModal";

type Props = { user: any };

export default function UserProfile({ user }: Props) {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const closeModal = () => {
    setSettingsOpen(false);
  };
  return (
    <div className="userProfileContainer">
      <img src={user.photoURL || "/hacker.png"} className="card-img-center" />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName || "Anonymous User"}</h1>
      <FiSettings onClick={() => setSettingsOpen(true)} />
      <SettingModal
        user={user}
        isOpen={settingsOpen}
        openModal={undefined}
        closeModal={closeModal}
      />
    </div>
  );
}
