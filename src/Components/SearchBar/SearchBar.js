import { useState } from "react";
import "./SearchBar.css";

const SearchBar = (props) => {
  // staat om de invoerwaarde vast te houden
  const [term, setTerm] = useState("");

  // functie om de invoerwaarde bij te werken wanneer deze verandert
  const handleTermChange = (e) => setTerm(e.target.value);

  // functie om de zoekopdracht te activeren wanneer op de knop wordt geklikt
  const search = () => props.onSearch(term);

  return (
    <div className="SearchBar">
      <input
        placeholder="Enter A Song, Album, or Artist"
        onChange={handleTermChange}
      />
      <button className="SearchButton" onClick={search}>
        SEARCH
      </button>
    </div>
  );
};

export default SearchBar;
