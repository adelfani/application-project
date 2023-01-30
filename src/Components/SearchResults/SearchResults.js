import "./SearchResults.css";
// Importeer de TrackList-component
import TrackList from "../TrackList/TrackList";

// De component SearchResults is een functionele component die props als argument accepteert.
const SearchResults = (props) => {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      <TrackList
        tracks={props.SearchResults}
        onAdd={props.onAdd}
        isRemoval={false}
      />
    </div>
  );
};

export default SearchResults;
