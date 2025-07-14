import "@/styles/globals.css";

// internal imports
import { NavBar, Footer } from "../../Components";
import { CrowdFundingProvider } from "../../Context/CrowdFunding"

export const runtime = "edge";

function App({ Component, pageProps }) {
  return (
    <>
      <CrowdFundingProvider>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </CrowdFundingProvider>
    </>
  ) 
}

export default App;
