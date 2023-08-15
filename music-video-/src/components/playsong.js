import React from "react";

const Playsong=(audiourl)=>{
  console.log(audiourl)

    return(
        
        <div style={{position:"fixed",bottom:"0",width:"-webki-fill-available"}}>
        <audio controls autoPlay style={{width:"-webki-fill-available"}}>
          <source src={audiourl} type="audio/mpeg"/>
        Your browser does not support the audio element.
      </audio>
    </div>
    )

}

export default Playsong