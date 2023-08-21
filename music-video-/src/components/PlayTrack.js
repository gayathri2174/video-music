import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Gif, Play ,CaretDown} from "phosphor-react";
import axios from "axios"; 
import './styles.css'

const PlayTrack=({turl})=>{
    const location = useLocation();
  const {id, trackname, albumimage, albumname } = location.state;
  const [audio, setAudioState] = useState('');
  const [videoId, setVideoId] = useState('');
  const [videourl, setVideoUrl] = useState('');
  const [lyrics,setlyric] = useState('')
  const [fetchlyric,setfetchlyric] = useState(true)

  const video='https://redirector.googlevideo.com/videoplayback?expire=1692631452&ei=PC3jZInXA8O-kAPxtKDgAg&ip=198.98.59.215&id=o-ANa94xs7PtTXTyYYKN2Bjn1Eiq0M6qTRjOXi0sIsSoQB&itag=18&source=youtube&requiressl=yes&mh=fj&mm=31%2C26&mn=sn-p5qlsn7l%2Csn-ab5l6nkd&ms=au%2Conr&mv=m&mvi=3&pl=24&initcwndbps=127500&siu=1&vprv=1&svpuc=1&mime=video%2Fmp4&ns=2lE_cSxEcADPmE6gx10smoEP&cnr=14&ratebypass=yes&dur=172.570&lmt=1665570863117839&mt=1692609430&fvip=2&fexp=24007246%2C24363393&c=WEB&txp=4538434&n=-s_9L1ZLRwLiJg&sparams=expire%2Cei%2Cip%2Cid%2Citag%2Csource%2Crequiressl%2Csiu%2Cvprv%2Csvpuc%2Cmime%2Cns%2Ccnr%2Cratebypass%2Cdur%2Clmt&sig=AOq0QJ8wRQIhAO5gXMaF8FXTr4ItFYBU4lyKa5PO1RlnN2zgPERoGflzAiBF4fothMLOKVDnLxTY5tLU6yY65Ls8XM40Rcak6KQJkg%3D%3D&lsparams=mh%2Cmm%2Cmn%2Cms%2Cmv%2Cmvi%2Cpl%2Cinitcwndbps&lsig=AG3C_xAwRQIhANKD2RmveXOpc9KyK_P90J4YPpGpYjbxKscWMU6KjcCZAiB66O8xZjiJl7P4_xkibx14mg-KQgY1PRYlGnluWHLwiw%3D%3D&range=0-';

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

  /*useEffect(() => {
    searchVideo();
    lyric()
  }, []);

  useEffect(() => {
    getVideo();
  }, [videoId]);*/

    return(
        <div style={{color:'white'}}>
          
          <Grid container style={{marginTop:'18px'}} spacing={2}>
            <Grid item>
            <Play size={40}color="#fafafa"weight="fill" style={{ backgroundColor:'red',padding:'8px',borderRadius:'66px',cursor:'pointer'}}
                onClick={play}/>
            </Grid>
            <Grid item>
          <span className="font-regular" style={{fontSize:'30px'}}>{trackname}</span>
          <h4 className="font-light" style={{fontSize:'18px',marginTop:'5px'}}>{albumname}</h4>
          </Grid>

          </Grid>
   
            <div style={{marginBottom:'100px'}}>
              <div style={{marginTop:'10px',marginBottom:'30px'}}>
          <span>Watch Now</span>
                <CaretDown size={30} color="#f5f5f5" weight="thin" style={{marginLeft:'10px',marginBottom:'-9px'}}/>
                </div>
                <video controls autoplay name='media' style={{width:'-webkit-fill-available'}}>
                        <source src={video} type='video/mp4'/>
                    </video>
          </div>
          </div>
        
    )

}

export default PlayTrack;