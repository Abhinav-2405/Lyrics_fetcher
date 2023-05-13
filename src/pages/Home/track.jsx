import { useNavigate } from "react-router-dom";

// import { BrowserRouter as Router,  } from "react-router-dom";
export default function Track({ result }) {
  const navigate = useNavigate();

  const handleClick = (track) => {
    // console.log(result);
    // console.log(track.track);
    // console.log(JSON.stringify(track));
    navigate("/lyric", { state: { track: track.track } });
  };

  // console.log(result);
  return (
    <div>
      <div className="song-details">
        <p className="song-name">{result.track.track_name}</p>
        <p className="artist-name">{result.track.artist_name}</p>
      </div>

      <button onClick={() => handleClick(result)}>Go to my page</button>
    </div>
  );
}
