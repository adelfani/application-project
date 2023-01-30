import "./TrackList.css";

// De Track-component importeren
import Track from "../Track/Track";

// Functionele component voor het weergeven van een lijst met tracks
const TrackList = (props) => {
  return (
    <div className="TrackList">
      {props.tracks.map((track) => {
        return (
          // Een Track-component, die props doorgeeft voor track, key, onAdd, onRemove en isRemoval
          <Track
            track={track}
            key={track.id}
            onAdd={props.onAdd}
            onRemove={props.onRemove}
            isRemoval={props.isRemoval}
          />
        );
      })}
    </div>
  );
};

export default TrackList;
