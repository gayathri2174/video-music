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

  useEffect(() => {
    setIsPlaying(isplaying)
    if (audiourl) {
      console.log('use1 ',audiourl)
      
     audio.pause();
    cancelAnimationFrame(animationref.current);

    const newAudio = new Audio(audiourl);
    newAudio.addEventListener("loadedmetadata", () => {
      setDuration(Math.floor(newAudio.duration)); 
      progressbar.current.max = Math.floor(newAudio.duration);
    });
    setAudio(newAudio);
    console.log('use1',isPlaying)
    
    // Play the new audio if the component state indicates it should be playing
    /*if (isPlaying) {
      console.log('use1 ',isPlaying)
      audio.play();
      animationref.current = requestAnimationFrame(whileplaying);
    }*/

    
    }
  }, [audiourl,isplaying]);

  useEffect(() => {
    if (isPlaying) {
      console.log('use2 ',isPlaying)
      if (audio.paused) {
        console.log('use2 paused')
        audio.play();
        animationref.current = requestAnimationFrame(whileplaying);
      }
    } else {
      audio.pause();
      cancelAnimationFrame(animationref.current);
    }
  }, [isPlaying, audio]);
  

 /* useEffect(()=>{
    setIsPlaying(isplaying)
    console.log('use3',isPlaying)
  },[isplaying])*/

  useEffect(()=>{
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
      direction="row"
  justifyContent="flex-start"
  alignItems="center"
    >
      <Grid item md={1} style={{margin:'5px',marginLeft:'20px',marginRight:'10px'}}>
        <img src={imageurl} alt="imagealbum" style={{height:'100px',width:'100px',borderRadius:'2px'}}/>
      </Grid>
      <Grid item md={4} style={{marginTop:'-7px'}}>
        <div className="font-regular truncate-text" style={{fontSize:'20px'}}>{title}</div>
      
        <div className="font-light truncate-text" style={{fontSize:'17px'}}>{album}</div>
      </Grid>
      <Grid item md={1}>
        <Grid container spacing={1}>
          <Grid item>
        <Rewind size={27} color="#f5f5f5" weight="fill" />
      </Grid>
      <Grid item>
        {isPlaying ? (
          <Pause onClick={playPause} size={30} weight="fill" />
        ) : (
          <Play onClick={playPause} size={30} weight="fill" />
        )}
      </Grid>
      <Grid item>
        <FastForward size={27} color="#f5f5f5" weight="fill" />
      </Grid>
      </Grid>
      </Grid>
      <Grid item md={1} style={{textAlign:'center'}}>{calculateTime(currenttime)}</Grid>
      <Grid item md={3}>
        <input
          type="range"
          className="progressbar"
          defaultValue="0"
          ref={progressbar}
          onChange={changerange}
          style={{ width: "-webkit-fill-available" }}
        />
      </Grid>
      <Grid item md={1}>
        <div style={{textAlign:'center'}}>{duration && !isNaN(duration) && calculateTime(duration)}</div>
      </Grid>
    </Grid>
  );
};

export default Playsong;
