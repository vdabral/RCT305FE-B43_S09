import { useState, useEffect } from "react";
import axios from "axios";
import useDebounce from "../hooks/useDebounce";

const CountrySearch = () => {
  const [search, setSearch] = useState("");
  const [countries, setCountries] = useState([]);
  const debouncedSearch = useDebounce(search, 500);

  useEffect(() => {
    if (debouncedSearch) {
      axios
        .get(`https://api.first.org/data/v1/countries`)
        .then((response) => {
          const data = response.data.data;
          const filtered = Object.values(data).filter((country) =>
            country.country
              .toLowerCase()
              .includes(debouncedSearch.toLowerCase())
          );
          setCountries(filtered);
        })
        .catch((error) => console.error("API Error:", error));
    }
  }, [debouncedSearch]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search country..."
        onChange={(e) => setSearch(e.target.value)}
      />
      <ul>
        {countries.map((country) => (
          <li key={country.code}>{country.country}</li>
        ))}
      </ul>
    </div>
  );
};

export default CountrySearch;
