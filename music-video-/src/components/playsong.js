import React, { useEffect, useState, useRef } from "react";
import { Play, Pause } from "phosphor-react";
import { Grid } from "@mui/material";
import useSound from "use-sound";


const Playsong = ({ audiourl }) => {
  const [audio] = useState(
    new Audio(
      "https://scd.dlod.link/?expire=1692562530344&p=5X9vwqz676ZO2Wsdl52d7ToHgQ2bDY_eTwqs0atPcOJ-8xziehtKNl2j22fp-glVS9WKoAyRupFazK1m_FoRjdcw2BJZThFG-J3bcK0Mwg6f2bsciEjW8RNzX2iiEjiZeSUchCPP2UiR8RThOg_jLAz5ZWs5S2BX2VyUj7tan_CmvUq8HQrxApoRRilqBisC&s=AFpSTszuXmoe_YlGczRpWScmwwfj9WQ7aSw4yYqp0_0"
    )
  );
  const [duration, setDuration] = useState(0);
  const [currenttime, setCurrentTime] = useState(0);
  // Set initial state of song using the useState hook
  const [isPlaying, setIsPlaying] = useState(false);
  const progressbar = useRef()
  const animationref = useRef()
  // Main function to handle both play and pause operations
  const playPause = () => {
    if (isPlaying) {
      // Pause the song if it is playing
      audio.pause();
      cancelAnimationFrame(animationref.current)
    } else {
      // Play the song if it is paused
      audio.play();
      animationref.current = requestAnimationFrame(whileplaying)
    }

    // Change the state of song
    setIsPlaying(!isPlaying);
  };
  const whileplaying=()=>{
    progressbar.current.value= audio.currentTime;
    changeplayercurrenttime()
    animationref.current = requestAnimationFrame(whileplaying)
  }

  useEffect(() => {
    const seconds = Math.floor(audio.duration);
    setDuration(seconds);
    progressbar.current.max = seconds;
  }, [audio?.loadedmetadata, audio?.readyState]);

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`; // Fix the typo here
    return `${returnedMinutes}:${returnedSeconds}`; // Remove extra space
  };
  const changerange=()=>{
    audio.currentTime=progressbar.current.value;
    changeplayercurrenttime()
  }
  const changeplayercurrenttime=()=>{
    progressbar.current.style.setProperty('--seek-before-width',`${progressbar.current.value /duration *100}%`)
    setCurrentTime(progressbar.current.value)
  }

  return (
    <Grid container style={{position:'fixed',bottom:'0',color:'white',height:'100px'}} justifyContent={"center"} alignItems={'center'} spacing={5}>
      {/* Show state of song on website */}
      <Grid item>
        {isPlaying ? (
          <Pause onClick={playPause} />
        ) : (
          <Play onClick={playPause} />
        )}
      </Grid>
      <Grid item>{calculateTime(currenttime)}
        </Grid>
      <Grid item >
        <input type="range" className='progressbar' defaultValue='0'ref={progressbar} onChange={changerange} style={{width:'400px'}}/>
      </Grid >
      <Grid item>
      <div>{duration && !isNaN(duration) && calculateTime(duration)}</div>
      </Grid>
    </Grid>
  );
};

export default Playsong;
