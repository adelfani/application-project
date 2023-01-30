import "./App.css";
import { useState } from "react";
// Importeer de andere componenten die nodig zijn voor de app
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotify";

// Definieer de app-component met functionele component
const App = () => {
  // Gebruik de useState-hook om de status van zoekresultaten, de naam van de playlist en de tracks van de playlist te beheren
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("PlaylistOne");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  // Functie om een track toe te voegen aan de playlist
  const addTrack = (track) => {
    if (playlistTracks.includes((item) => item.id === track.id)) {
      return;
    } else {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };
  // Functie om een track uit de playlist te verwijderen
  const removeTrack = (track) => {
    let tracksWithout = playlistTracks.filter((item) => item.id !== track.id);
    setPlaylistTracks([...tracksWithout]);
  };

  // Functie om de naam van de playlist bij te werken
  const updatePlaylistName = (name) => {
    setPlaylistName(name);
  };

  // Functie om de playlist op Spotify op te slaan
  const savePlaylist = () => {
    const trackUris = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName("New Playlist");
      setPlaylistTracks([]);
    });
  };
  
  // Functie om een zoekopdracht uit te voeren met een specifieke term
  const search = (term) => {
    Spotify.search(term).then((result) => {
      setSearchResults(result);
    });
  };

  return (
    <div>
      <h1>
        Ja<span className="highlight">mmm</span>ing
      </h1>
      <div className="App">
        <SearchBar onSearch={search} />
        <div className="App-playlist">
          <SearchResults SearchResults={searchResults} onAdd={addTrack} />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onRemove={removeTrack}
            onNameChange={updatePlaylistName}
            onSave={savePlaylist}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
