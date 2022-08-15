import { useState, useEffect } from "react";
import Head from "next/head";
import { NavLink } from ".";
import { userService } from "services";

export { Nav };

function Nav() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscription = userService.user.subscribe((x) => setUser(x));
    return () => subscription.unsubscribe();
  }, []);

  function logout() {
    userService.logout();
  }

  // only show nav when logged in
  if (!user) return null;

  return (
    <>
      <Head>
        <title>Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta
          name="og:description"
          content="Clone Siakad ITPA yang dibuat menggunakan ReactJs, NextJs dan JavaScript, tanpa adanya PHP"
        />
      </Head>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav">
          <NavLink href="/" exact className="nav-item nav-link">
            Home
          </NavLink>
          <NavLink href="/data" className="nav-item nav-link">
            Data
          </NavLink>
          <a onClick={logout} className="nav-item nav-link">
            Logout
          </a>
        </div>
      </nav>
    </>
  );
}
