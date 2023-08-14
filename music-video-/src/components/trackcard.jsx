import {
  Play,
  ShareNetwork,
  UploadSimple,
  DotsThreeVertical
} from "phosphor-react";
import axios from "axios";
import { useState } from "react";

const Trackcard = (tracks) => {
  const artist = tracks.artist;
  const search = tracks.name;
  const [audio,setAudio] = useState('');
  const play=async()=>{
     try{
      const response= await axios.get('play-url',{
        music: search
      });
      if(response.data.success){
        const file= response.data
        setAudio(file.soundcloudTrack.audio[0].url)
      }

     }catch(error){
      console.log(error)

     }

    
  }
  console.log(audio)
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
        <div>{tracks.name}</div>
        <div>
          {artist.map((rem) => (
            <span>{rem.name}</span>
          ))}
        </div>
      </div>
      <div style={{ flexBasis: "10%" }}>{tracks.time}</div>
      <div style={{ flexBasis: "10%" }}>
        <ShareNetwork size={30} color="#D4D4D4" weight="light" />
      </div>
      <div style={{ flexBasis: "10%" }}>
        <UploadSimple size={30} color="#D4D4D4" weight="light" />
      </div>
      <div style={{ flexBasis: "10%" }}>
        <DotsThreeVertical size={30} color="#D4D4D4" weight="light" />
      </div>
      {audio && ( // Display the audio player only if the audio URL is available
        <audio controls autoPlay>
          <source src= {audio} type="audio/mpeg"/>
        Your browser does not support the audio element.
      </audio>
      )}
    </div>
  );
};
export default Trackcard;
