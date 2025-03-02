import React, { useReducer } from "react";

const initialState = { theme: "dark" };

const toggleReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_THEME":
      return { theme: state.theme === "dark" ? "light" : "dark" };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(toggleReducer, initialState);

  return (
    <div
      style={{
        backgroundColor: state.theme === "dark" ? "#333" : "#fff",
        color: state.theme === "dark" ? "#fff" : "#000",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <h1>{state.theme === "dark" ? "Dark Mode" : "Light Mode"}</h1>
      <button onClick={() => dispatch({ type: "TOGGLE_THEME" })}>
        Toggle Theme
      </button>
    </div>
  );
};

export default App;
