import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Gif,Pause, Play ,CaretDown} from "phosphor-react";
import axios from "axios"; 
import './styles.css'

const PlayTrack=({turl,playing,imageurl,albumfun,titlefun })=>{
    const location = useLocation();
  const {id, trackname, albumimage, albumname } = location.state;
  const [audio, setAudioState] = useState('');
  const [isplaying, setisplaying] = useState(false);
  const [videoId, setVideoId] = useState('');
  const [videourl, setVideoUrl] = useState('');
  const [lyrics,setlyric] = useState('')
  const [fetchlyric,setfetchlyric] = useState(true)
  const [posterurl,setposterurl] = useState('')


  const lyric =async()=>{
    if(fetchlyric){ 
    try{
        const response= await axios.get('http://localhost:5000/get-lyric',{
            params:{
                id:id
            }
        })
        setlyric(response.data.data)
        console.log(response.data.data)
        setfetchlyric(false)

    }catch(error){
      console.log(error)

    }
    
   }
}
  const play = async (value) => {
    try {
      const search = trackname + ' '+ albumname
      
      const response = await axios.get('http://localhost:5000/get-audio', {
        params: {
          music: search
        }
      });

      const file = response.data;
      setAudioState(file.data.soundcloudTrack.audio[0].url);
      turl(file.data.soundcloudTrack.audio[0].url);
      setisplaying(value)
      playing(value);
      imageurl(albumimage)
      albumfun(albumname)
      titlefun(trackname)
    } catch (error) {
      console.log(error);
    }
  }

  const searchVideo = async () => {
    try {
      const response = await axios.get('http://localhost:5000/search-video', {
        params: {
          search: trackname + ' '+albumname
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
  const [rendervideo,setrendervideo] = useState(true);
  const getVideo = async () => {
    if (videoId && rendervideo) {
      try {
        const response = await axios.get('http://localhost:5000/get-video', {
          params: {
            id: videoId
          }
        }); 

        const file = response.data;
        if (file.data.videos.items.length > 0) {
          setVideoUrl(file.data.videos.items[0].url);
          setposterurl(file.data.thumbnails[1].url);
          setrendervideo(false)
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  useEffect(() => {
    searchVideo();
    lyric()
  }, []);

 useEffect(() => {
    getVideo();
  }, [videoId]);

  const dummy=()=>{
    playing(false)
  }

    return(
        <div style={{color:'white'}}>
          
          <Grid container style={{marginTop:'18px'}} spacing={2}>
            <Grid item>
            { isplaying ? (
      <Pause
      size={40}color="#fafafa"weight="fill" style={{ backgroundColor:'red',padding:'8px',borderRadius:'66px',cursor:'pointer'}}
      onClick={() => play(false)}
      />
    ) : (
      <Play
      size={40}color="#fafafa"weight="fill" style={{ backgroundColor:'red',padding:'8px',borderRadius:'66px',cursor:'pointer'}}
      onClick={() => play(true)}
      />
      
    )}

            </Grid>
            <Grid item>
          <span className="font-regular" style={{fontSize:'30px'}}>{trackname}</span>
          <h4 className="font-light" style={{fontSize:'18px',marginTop:'5px'}}>{albumname}</h4>
          </Grid>

          </Grid>
          
            <Grid container style={{marginBottom:'100px'}} spacing={3}>
              <Grid item md={8} xs={12}>
              <div style={{marginBottom:'10px'}}>
          <span className="font-regular" style={{fontSize:'18px'}}>Watch Now</span>
                <CaretDown size={20} color="#f5f5f5" weight="thin" style={{marginLeft:'10px',marginBottom:'-5px'}}/>
                </div> 
                {!rendervideo &&(
                  <video controls autoplay name='media' poster={posterurl} style={{width:'-webkit-fill-available',height:'-webkit-fill-available'}} onPlay={dummy}>
                  <source src={videourl} type='video/mp4'/>
              </video>

                )}
                    
                    </Grid>
                    
                    {!fetchlyric && (
                    <Grid item md={4}>
                      <div style={{marginLeft:'15px',marginBottom:'10px'}}>
          <span className="font-regular" style={{fontSize:'18px'}}>Lyric</span>
                <CaretDown size={20} color="#f5f5f5" weight="thin" style={{marginLeft:'10px',marginBottom:'-5px'}}/>
                </div>
                      <div className="lyric-box">
                    {lyrics.split('\n').map((line, index) => (
                      <p key={index} className="lyric">{line.slice(10)}</p>
                    ))}
                    </div>
                  </Grid>
                )}

          </Grid>
          </div>
        
    )

}

export default PlayTrack;