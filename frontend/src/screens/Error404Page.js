import React from "react";
import { Link } from "react-router-dom";
function Error404Page() {
  return (
    <div className="page__notFound">
      <h1>Page not Found</h1>
      <Link to='/'>
        <p> Go to home </p>
      </Link>
    </div>
  );
}

export default Error404Page;
