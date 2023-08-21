import React from "react";
import Songcard from "./songcard";
import Artistcard from "./artistcard";
import { albums, playlist, artist } from "./constants.js";
import { Grid } from "@mui/material";

const Searchfeed = () => {
  return (
    <div className="home-text">
      <span>Recently Played</span>
      <Grid style={{ 
          display: "flex",
          flexDirection: "row", 
          justifyContent: "space-between",
          marginTop: "20px",
          overflow: "auto",
          marginRight: "0"
        }}>
          
        {albums.map((temp) => (
          <Grid item>
          <Songcard
            key={temp.id}
            album={temp.name}
            id={temp.album_id}
            link={temp.image}
            name={temp.artist}
          />
          </Grid>
        ))}
       
      </Grid>
      <div>
        <span>Playlist for you</span>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "20px",
            overflow: "auto"
          }}
        >
          {playlist.map((temp) => (
            <Songcard
              key={temp.id}
              album={temp.name}
              id={temp.album_id}
              link={temp.cover}
              name={temp.artist}
            />
          ))}
        </div>
      </div>
      <div style={{ marginTop: "60px" }}>
        <span>Artist</span>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "20px",
            overflow: "auto"
          }}
        >
          {artist.map((temp) => (
            <Artistcard
              key={temp.id}
              id={temp.album_id}
              link={temp.cover}
              name={temp.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
export default Searchfeed;
