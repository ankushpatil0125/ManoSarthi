import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-semibold text-red-500">404</h1>
        <p className="mb-4 text-lg text-gray-600">Oops! Looks like you're lost.</p>

        <p className="mt-4 text-gray-600">
          Let's get you back{" "}
          <Link to="/" className="text-blue-500">
            home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
