import { useState } from "react";

import "./App.css";
import useCookie from "./utils/UseCookie";

function App() {
  const [value, setCookies, deleteCookie] = useCookie("my-cookie");

  console.log("coookier", value);

  const handleSetCookies = () => {
    setCookies("Hello");
  };
  const handleDeleteCookies = () => {
    deleteCookie();
  };

  return (
    <>
      <div></div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => handleSetCookies()}>SET</button>
        <button onClick={() => handleDeleteCookies()}>Delete</button>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
