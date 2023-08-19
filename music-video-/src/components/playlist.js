import React, { useEffect, useState } from "react"; 
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import { Play } from "phosphor-react";
import { Link } from "react-router-dom";
import {
    ShareNetwork,
    UploadSimple,
    DotsThreeVertical
  } from "phosphor-react";
  

const Playlist=({turl})=>{
    const [fetch,setfetch] = useState(true);
    const location= useLocation();
    const {id,playlistimage,playlistname} =location.state
    const [container,setcontainer] = useState([])
    const [audio,setAudioState]= useState('')

    const play=async(search)=>{
        try{
         const response= await axios.get('http://localhost:5000/get-audio',{
           params: {
             music: search
           } 
         });
         console.log(search)
         
           const file= response.data
           setAudioState(file.data.soundcloudTrack.audio[0].url)
           turl(audio)
   
        }catch(error){
         console.log(error)
   
        }
       }
       
    const gettrack=async()=>{
        if(fetch){
            try {
              const response = await axios.get('http://localhost:5000/playlist-track',{
                params:{
                  ids: id 
                }
              })
             const file= response.data;
              console.log(file.data.contents.items);
              setcontainer(file.data.contents.items)
              setfetch(false)
            } catch (error) {
              console.error(error);
            }
          }
    }
    useEffect(()=>{
        gettrack()

    },[])

    return(
        <div style={{color:'white'}}>
            <img src={playlistimage} alt='playlistimage' />
            <p>{playlistname}</p>
            <div>
                {container.map((track,id)=>(
                    <Grid container key={id}>
                        <img src={track.album.cover[1].url} alt='albumimg' />
                        <Grid item>{track.name}</Grid>
                        <Grid item>{track.album.name}</Grid>
                        <Grid item>
                        <Play size={30} color="#fafafa" weight="fill" onClick={() => play(track.name)}/>
                        </Grid>
                        <Grid item>
                            <Link to='/playtrack' state={{id:track.id,trackname:track.name,albumimage:track.album.cover[1].url,albumname:track.album.name}} >
                            <UploadSimple size={30} color="#D4D4D4" weight="light"/>
                            </Link>
                        </Grid>
                    
                    </Grid>
                ))}

            </div>

        </div>

    )

}

export default Playlist;