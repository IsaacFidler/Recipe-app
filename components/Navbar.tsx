import React, { useContext } from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.scss";
import { UserContext } from "../lib/context";

type Props = {};

const Navbar = ({}: Props) => {
  const { user, username } = useContext(UserContext);
  console.log(username);
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link href="/" passHref>
            <button className={styles.buttonLogo}>FEED</button>
          </Link>
        </li>
        {/* user is signed in and has a username */}
        {username && (
          <>
            <li className={styles.pushLeft}>
              <Link href="/admin" passHref>
                <button className={styles.buttonBlue}>Write Recipe</button>
              </Link>
            </li>
            <li>
              <Link href={`/${username}`} passHref>
                <img src={user?.photoURL}></img>
              </Link>
            </li>
          </>
        )}
        {/* user is not signed or has not created username */}
        {!username && (
          <li>
            <Link href="/enter" passHref>
              <button className={styles.buttonBlue}>Log In</button>
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
