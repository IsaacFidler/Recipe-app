import React from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.scss";

type Props = {};

const Navbar = ({}: Props) => {
  const user = null;
  const username = null;
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link href="/">
            <button className={styles.buttonLogo}>FEED</button>
          </Link>
        </li>
        {/* user is signed in and has a username */}
        {username && (
          <>
            <li className={styles.pushLeft}>
              <Link href="/admin">
                <button className={styles.buttonBlue}>Write Recipe</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`}>
                <img src={user?.photoURL}></img>
              </Link>
            </li>
          </>
        )}
        {/* user is not signed or has not created username */}
        {!username && (
          <li>
            <Link href="/enter">
              <button className={styles.buttonBlue}>Log In</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
