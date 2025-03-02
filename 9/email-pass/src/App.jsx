import React, { useReducer } from "react";
import "./App.css";

const initialState = {
  email: "",
  password: "",
  submitted: false,
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "EMAIL":
      return { ...state, email: action.payload };
    case "PASSWORD":
      return { ...state, password: action.payload };
    case "SUBMIT":
      return { ...state, submitted: true };
    case "RESET":
      return initialState;
    default:
      throw new Error("Invalid action type");
  }
};

const App = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (state.email && state.password) {
      dispatch({ type: "SUBMIT" });
    }
  };

  return (
    <div className="container">
      <h2>User Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Enter email"
          value={state.email}
          onChange={(e) => dispatch({ type: "EMAIL", payload: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Enter password"
          value={state.password}
          onChange={(e) =>
            dispatch({ type: "PASSWORD", payload: e.target.value })
          }
          required
        />
        <button type="submit">Submit</button>
        <button type="button" onClick={() => dispatch({ type: "RESET" })}>
          Reset
        </button>
      </form>

      {state.submitted ? (
        <div className="details">
          <div>User Email: {state.email}</div>
          <div>User Password: {state.password}</div>
        </div>
      ) : (
        <div>No details found</div>
      )}
    </div>
  );
};

export default App;
