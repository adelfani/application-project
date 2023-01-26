// Register the application to get the client ID and secret
let accessToken = "";
const spotifyAuthEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/";
const clientId = "dfdc9da1278d441a9d9e1cd6827af909";
const clientSecret = "35500042e5924595a20a6c1ae7164f3f";
const scopes = "playlist-modify-public";

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    } else {
      // Redirect the user to the authorize endpoint
      const authUrl = `${spotifyAuthEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token&show_dialog=true`;
      window.location.href = authUrl;

      // Handle the redirect from Spotify and extract the authorization code
      const queryString = window.location.search;
      const params = new URLSearchParams(queryString);
      const code = params.get("code");

      // Use the authorization code to request an access token
      const tokenUrl = "https://accounts.spotify.com/api/token";
      const body = `grant_type=authorization_code&code=${code}&redirect_uri=${redirectUri}&client_id=${clientId}&client_secret=${clientSecret}`;

      fetch(tokenUrl, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body,
      })
        .then((response) => response.json())
        .then((data) => {
          // Extract the access token from the response
          accessToken = data.access_token;
          // Use the access token to make API calls
          console.log(accessToken);
        });
    }
  },

  async search(term) {
    const response = await fetch(
      `https://api.spotify.com/v1/search?q=${term}&type=track`,
      {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
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
      artist: track.artist,
      album: track.album,
      uri: track.uri,
    }));
  },

  async savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { 'Authorization': `Bearer ${accessToken}` };
    let userId;
    // Make a GET request to the /me endpoint
    const response = await fetch("https://api.spotify.com/v1/me", headers);
    const data = await response.json();
    userId = await data.id;

    //creating a new playlist
    const response2 = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers,
        method: "POST",
        body: JSON.stringify({ name }),
      }
    );
    const data2 = await response2.json();
    const playlistId = await data2.id;

    // adding the tracks to the playlist
    fetch(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        headers,
        method: "POST",
        body: JSON.stringify({ uris: trackUris }),
      }
    );
  },
};

export default Spotify;
