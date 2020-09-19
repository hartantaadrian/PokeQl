import React from "react";

import logo from "../assets/Images/Logo.jpg";

function NavBar(props) {
  return (
    <React.Fragment>
      <nav className="navbar navbar-light bg-light">
        <a className="navbar-brand" href="/">
          <img
            src={logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt=""
          />
          PokeQL
        </a>
      </nav>
      <main>{props.children}</main>
    </React.Fragment>
  );
}

export default NavBar;
