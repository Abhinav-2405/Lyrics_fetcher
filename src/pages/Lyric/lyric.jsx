import Axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Lyric() {
  const location = useLocation();
  const track = location.state ? location.state : null;
  const [songData, setSongData] = useState(null);
  const api_key = "2c8f7b3a4561d7c364036a7e0680fed4";

  useEffect(() => {
    if (track && track.track) {
      console.log(track.track);
      let url = `https://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${track.track.track_id}&apikey=${api_key}`;
      console.log(url);
      Axios.get(url)
        .then((response) => {
          console.log(`Data is ${JSON.stringify(response.data)}`);
          setSongData(response.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, [api_key, track]);

  return (
    <>
      <Link to="/" className="go_back_btn">
        Go Back
      </Link>
      <div>
        {songData ? (
          <div className="lyrics-container">
            <h2 className="lyrics-title">{track.track.track_name}</h2>
            <p className="lyrics-artist">{track.track.artist_name}</p>
            <p className="lyrics-body">
              {songData.message.body.lyrics.lyrics_body}
            </p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}
