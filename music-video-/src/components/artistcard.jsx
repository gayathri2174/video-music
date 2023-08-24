import { Container } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Track } from "./track";

const Artistcard = ({album}) => {
  console.log(album)
  /*

  <Link to={'/video'} state={{id:video.videoId}} style={{textDecoration:'none',color:'#c6c2c2'}}>
          <img src={video.thumbnails[1].url} alt='videoimage' style={{width:'300px'}}/>
          <div className="video-title">{video.title}</div>
          </Link>

  */

  return (

    <Link to={`/video`} style={{ textDecoration: "none" }}>
      <div className="boxc" style={{marginRight:'90px'}}>
        <div>
          <img
        src={album.thumbnails[1]?.url} alt='videoimage'
        style={{ width: "280px", height: "193px" }}
         />


          <div
            className="home-text-songcard"
            style={{
              width: "230px",
              height: "22px",
              marginTop: "5%"
            }}
          >
            {album.title}
          </div>
        </div>
      </div>
    </Link>
  );
};
export default Artistcard;
