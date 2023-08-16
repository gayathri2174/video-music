import React, { useEffect, useState } from "react"; 
import { useLocation } from "react-router-dom";
import axios from "axios";

const PlayVideo=()=>{
    const location = useLocation();
    const {id} = location.state;
    const [render,setrendervideo] =useState(true)
    const [fetch ,setfetch] =useState(false)
    const [videourl,setVideoUrl]= useState('')
    const getVideo = async () => {
        if (render) {
          try {
            const response = await axios.get('http://localhost:5000/get-video', {
              params: {
                id: id
              }
            });
    
            const file = response.data;
            if (file.data.videos.items.length > 0) {
              setVideoUrl(file.data.videos.items[0].url);
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
            <video controls autoplay name='media'>
            <source src={videourl} type='video/mp4'/>
            </video>
        )}
        </div>
    )
}

export default PlayVideo;