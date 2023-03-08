import React from "react";

const ErrorPage = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div
        style={{
          padding: "50px",
          fontSize: "40px",
          fontWeight: "600",
        }}
      >
        !ERROR!
      </div>
    </div>
  );
};

export default ErrorPage;
