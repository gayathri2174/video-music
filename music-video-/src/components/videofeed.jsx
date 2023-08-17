import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import axios from "axios";
import {trend} from './trend';
import { Link } from "react-router-dom";

const Videofeed = () => {
  const [containers,setContainer] = useState([])
  const [render,setrender]=useState(true)
  const [fetch,setfetch]=useState(false)
  const trending=async()=>{
    if(render){
    try{
      const response = await axios.get('http://localhost:5000/trend');
      setContainer(response.data.data)
      setrender(false)
      setfetch(true)
    }catch(error){
      console.log(error)
    }
  }

  }
  useEffect(()=>{
    trending();
  },[render])
  return(
    <div style={{color:"white"}}>
      <h3>Trending</h3>

    
       {fetch && (
        <Grid container spacing={2}>
         {containers.map((video)=>(
          
          <Grid item key={video.videoId} md={4}>
            <Link to={'/video'} state={{id:video.videoId}} style={{textDecoration:'none'}}>
          <img src={video.thumbnails[1].url} alt='videoimage' style={{width:'300px'}}/>
          <div className="video-title">{video.title}</div>
          </Link>
          </Grid>
          
        ))}
        </Grid>
       )}

    </div>
  );
};
export default Videofeed;
