import "@/styles/globals.css";

// internal imports
import { NavBar, Footer } from "../../Components";

export default function App({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
      <Footer />
    </>
  ) 
}
