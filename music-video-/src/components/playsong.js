import React, { useEffect, useState, useRef } from "react";
import { Play, Pause } from "phosphor-react";
import { Grid } from "@mui/material";


const Playsong = ({ audiourl }) => {
  const audioRef = useRef(new Audio(audiourl));
  const [isPlaying, setIsPlaying] = useState(false);

  const onPlayPauseClick = () => {
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    const audioElement = audioRef.current;

    if (isPlaying) {
      audioElement.play();
      
    } else {
      audioElement.pause();
    }
  }, [isPlaying]);

  return (
    <div className="audio-player">
      <div className="track-info">
        <Grid container style={{ position: "fixed", bottom: "0" }} spacing={2}>
          <Grid item>
            {isPlaying ? (
              <button
                style={{ backgroundColor: "black" }}
                onClick={onPlayPauseClick}
              >
                <Pause size={30} color="#f5f5f5" weight="fill" />
              </button>
            ) : (
              <button
                style={{ backgroundColor: "black" }}
                onClick={onPlayPauseClick}
              >
                <Play size={30} color="#f5f5f5" weight="fill" />
              </button>
            )}
          </Grid>
          <Grid item>
            <audio src={audiourl} type="audio/mpeg" controls ref={audioRef} />
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Playsong;
