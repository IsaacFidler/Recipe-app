import React, { useState } from "react";
import { FiSettings } from "react-icons/fi";
import styles from "../styles/UserProfile.module.scss";
import SettingModal from "./SettingsModal";

type Props = { user: any };

export default function UserProfile({ user }: Props) {
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <SettingModal
        user={user}
        isOpen={settingsOpen}
        openModal={undefined}
        settingOpen={setSettingsOpen}
      />
      <div
        style={{ filter: settingsOpen ? "blur(8px)" : "blur(0px)" }}
        className="userProfileContainer"
      >
        <div></div>
        <img src={user.photoURL || "/hacker.png"} className="card-img-center" />
        <p>
          <i>@{user.username}</i>
        </p>
        <h1>{user.displayName || "Anonymous User"}</h1>
        <FiSettings
          className={styles.settingsButton}
          onClick={() => setSettingsOpen(true)}
        />
      </div>
    </>
  );
}

{
  /* <h1 style={{ display: uploading ? "flex" : "none" }}>Loading .....</h1>
      {downloadURL && (
        <code className="upload-snippet">{`![alt](${downloadURL})`}</code>
      )} */
}
{
  /* <button onClick={() => settingOpen(false)} className="button1">
        <AiOutlineClose className={styles.closeButton} />
      </button> */
}
