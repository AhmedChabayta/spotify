import { SessionProvider } from "next-auth/react";
import "../styles/globals.css";
import { RecoilRoot } from "recoil";
import { useEffect, useState } from "react";
import GlobalStyles from "../components/GlobalStyles";
import Layout from "../components/Layout";

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Layout>
          <GlobalStyles />
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </SessionProvider>
  );
}

export default MyApp;
