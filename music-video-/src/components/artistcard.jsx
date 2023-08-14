import { Container } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { Track } from "./track";

const Artistcard = (album) => {
  const arr = album;

  return (
    <Link to={`/track/${arr.id}`} style={{ textDecoration: "none" }}>
      <div className="boxc">
        <div>
          <img
            src={arr.link}
            alt="album"
            style={{ width: "100%", borderRadius: "50%", height: "193px" }}
          />
          <div
            className="home-text-songcard"
            style={{
              overflow: "hidden",
              width: "230px",
              height: "22px",
              textAlign: "center",
              marginTop: "5%"
            }}
          >
            {arr.name}
          </div>
        </div>
      </div>
    </Link>
  );
};
export default Artistcard;
