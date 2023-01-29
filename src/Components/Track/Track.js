import "./Track.css";

const Track = (props) => {
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

  const addTrack = () => props.onAdd(props.track);
  const removeTrack = () => props.onRemove(props.track);

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
