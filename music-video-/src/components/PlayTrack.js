import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Play } from "phosphor-react";
import axios from "axios"; 

const PlayTrack=({turl})=>{
    const location = useLocation();
  const { trackname, albumimage, albumname } = location.state;
  const [audio, setAudioState] = useState('');
  const [videoId, setVideoId] = useState('');
  const [videourl, setVideoUrl] = useState('');

  const play = async () => {
    try {
      const response = await axios.get('http://localhost:5000/get-audio', {
        params: {
          music: trackname
        }
      });

      const file = response.data;
      setAudioState(file.data.soundcloudTrack.audio[0].url);
      turl(audio);
    } catch (error) {
      console.log(error);
    }
  }

  const searchVideo = async () => {
    try {
      const response = await axios.get('http://localhost:5000/search-video', {
        params: {
          search: trackname
        }
      });

      const file = response.data;
      if (file.data.items.length > 0) {
        setVideoId(file.data.items[0].id);
        console.log(file.data.items[0].id);
      }
    } catch (error) {
      console.log(error);
    }
  }
  const [rendervideo,setrendervideo] = useState(false);
  const getVideo = async () => {
    if (videoId) {
      try {
        const response = await axios.get('http://localhost:5000/get-video', {
          params: {
            id: videoId
          }
        });

        const file = response.data;
        if (file.data.videos.items.length > 0) {
          setVideoUrl(file.data.videos.items[0].url);
          console.log(videourl)
          setrendervideo(true)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    searchVideo();
  }, []);

  useEffect(() => {
    getVideo();
  }, [videoId]);

    return(
        <Grid container spacing={2} sx={{color:'white'}}>
            <Grid item md={12}>
                {rendervideo && (
                    <video controls autoplay name='media'>
                        <source src={videourl} type='video/mp4'/>
                    </video>
                )}

            </Grid>
            <Grid item xs={12} md={4}>
                <img src={albumimage} alt='albumimage'/>
            </Grid>
            <Grid item xs={12} md={8} display='flex' direction='column' alignItems='baseline'>
                <h4>{trackname}</h4>
                <h4>{albumname}</h4>
                <Play size={30}color="#fafafa"weight="fill" style={{ flexBasis: "10%" ,backgroundColor:'red',padding:'8px',borderRadius:'25px',cursor:'pointer'}}
                onClick={play}/>
                
            </Grid>
            
        </Grid>
        
    )

}

export default PlayTrack;