import React, { useEffect, useState, useRef } from "react";
import { Play, Pause, FastForward, Rewind } from "phosphor-react";
import { Grid } from "@mui/material";

const Playsong = ({ audiourl, isplaying,imgurl,albumname,titlename }) => {
  const [audio, setAudio] = useState(new Audio());
  const [duration, setDuration] = useState(0);
  const [currenttime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [imageurl,setimageurl] = useState('')
  const [album,setalbum] = useState('')
  const [title,settitle] =useState('')
  
  const progressbar = useRef();
  const animationref = useRef();

  const playPause = () => {
    if (isPlaying) {
      audio.pause();
      cancelAnimationFrame(animationref.current);
    } else {
      audio.play();
      animationref.current = requestAnimationFrame(whileplaying);
    }

    setIsPlaying(!isPlaying);
  };

  const whileplaying = () => {
    progressbar.current.value = audio.currentTime;
    changeplayercurrenttime();
    animationref.current = requestAnimationFrame(whileplaying);
  };

  const changeplayercurrenttime = () => {
    progressbar.current.style.setProperty(
      "--seek-before-width",
      `${(progressbar.current.value / duration) * 100}%`
    );
    setCurrentTime(progressbar.current.value);
  };

  const calculateTime = (secs) => {
    const minutes = Math.floor(secs / 60);
    const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const seconds = Math.floor(secs % 60);
    const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${returnedMinutes}:${returnedSeconds}`;
  };

  const changerange = () => {
    audio.currentTime = progressbar.current.value;
    changeplayercurrenttime();
  };

  useEffect(() => {
    if (audiourl) {
      
     audio.pause();
    cancelAnimationFrame(animationref.current);

    const newAudio = new Audio(audiourl);
    newAudio.addEventListener("loadedmetadata", () => {
      setDuration(Math.floor(newAudio.duration)); 
      progressbar.current.max = Math.floor(newAudio.duration);
    });
    
    // Play the new audio if the component state indicates it should be playing
    if (isPlaying) {
      newAudio.play();
      animationref.current = requestAnimationFrame(whileplaying);
    }

    setAudio(newAudio);
    }
  }, [audiourl]);

  useEffect(() => {
    if (isPlaying) {
      if (audio.paused) {
        audio.play();
        animationref.current = requestAnimationFrame(whileplaying);
      }
    } else {
      audio.pause();
      cancelAnimationFrame(animationref.current);
    }
  }, [isPlaying, audio]);
  

  useEffect(()=>{
    setIsPlaying(isplaying)
  },[isplaying])

  useEffect(()=>{
    console.log("Props received:", albumname, titlename);
    setimageurl(imgurl)
    setalbum(albumname)
    settitle(titlename)
  },[imgurl,albumname,titlename])

  return (
    <Grid
      container
      style={{
        position: "fixed",
        bottom: "0",
        color: "white",
        height: "100px",
        backgroundColor: "black",
      }}
      justifyContent={"center"}
    >
      <Grid item>
        <img src={imageurl} alt="imagealbum" style={{height:'100px'}}/>
      </Grid>
      <Grid item>
        <div className="font-regular">{title}</div>
      </Grid>
      <Grid item>
        <div className="font-light">{album}</div>
      </Grid>
      <Grid item>
        <Rewind size={30} color="#f5f5f5" weight="fill" />
      </Grid>
      <Grid item>
        {isPlaying ? (
          <Pause onClick={playPause} size={30} weight="fill" />
        ) : (
          <Play onClick={playPause} size={30} weight="fill" />
        )}
      </Grid>
      <Grid item>
        <FastForward size={30} color="#f5f5f5" weight="fill" />
      </Grid>
      <Grid item>{calculateTime(currenttime)}</Grid>
      <Grid item>
        <input
          type="range"
          className="progressbar"
          defaultValue="0"
          ref={progressbar}
          onChange={changerange}
          style={{ width: "400px" }}
        />
      </Grid>
      <Grid item>
        <div>{duration && !isNaN(duration) && calculateTime(duration)}</div>
      </Grid>
    </Grid>
  );
};

export default Playsong;
