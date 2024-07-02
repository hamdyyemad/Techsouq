import React from "react";
import { Navigate, useParams } from "react-router-dom";

export default function RedirectComponent({ to }) {
  const [isRedirecting, setRedirecting] = React.useState(true);
  const { pageNumber } = useParams();
  let href = "";

  if (pageNumber) {
    href = to + pageNumber;
  } else {
    href = to + "1";
  }

  React.useEffect(() => {
    // Simulate a delay for demonstration purposes
    const delay = setTimeout(() => {
      setRedirecting(false);
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  return isRedirecting ? (
    <>
      <div className="h-screen w-fit mx-auto flex items-center justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          className="bi bi-fast-forward-circle-fill w-[100px] h-[100px] text-green-600 animate-pulse"
          viewBox="0 0 16 16"
        >
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16M4.79 5.093 8 7.386V5.5a.5.5 0 0 1 .79-.407l3.5 2.5a.5.5 0 0 1 0 .814l-3.5 2.5A.5.5 0 0 1 8 10.5V8.614l-3.21 2.293A.5.5 0 0 1 4 10.5v-5a.5.5 0 0 1 .79-.407" />
        </svg>
      </div>
    </>
  ) : (
    <Navigate to={href} replace />
  );
}
