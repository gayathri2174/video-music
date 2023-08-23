import React, { useEffect, useState } from "react";
import Songcard from "./songcard";
import Artistcard from "./artistcard";
import { albums, playlist, artist } from "./constants.js";
import { Grid } from "@mui/material";
import Playlisthomepage from "./playliststatic";
import axios from "axios";

const Searchfeed = () => {
  const [render,setrender] =useState(true)
  const [fetch,setfetch] =useState(false)
  const [container,setContainer] =useState([])
  

  const trending=async()=>{
    if(render){
    try{
      const response = await axios.get('http://localhost:5000/trend',{
        params:{
          country:'IN'
        }
      });
      setContainer(response.data.data)
      console.log(response.data.data)
      setrender(false)
      setfetch(true)
    }catch(error){
      console.log(error)
    }
  }

  }
  useEffect(()=>{
    trending()

  },[])
  
  return (
    <div className="home-text" style={{marginBottom:'200px'}}>
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
            <Playlisthomepage
              key={temp.id}
              album={temp.name}
              id={temp.playlist_id}
              link={temp.cover}
              name={temp.artist}
            />
          ))}
        </div>
      </div>
      <div style={{color:'white',marginBottom:'100px'}}>
        <span>Artist</span> 
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: "20px",
            overflow: "auto",
            marginBottom:'100px'
          }}
        >
          
         
            {fetch && container.slice(0,5).map((temp)=>(
            <Artistcard album={temp} />
          ))}

          
        </div>
      </div>
    </div>
  );
};
export default Searchfeed;
