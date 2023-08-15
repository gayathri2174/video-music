import React,{useEffect,useRef} from "react";

const Playsong=({audiourl})=>{
  console.log(audiourl)
  console.log('playing')
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audiourl;
      audioRef.current.play();
    }
  }, [audiourl]);
    return(
        
        <div style={{position:"fixed",bottom:"0",width:"100%"}}>
        <audio controls ref={audioRef} style={{width:"100%"}}>
          <source src={audiourl} type="audio/mpeg"/>
        Your browser does not support the audio element.
      </audio>
    </div>
    )
 
}

export default Playsong