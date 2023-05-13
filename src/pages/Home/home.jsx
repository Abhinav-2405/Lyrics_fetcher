import React, { useState } from "react";
import Axios from "axios";
import Track from "./track";
import { useEffect } from "react";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState([]);
  const [top10Tracks, setTopTracks] = useState([]);

  const api_key = "2c8f7b3a4561d7c364036a7e0680fed4";

  useEffect(() => {
    const url = `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/chart.tracks.get?apikey=${api_key}&page_size=10&page=1`;
    Axios.get(url)
      .then((response) => {
        setTopTracks(response.data.message.body.track_list);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearch = () => {
    let url = `https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track_artist=${searchTerm}&apikey=${api_key}&s_track_rating=desc&s_artist_rating=desc`;
    console.log(`url is ${url} and key is Bearer ${api_key}`);
    Axios.get(url, {
      headers: {
        Authorization: `Bearer ${api_key}`,
        origin: "http://localhost:3000"
      }
    })
      .then((response) => {
        // console.log(response.data.message.body.track_list);
        setResults(response.data.message.body.track_list);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div>
      <input type="text" value={searchTerm} onChange={handleInputChange} />
      <button onClick={handleSearch}>Search</button>
      <div className="song-box-container">
        {results.map((result, index) => (
          <div key={index} className="song-box">
            <Track result={result} />
          </div>
        ))}
      </div>
      {results.length === 0 && (
        <div className="song-box-container">
          {top10Tracks.map((result, index) => (
            <div key={index} className="song-box">
              <Track result={result} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
