import React from "react";
import CatQuery from "./components/CatQuery";
import StudentsQuery from "./components/StudentsQuery";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>CatAPI GraphQL Frontend 🧠</h1>
      <CatQuery />
      <hr />
      <StudentsQuery />
    </div>
  );
}

export default App;
