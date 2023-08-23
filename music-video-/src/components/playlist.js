import React, { useEffect, useState } from "react"; 
import axios from "axios";
import { useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import { Play } from "phosphor-react";
import { Link } from "react-router-dom";
import {
  Pause,
    ShareNetwork,
    UploadSimple,
    DotsThreeVertical
  } from "phosphor-react";
  

const Playlist=({turl,playing})=>{
    const [fetch,setfetch] = useState(true);
    const location= useLocation();
    const {id,playlistimage,playlistname} =location.state
    const [container,setcontainer] = useState([])
    const [audio,setAudioState]= useState('')
    const [currentlyPlayingIndex, setCurrentlyPlayingIndex] = useState(-1); // Track index that is currently playing
    const [isplaying, setisplaying] = useState(false);

    const play=async(search,index)=>{
        try{
          const response = await axios.get("http://localhost:5000/get-audio", {
            params: {
              music: search,
            },
          });
      
          const file = response.data;
          setAudioState(file.data.soundcloudTrack.audio[0].url);
      
          if (currentlyPlayingIndex === index) {
            setCurrentlyPlayingIndex(-1); 
            setisplaying(false)// Pause the currently playing track
            
          } else {
            setCurrentlyPlayingIndex(index); // Play the clicked track
            setisplaying(true)
            
            
          }
          turl(audio);
          playing(isplaying);
          console.log(isplaying)
   
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
          <Grid container alignItems='flex-end' spacing={3}>
           <Grid item> <img src={playlistimage} alt='playlistimage' /></Grid>
           <Grid item className="font-medium" style={{fontSize:'40px',marginBottom:'30px'}}>{playlistname}</Grid>
            </Grid>
            <div style={{marginTop:'10px'}}>
                {container.map((track,id)=>(
                    <Grid container key={id} justifyContent='flex-start' style={{marginBottom:'5px'}}>
                      <Grid item md={1}>
                        <Link to={`/track/${track.album.id}`} style={{ textDecoration: "none" }}>
                        <img src={track.album.cover[1].url} alt='albumimg' />
                        </Link>
                        </Grid>
                        <Grid item md={9}>
                       <div className="font-regular" style={{marginBottom:'5px'}}>{track.name}</div>
                        <Link to={`/track/${track.album.id}`} style={{ textDecoration: "none" ,color:'white'}}>
                        <div className="font-light">{track.album.name}</div>
                        </Link>
                        </Grid>
                        <Grid item md={1}>
                       
                        {currentlyPlayingIndex === id && isplaying ? (
      <Pause
        size={30}
        color="#fafafa"
        weight="fill"
        style={{ flexBasis: "10%" }}
        onClick={() => play(track.name, id)}
      />
    ) : (
      <Play
        size={30}
        color="#fafafa"
        weight="fill"
        style={{ flexBasis: "10%" }}
        onClick={() => play(track.name, id)}
      />
    )}
                        </Grid>
                        <Grid item md={1}>
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