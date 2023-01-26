import "./App.css";
import { useState } from "react";

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState("PlaylistOne");
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const addTrack = (track) => {
    if (playlistTracks.includes((item) => item.id === track.id)) {
      return;
    } else {
      setPlaylistTracks([...playlistTracks, track]);
    }
  };

  const removeTrack = (track) => {
    let tracksWithout = playlistTracks.filter((item) => item.id !== track.id);
    setPlaylistTracks([...tracksWithout]);
  };

  const updatePlaylistName = name => {
    setPlaylistName(name);
  }

  const savePlaylist = () => {
    const trackUri = playlistTracks.map(track => track.uri);
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
};

export default App;
