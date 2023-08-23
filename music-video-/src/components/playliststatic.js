import { Container } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Track } from "./track";

const Playlisthomepage = (album) => {
  const arr = album;

  return (
    <Link to={'/playlist'} state={{id:arr.id,playlistimage:arr.link,playlistname:arr.album}} style={{textDecoration:'none'}}>
      <div className="boxc">
        <div>
          <img
            src={arr.link}
            alt="album"
            style={{ width: "100%" }}
            className="cover" 
          />
          <div
            className="home-text-songcard"
            style={{ overflow: "hidden", width: "230px", height: "22px" }}
          >
            {arr.album}
          </div>
          
        </div>
      </div>
    </Link>
  );
};
export default Playlisthomepage; 
