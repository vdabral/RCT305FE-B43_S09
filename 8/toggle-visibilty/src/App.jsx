import React, { useReducer } from "react";
import "./App.css";

const initialState = { isVisible: false };

const visibilityReducer = (state, action) => {
  switch (action.type) {
    case "TOGGLE_VISIBILITY":
      return { isVisible: !state.isVisible };
    default:
      return state;
  }
};

const App = () => {
  const [state, dispatch] = useReducer(visibilityReducer, initialState);

  return (
    <div className="container">
      <button onClick={() => dispatch({ type: "TOGGLE_VISIBILITY" })}>
        Toggle Message
      </button>
      {state.isVisible && <p className="message">Hello, World!</p>}
    </div>
  );
};

export default App;
