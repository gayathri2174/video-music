import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Playlistcard = ({ playlists }) => {
  return (
    <div>
      {playlists.images && playlists.images.slice(0,8).map((image, index) => (
        <Grid item md={3}>
          <Link to={'/playlist'} state={{id:playlists.id,playlistimage:image[0].url,playlistname:playlists.name}} style={{ textDecoration: "none" }}>
        <img key={index} src={image[0].url} alt={`Image ${index}`} style={{width:'230px'}}/>
        <p>{playlists.name}</p>
        </Link>
        </Grid>
      ))}
      
      </div>
  );
}

export default Playlistcard;
