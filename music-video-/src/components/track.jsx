import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { details } from "./details";
import Trackcard from "./trackcard";
import axios from "axios";
import {
  Play, 
  Pause,
  ShareNetwork,
  UploadSimple,
  DotsThreeVertical,
} from "phosphor-react";
import { Grid } from "@mui/material";

const Track = ({ turl,playing,imageurl,albumfun,titlefun }) => {
  const { id } = useParams();
  const [detail, setdetail] = useState([]);
  const [url, seturl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [track, settrack] = useState([]);
  const [fetch, setfetch] = useState(true);
  const [currentlyPlayingIndex, setCurrentlyPlayingIndex] = useState(-1); // Track index that is currently playing
  const [isplaying, setisplaying] = useState(false);
  const [audio, setAudioState] = useState("");


  const play = async (search, index) => {
    try {
      const name = search+" "+detail.name;
      const response = await axios.get("http://localhost:5000/get-audio", {
        params: {
          music: name,
        },
      });
  
      const file = response.data;
      setAudioState(file.data.soundcloudTrack.audio[0].url);
      turl(file.data.soundcloudTrack.audio[0].url);
   
      if (currentlyPlayingIndex === index) {
        setCurrentlyPlayingIndex(-1); 
        setisplaying(false)// Pause the currently playing track
        
      } else {
        setCurrentlyPlayingIndex(index); // Play the clicked track
        setisplaying(true)
        
        
      }

      playing(isplaying);
      imageurl(url)
      albumfun(detail.name)
      titlefun(search)
      console.log(isplaying)
  
      
    } catch (error) {
      console.log(error);
    }
  };
  

  const Albummeta = async () => {
    if (fetch) {
      try {
        const response = await axios.get("http://localhost:5000/album-metadata", {
          params: {
            ids: id,
          },
        });
        const file = response.data;
        setdetail(file.data);
        seturl(file.data.cover[0].url);
        setfetch(false);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchAPI = async () => {
    if (isLoading) {
      try {
        const response = await axios.get("http://localhost:5000/get-tracks", {
          params: {
            ids: id,
          },
        });
        const file = response.data;
        setIsLoading(false);
        settrack(file.data.tracks.items);
      } catch (error) {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    fetchAPI();
    Albummeta();
  }, [fetch]);

  

  return (
    <div className="text">
      <Grid container alignItems="flex-end" spacing={2}>
        <Grid  item>
        <img
          src={url}
          alt="albumimage"
          style={{ width: "252px", height: "255px" }}
        />
        </Grid>

        <Grid item>
          
          <div className='font-light' style={{ fontSize: "15px" }}>Album</div>
          <div className="font-medium" style={{fontSize:'25px',marginTop:'5px'}}>{detail.name}</div>
          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap",marginTop:'5px' }}
          >
            <div className="font-light" style={{marginRight:'6px'}}>
              {detail.artists?.map((artist, id) => {
                return <div key={id}>{artist.name} </div>;
              })}
            </div>
            <div className="dot" style={{marginRight:'6px'}}></div>
            <div className="font-light" style={{marginRight:'6px'}}>2015</div>
            <div className="dot" style={{marginRight:'6px'}}></div>
            <div className="font-light" style={{marginRight:'6px'}}>{detail.trackCount} songs</div>
          </div>
        </Grid>
      </Grid>
      <div>
        {track ? (
          <div>
            {track?.map((temp, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  flexDirection: "row",
                  margin: "25px 10px",
                  alignItems: "center",
                }}
              >
                {currentlyPlayingIndex === index && isplaying ? (
      <Pause
        size={30}
        color="#fafafa"
        weight="fill"
        style={{ flexBasis: "10%" }}
        onClick={() => play(temp.name, index)}
      />
    ) : (
      <Play
        size={30}
        color="#fafafa"
        weight="fill"
        style={{ flexBasis: "10%" }}
        onClick={() => play(temp.name, index)}
      />
    )}
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
          <div>Loading</div>
        )}
      </div>
    </div>
  );
};

export default Track;
