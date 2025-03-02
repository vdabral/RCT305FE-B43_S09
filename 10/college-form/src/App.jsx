import React, { useReducer, useState } from "react";
import "./App.css";

const initialState = {
  name: "",
  establishment_year: "",
  address: {
    building: "",
    street: "",
    city: {
      name: "",
      locality: {
        pinCode: "",
        landmark: "",
      },
    },
    state: "",
    coordinates: { latitude: "", longitude: "" },
  },
  courses_offered: [],
  error: "",
};

const formReducer = (state, action) => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "SET_EST_YEAR":
      return { ...state, establishment_year: action.payload };
    case "SET_BUILDING":
      return {
        ...state,
        address: { ...state.address, building: action.payload },
      };
    case "SET_STREET":
      return {
        ...state,
        address: { ...state.address, street: action.payload },
      };
    case "SET_CITY":
      return {
        ...state,
        address: {
          ...state.address,
          city: { ...state.address.city, name: action.payload },
        },
      };
    case "SET_PINCODE":
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            locality: {
              ...state.address.city.locality,
              pinCode: action.payload,
            },
          },
        },
      };
    case "SET_LANDMARK":
      return {
        ...state,
        address: {
          ...state.address,
          city: {
            ...state.address.city,
            locality: {
              ...state.address.city.locality,
              landmark: action.payload,
            },
          },
        },
      };
    case "SET_STATE":
      return { ...state, address: { ...state.address, state: action.payload } };
    case "SET_COORDINATES":
      return {
        ...state,
        address: {
          ...state.address,
          coordinates: {
            latitude: action.payload.latitude,
            longitude: action.payload.longitude,
          },
        },
      };
    case "SET_COURSES":
      return { ...state, courses_offered: action.payload };
    case "SUBMIT":
      return { ...state, error: "", submitted: true };
    case "RESET":
      return initialState;
    case "ERROR":
      return { ...state, error: action.payload };
    default:
      throw new Error("Invalid action type");
  }
};

const App = () => {
  const [state, dispatch] = useReducer(formReducer, initialState);
  const [courseInput, setCourseInput] = useState("");

  const handleCourseAdd = () => {
    if (courseInput.trim()) {
      dispatch({
        type: "SET_COURSES",
        payload: [...state.courses_offered, courseInput.trim()],
      });
      setCourseInput("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !state.name ||
      !state.establishment_year ||
      !state.address.city.name ||
      state.courses_offered.length === 0
    ) {
      dispatch({ type: "ERROR", payload: "All fields are required!" });
      return;
    }
    dispatch({ type: "SUBMIT" });
  };

  return (
    <div className="container">
      <h2>College Registration Form</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="College Name"
          value={state.name}
          onChange={(e) =>
            dispatch({ type: "SET_NAME", payload: e.target.value })
          }
          required
        />
        <input
          type="number"
          placeholder="Establishment Year"
          value={state.establishment_year}
          onChange={(e) =>
            dispatch({ type: "SET_EST_YEAR", payload: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Building"
          value={state.address.building}
          onChange={(e) =>
            dispatch({ type: "SET_BUILDING", payload: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Street"
          value={state.address.street}
          onChange={(e) =>
            dispatch({ type: "SET_STREET", payload: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="City"
          value={state.address.city.name}
          onChange={(e) =>
            dispatch({ type: "SET_CITY", payload: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="Pincode"
          value={state.address.city.locality.pinCode}
          onChange={(e) =>
            dispatch({ type: "SET_PINCODE", payload: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Landmark"
          value={state.address.city.locality.landmark}
          onChange={(e) =>
            dispatch({ type: "SET_LANDMARK", payload: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="State"
          value={state.address.state}
          onChange={(e) =>
            dispatch({ type: "SET_STATE", payload: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Latitude"
          value={state.address.coordinates.latitude}
          onChange={(e) =>
            dispatch({
              type: "SET_COORDINATES",
              payload: {
                latitude: e.target.value,
                longitude: state.address.coordinates.longitude,
              },
            })
          }
        />
        <input
          type="text"
          placeholder="Longitude"
          value={state.address.coordinates.longitude}
          onChange={(e) =>
            dispatch({
              type: "SET_COORDINATES",
              payload: {
                latitude: state.address.coordinates.latitude,
                longitude: e.target.value,
              },
            })
          }
        />

        <div className="course-container">
          <input
            type="text"
            placeholder="Add Course"
            value={courseInput}
            onChange={(e) => setCourseInput(e.target.value)}
          />
          <button type="button" onClick={handleCourseAdd}>
            Add Course
          </button>
        </div>

        <button type="submit">Submit</button>
        <button type="button" onClick={() => dispatch({ type: "RESET" })}>
          Reset
        </button>
      </form>

      {state.error && <p className="error">{state.error}</p>}

      {state.submitted && (
        <div className="details">
          <h3>College Details</h3>
          <p>
            <strong>Name:</strong> {state.name}
          </p>
          <p>
            <strong>Establishment Year:</strong> {state.establishment_year}
          </p>
          <p>
            <strong>Address:</strong>{" "}
            {`${state.address.building}, ${state.address.street}, ${state.address.city.name}, ${state.address.state}, Pincode: ${state.address.city.locality.pinCode}, Landmark: ${state.address.city.locality.landmark}`}
          </p>
          <p>
            <strong>Coordinates:</strong>{" "}
            {`Lat: ${state.address.coordinates.latitude}, Lng: ${state.address.coordinates.longitude}`}
          </p>
          <p>
            <strong>Courses Offered:</strong> {state.courses_offered.join(", ")}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;
