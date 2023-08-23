import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Playlistcard = ({ playlists }) => {
  return (
    <Grid item>
      {playlists.images && playlists.images.slice(0,8).map((image, index) => (
        <Grid item md={3} style={{marginRight:'20px',color:'#c6c2c2'}}>
          <Link to={'/playlist'} state={{id:playlists.id,playlistimage:image[0].url,playlistname:playlists.name}} style={{ textDecoration: "none" }}>
        <img key={index} src={image[0].url} alt={`Image ${index}`} style={{width:'230px'}}/>
        <p style={{color:'#c6c2c2'}}>{playlists.name}</p>
        </Link>
        </Grid>
      ))}
      
      </Grid>
  );
}

export default Playlistcard;
