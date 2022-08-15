/* eslint-disable no-console */
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../components/theme";
import "styles/globals.css";

import { CssBaseline } from "@mui/material";
import NextNProgress from "nextjs-progressbar";

import { userService } from "services";
import { Alert, Nav } from "components";
import { NavBar } from "../components/NavBar";

export default App;

function App({ Component, pageProps }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => {
      console.log("memek");
      setAuthorized(false);
    };
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function authCheck(url) {
    // redirect to login page if accessing a private page and not logged in
    setUser(userService.userValue);
    const publicPaths = ["/account/login", "/account/register"];
    const path = url.split("?")[0];
    if (!userService.userValue && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/account/login",
        query: { "mau-kemana-dek": router.asPath },
      });
    } else {
      setAuthorized(true);
    }
  }

  return (
    <>
      <Head>
        <title>Siakad ITPA</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="og:description"
          content="Clone Siakad ITPA yang dibuat menggunakan ReactJs, NextJs dan JavaScript, tanpa adanya PHP"
        />
        <meta property="og:image" content="/static/siakad.png" />
        {/* eslint-disable-next-line @next/next/no-css-tags */}
        <link
          href="//netdna.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
          rel="stylesheet"
        />
        <link rel="icon" type="image/x-icon" href="/static/siakad.png" />
      </Head>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NextNProgress
          color="#FF0000"
          startPosition={0.3}
          stopDelayMs={200}
          height={2}
          showOnShallow={true}
          options={{ showSpinner: true }}
        />
        <div className={`app-container ${user ? "bg-light" : ""}`}>
          <Nav />
          <Alert />
          {authorized && <Component {...pageProps} />}
        </div>
      </ThemeProvider>
    </>
  );
}
