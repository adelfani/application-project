// Register the application to get the client ID and secret
let accessToken = sessionStorage.getItem("access_token");
const spotifyAuthEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/";
const clientId = "dfdc9da1278d441a9d9e1cd6827af909";
const scopes = "playlist-modify-public";

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }

    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      console.log(window.location.href);
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch);
      sessionStorage.setItem("access_token", accessToken);
      // window.history.pushState({ accessToken }, null, "/");
      window.setTimeout(
        () => sessionStorage.removeItem("access_token"),
        expiresIn * 1000
      );
      console.log(accessToken);
      return accessToken;
    } else {
      const authUrl = `${spotifyAuthEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token`;
      window.location.href = authUrl;
    }
  },

  async search(term) {
    if (!accessToken) {
      Spotify.getAccessToken();
    }
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${term}&type=track`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    const data = await response.json();
    if (!data) {
      return [];
    }
    return await data.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists,
      album: track.album,
      uri: track.uri,
    }));
  },

  async savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    console.log(accessToken);
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;
    // Make a GET request to the /me endpoint
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: headers,
    });
    const data = await response.json();
    userId = await data.id;
    console.log(userId);

    //creating a new playlist
    const response2 = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers: headers,
        method: "POST",
        body: JSON.stringify({ name }),
      }
    );
    const data2 = await response2.json();
    const playlistId = await data2.id;

    // adding the tracks to the playlist
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: headers,
      method: "POST",
      body: JSON.stringify({ uris: trackUris }),
    });
  },
};

export default Spotify;
