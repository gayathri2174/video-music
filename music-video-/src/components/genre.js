import React, { useState, useEffect } from "react";
import axios from "axios";
import Playlistcard from "./Playlistcard";
import { Grid } from "@mui/material";

const Genre = () => {
  const [genreData, setGenreData] = useState([]);
  const [render, setRender] = useState(false);
  const [fetch, setFetch] = useState(true);

  const fetchGenreData = async () => {
    if (fetch) {
      try {
        const response = await axios.get('http://localhost:5000/get-genre-data'); // Replace with your backend API endpoint
        setGenreData(response.data.data);
        console.log(response.data.data);
        setRender(true);
        setFetch(false);
      } catch (error) {
        console.error(error);
      }
    }
  }

  useEffect(() => {
    fetchGenreData();
  }, []);

  return (
    <div style={{ color: "white" }}>
      {render && (
        <div>
          {genreData.map((genre) => (
            <div key={genre.id} style={{ color: 'white' }}>
              {genre.name}
              {genre.contents.items.slice(0,5).map((genrealbum) => (
                <div key={genrealbum.id}>
                  <p>{genrealbum.name}</p>
                  <Grid container spacing={2}>
                    {genrealbum.contents.items.slice(0,4).map((playlist) => (
                      <Playlistcard key={playlist.id} playlists={playlist}/>
                    ))}
                  </Grid>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Genre;
