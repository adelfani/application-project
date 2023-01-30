import "./Track.css";

// De Track-component is een functionele component die zijn gegevens ontvangt via props
const Track = (props) => {

  // Helperfunctie om te bepalen welke actieknop moet worden weergegeven: '+' of '-'
  const renderAction = () => {
    if (props.isRemoval) {
      return (
        <button className="Track-action" onClick={removeTrack}> - </button>
      );
    } else {
      return (
        <button className="Track-action" onClick={addTrack}> + </button>
      );
    }
  };

  // Functie die de onAdd-prop aanroept met de trackgegevens
  const addTrack = () => props.onAdd(props.track);

  // Functie die de onRemove-prop aanroept met de trackgegevens
  const removeTrack = () => props.onRemove(props.track);

  // Geef de trackinformatie en de actieknop weer
  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{props.track.name}</h3>
        <p>
          {props.track.artist[0].name} | {props.track.album.name}
        </p>
      </div>
      {renderAction()}
    </div>
  );
};

export default Track;
