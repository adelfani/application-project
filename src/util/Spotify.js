// Registreer de applicatie om de client-ID te krijgen
let accessToken = sessionStorage.getItem("access_token");
const spotifyAuthEndpoint = "https://accounts.spotify.com/authorize";
const redirectUri = "http://localhost:3000/";
const clientId = "dfdc9da1278d441a9d9e1cd6827af909";
const scopes = "playlist-modify-public";

const Spotify = {
  // Deze functie haalt het access token op van de huidige URL of van de session storage.
  getAccessToken() {
    // Controleer of het access token al in het memory is opgeslagen
    if (accessToken) {
      return accessToken;
    }

    // Probeer het access token en expires_in uit de huidige URL te halen.
    const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
    const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

    // Als het access token en expires_in worden gevonden in de URL, sla deze dan op in sessieopslag
    // en stel een timer in om het access token na de vervaltijd te verwijderen.
    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch);
      sessionStorage.setItem("access_token", accessToken);
      window.setTimeout(
        () => sessionStorage.removeItem("access_token"),
        expiresIn * 1000
      );
      return accessToken;
    } else {
      // Als het access token niet in de URL wordt gevonden, leidt u de gebruiker door naar het Spotify authorization endpoint
      // voor de gebruiker om in te loggen en toegang te verlenen tot de applicatie.
      const authUrl = `${spotifyAuthEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes}&response_type=token`;
      window.location.href = authUrl;
    }
  },

  //Dit is een zoekfunctie voor het zoeken naar tracks op Spotify met behulp van de Spotify API
  async search(term) {
    // Het controleert eerst of het accessToken beschikbaar is, en zo niet, dan roept het de getAccessToken-functie van Spotify aan om het te verkrijgen
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
    //Als het antwoord succesvol is, converteert het het antwoord naar JSON-gegevens en controleert het of het niet leeg is
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

  // Deze code is voor het opslaan van een playlist in het Spotify-account van de gebruiker met behulp van de Spotify Web API.
  async savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }

    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;
    // Doe een GET request naar het /me eindpunt
    const response = await fetch("https://api.spotify.com/v1/me", {
      headers: headers,
    });
    const data = await response.json();
    userId = await data.id;

    // een nieuwe playlist maken
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
    // het toevoegen van de tracks aan de playlist
    fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: headers,
      method: "POST",
      body: JSON.stringify({ uris: trackUris }),
    });
  },
};

export default Spotify;
