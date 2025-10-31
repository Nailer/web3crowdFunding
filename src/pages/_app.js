import "@/styles/globals.css";
import { useRouter } from "next/router";
// internal imports
import { NavBar, Footer } from "../../Components";
import Head from "next/head";
import { CrowdFundingProvider } from "../../Context/CrowdFunding";

export const runtime = "edge";

export const metadata = {
  title: "Home",
  description: "testing",
};

function App({ Component, pageProps }) {
  const router = useRouter();
  const isConnectPage = router.pathname === "/connect";

  return (
    <>
      <Head>
        <title>Fundora | Empowering Transparent Crowdfunding</title>
        <meta
          name="description"
          content="Fundora — a decentralized crowdfunding platform built on Hedera for transparent fundraising and empowerment."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <CrowdFundingProvider>
        {isConnectPage && <NavBar />}
        <Component {...pageProps} />
        {isConnectPage && <Footer />}
      </CrowdFundingProvider>
    </>
  );
}

export default App;
