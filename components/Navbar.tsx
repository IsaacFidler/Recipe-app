import React, { useContext, useState } from "react";
import Link from "next/link";
import styles from "../styles/Navbar.module.scss";
import { UserContext } from "../lib/context";
import { auth } from "../lib/firebase";
import router from "next/router";
import { BsPencil } from "react-icons/bs";
import Image from "next/image";
import { AiOutlineHome } from "react-icons/ai";

type Props = {};

const Navbar = ({}: Props) => {
  const { user, username } = useContext(UserContext);

  const signOut = () => {
    auth.signOut();
    router.reload();
  };
  return (
    <nav className={styles.navbar}>
      <ul>
        <li>
          <Link href="/" passHref>
            <button className={styles.buttonBlue}>
              <AiOutlineHome />
            </button>
          </Link>
        </li>
        {username && (
          <>
            {/* // javascript switch case to show different form in each step */}

            <li className={styles.pushLeft}>
              <Link href="/admin" passHref>
                <button className={styles.buttonBlue}>
                  <BsPencil />
                </button>
              </Link>
            </li>
            <li className={styles.pushLeft}>
              <button onClick={signOut}>Sign Out</button>
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
