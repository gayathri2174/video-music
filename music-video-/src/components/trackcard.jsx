import {
  Play,
  ShareNetwork,
  UploadSimple,
  DotsThreeVertical
} from "phosphor-react";
import axios from "axios";
import { useState } from "react";
import Playsong from "./playsong";
import { useNavigate,useLocation } from "react-router-dom";

const Trackcard = ({ artist, name, time }) => {
  const artist1 = artist;
  const search = name;
  const [audio,setAudioState] = useState('');
  const navigate=useNavigate()
  const location=useLocation()
  const play=async()=>{
     try{
      const response= await axios.get('http://localhost:5000/get-audio',{
        params: {
          music: search
        } 
      });
      console.log(search)
      
        const file= response.data
        setAudioState(file.data.soundcloudTrack.audio[0].url)

      

     }catch(error){
      console.log(error)

     }

  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        margin: "25px 10px",
        alignItems: "center"
      }}
    >
      <Play
        size={30}
        color="#fafafa"
        weight="fill"
        style={{ flexBasis: "10%" }}
        onClick={play}
      />
      <div style={{ flex: "50%" }}>
        <div>{name}</div>
        <div>
          {artist1.map((rem) => (
            <span>{rem.name}</span>
          ))}
        </div>
      </div>
      <div style={{ flexBasis: "10%" }}>{time}</div>
      <div style={{ flexBasis: "10%" }}>
        <ShareNetwork size={30} color="#D4D4D4" weight="light" />
      </div>
      <div style={{ flexBasis: "10%" }}>
        <UploadSimple size={30} color="#D4D4D4" weight="light" />
      </div>
      <div style={{ flexBasis: "10%" }}>
        <DotsThreeVertical size={30} color="#D4D4D4" weight="light" />
      </div>
      {audio & Playsong(audio)}
    </div>
  );
};
export default Trackcard;
