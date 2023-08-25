import React, { useState, useEffect } from "react";
import axios from "axios";
import Playlistcard from "./Playlistcard";
import { Grid } from "@mui/material";
import LoadingSpinner from "./Loading";

const Genre = () => {
  const [genreData, setGenreData] = useState([]);
  const [render, setRender] = useState(false);
  const [fetch, setFetch] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
    const [error,setError] = useState('')

  const fetchGenreData = async () => {
    if (fetch) {
      try {
        setIsLoading(true)
        const response = await axios.get('http://localhost:5000/get-genre-data'); // Replace with your backend API endpoint
        
        setTimeout(() => {
          setGenreData(response.data.data);
        console.log(response.data.data);
        setRender(true);
        setFetch(false);
          setIsLoading(false)
        }, 2000);
      } catch (error) {
        console.error(error);
        setError('Unable to fetch')
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    fetchGenreData();
  }, []);

  const content= (
    <div style={{ color: "white" }}>
      {render && (
        <div>
          {genreData.map((genre) => (
            <div key={genre.id} style={{ color: 'white' }}>
            <div className="font-regular" style={{fontSize:'20px'}}>  {genre.name}</div>
              {genre.contents.items.slice(0,5).map((genrealbum) => (
                <div key={genrealbum.id}>
                  <p className="font-light" style={{fontSize:'17px'}}>{genrealbum.name}</p>
                  <Grid  style={{overflow:'hidden',display: "flex",
          flexDirection: "row", 
          justifyContent: "space-between",
          overflow: "auto",
         }}> 
                    {genrealbum.contents.items.map((playlist) => (
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
  return(
    <div>
      {isLoading ? <LoadingSpinner /> : content}
      {error && <div style={{color:'white'}} className="error">{error}</div>}
  
    </div>
  )
};

export default Genre;
