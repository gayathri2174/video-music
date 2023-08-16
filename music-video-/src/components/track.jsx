import React, { useEffect, useState } from "react";
import { useParams,Link } from "react-router-dom";
import { details } from "./details";
import Trackcard from "./trackcard";
import axios from "axios";
import {
  Play,
  ShareNetwork,
  UploadSimple,
  DotsThreeVertical
} from "phosphor-react";

const Track = ({turl}) => {
  
  const { id } = useParams();
  const [detail,setdetail] = useState([]);
  const [url,seturl ]= useState(''); 
  const [container,setContainer] = useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [track, settrack] = useState([]);
  const [fetch,setfetch] = useState(false)

  const [audio,setAudioState] = useState('');
  
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
  const Albummeta = async () => {
    if(fetch){
      try {
        const response = await axios.get('http://localhost:5000/album-metadata',{
          params:{
            ids: id 
          }
        })
       const file= response.data;
        console.log(file.data);
        setdetail(file.data);
        seturl(file.data.cover[0].url)
        setfetch(false)
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchAPI = async () => {
    if (!isLoading) {
      try {
        console.log(id)
        const response = await axios.get('http://localhost:5000/get-tracks',{
          params:{
            ids: id
          }
        })
       const file= response.data;
        console.log(file.data);
        setIsLoading(true);
        settrack(file.data.tracks.items);
        setfetch(true)
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    fetchAPI();
  }, [isLoading]);
  
  setTimeout(() => {
    fetchAPI();
  }, 5000);

  Albummeta();


 /* const metadata= async()=>{
    const axios = require('axios');

    const options = {
      method: 'GET',
      url: 'https://spotify-scraper.p.rapidapi.com/v1/track/metadata',
      params: {
        trackId: id
      },
      headers: {
    'X-RapidAPI-Key': '8f26eecff1msh5fb17874cc3ec1cp1259f3jsne1a4bd11f2ba',
    'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
      }
    };
    try {
	    const response = await axios.request(options);
	    console.log(response.data);
      setContainer(response.data)
     } catch (error) {
	      console.error(error);
      }
    }
  */

    const playtrack=()=>{
      
    }
  return (
    <div className="text">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          marginLeft: "20px"
        }}
      >
        <img
          src={url}
          alt="albumimage"
          style={{ width: "252px", height: "255px" }}
        />

        <div>
          <div style={{ fontWeight: "400", fontSize: "15px" }}>Album</div>
          <div>{detail.name}</div>
          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            <div>
              {detail.artists?.map((artist, id) => {
                return <div key={id}>{artist.name}</div>;
              })}
            </div>
            <div className="dot"></div>
            <div>2015</div>
            <div className="dot"></div>
            <div>{detail.trackCount} songs</div>
          </div>
        </div>
      </div>
      <div>
      {track ? (
        <div>
          {track?.map((temp) => (
            <div style={{ display: "flex",flexDirection: "row",margin: "25px 10px",alignItems: "center"}}>
              <Play size={30} color="#fafafa" weight="fill" style={{ flexBasis: "10%" }} onClick={() => play(temp.name)}/>
      <div style={{ flex: "50%" }}>
        <div>{temp.name}</div>
        <div>
          {temp.artists.map((rem) => (
            <span>{rem.name}</span>
          ))}
        </div>
      </div>
      <div style={{ flexBasis: "10%" }}>{temp.durationText}</div>
      <div style={{ flexBasis: "10%" }}>
        <ShareNetwork size={30} color="#D4D4D4" weight="light" />
      </div>
      <div style={{ flexBasis: "10%" }}>
        <Link to='/playtrack' state={{id:temp.id,trackname:temp.name,albumimage:url,albumname:detail.name}} >
        <UploadSimple size={30} color="#D4D4D4" weight="light"/>
        </Link>
      </div>
      <div style={{ flexBasis: "10%" }}>
        <DotsThreeVertical size={30} color="#D4D4D4" weight="light" />
      </div>
            </div>
            
          ))}
        </div>
      ) : (
        <div>world</div>
      )}
    </div>
    </div>
  );
};
export default Track
