import React, { useEffect, useState } from "react"; 
import { useLocation } from "react-router-dom";
import axios from "axios";

const PlayVideo=()=>{
    const location = useLocation();
    const {id} = location.state;
    const [render,setrendervideo] =useState(true)
    const [fetch ,setfetch] =useState(false)
    const [videourl,setVideoUrl]= useState('')
    const [posterurl,setposterurl]=useState('')
    const [title,settitle]=useState('')
    
    const getVideo = async () => {
        if (render) {
          try {
            const response = await axios.get('https://b-music.onrender.com/get-video', {
              params: {
                id: id
              }
            });
    
            const file = response.data;
            if (file.data.videos.items.length > 0) {
              setVideoUrl(file.data.videos.items[0].url);
              setposterurl(file.data.thumbnails[1].url)
              settitle(file.data.title)
              console.log(videourl)
              setrendervideo(false)
              setfetch(true)
            }
          } catch (error) {
            console.log(error);
          }
        }
      }
      useEffect(()=>{
        getVideo()

      },[render])
    return(
        <div>
          
        {fetch && (
            <div style={{marginBottom:'100px'}}>
              <div className="font-regular" style={{color:'#e7e4e4',marginBottom:'20px',fontSize:'20px'}}>{title}</div>
            <video controls autoplay name='media' poster={posterurl} style={{width:'-webkit-fill-available'}}>
            <source src={videourl} type='video/mp4'/>
            </video>
            </div>
        )}
        </div>
    )
}

export default PlayVideo;