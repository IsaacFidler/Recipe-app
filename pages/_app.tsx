import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Navbar from "../components/NavBar";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />;
      <Toaster />
    </>
  );
}

export default MyApp;
