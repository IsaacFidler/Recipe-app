import React from "react";
type Props = { user: any };

export default function UserProfile({ user }: Props) {
  return (
    <div className="userProfileContainer">
      <img src={user.photoURL || "/hacker.png"} className="card-img-center" />
      <p>
        <i>@{user.username}</i>
      </p>
      <h1>{user.displayName || "Anonymous User"}</h1>
    </div>
  );
}
