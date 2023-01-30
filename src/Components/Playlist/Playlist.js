import "./Playlist.css";
import TrackList from "../TrackList/TrackList";

// De component Playlist is een functionele component die props als argument accepteert.
const Playlist = (props) => {

  // De functie "handleNameChange" wordt gedeclareerd, die een event object als argument neemt en de naam van de playlist bijwerkt met de waarde van het doelelement.
  const handleNameChange = (e) => props.onNameChange(e.target.value);

  return (
    <div className="Playlist">
      <input value={props.playlistName} onChange={handleNameChange} />
      <TrackList
        tracks={props.playlistTracks}
        onRemove={props.onRemove}
        isRemoval={true}
      />
      <button className="Playlist-save" onClick={props.onSave}>
        SAVE TO SPOTIFY
      </button>
    </div>
  );
};

export default Playlist;
