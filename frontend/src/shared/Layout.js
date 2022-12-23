import React from "react";
import { useRouteMatch } from "react-router-dom";
import NavBar from "../components/NavBar";

function Layout(props) {
  const match = useRouteMatch();

  return (
    <>
      <NavBar url={match.url} />
      <div className='main'>
        <div className='container-fluid'>{props.children}</div>
      </div>
    </>
  );
}

export default Layout;
