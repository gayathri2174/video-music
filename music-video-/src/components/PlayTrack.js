import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Play } from "phosphor-react";
import Playsong from "./playsong";
import axios from "axios";

const PlayTrack=()=>{
    const loaction = useLocation();
    const {id,trackname,albumimage,albumname} = loaction.state
    const [audio,setAudioState]= useState('')
    const [render,setrender] =useState(false)
    const play=async()=>{
        try{
         const response= await axios.get('http://localhost:5000/get-audio',{
           params: {
             music: trackname
           }
         });
         
           const file= response.data
           setAudioState(file.data.soundcloudTrack.audio[0].url)
           setrender(true)         
        }catch(error){
         console.log(error)
   
        }
   
     }
    

    return(
        <Grid container spacing={2} sx={{color:'white'}}>
            <Grid item xs={12} md={4}>
                <img src={albumimage} alt='albumimage'/>
            </Grid>
            <Grid item xs={12} md={5} display='flex' direction='column' alignItems='baseline'>
                <h4>{trackname}</h4>
                <h4>{albumname}</h4>
                <Play size={30}color="#fafafa"weight="fill" style={{ flexBasis: "10%" ,backgroundColor:'red',padding:'8px',borderRadius:'25px',cursor:'pointer'}}
                onClick={play}/>

            </Grid>
            {audio && Playsong(audio)}
        </Grid>
        
    )

}

export default PlayTrack;