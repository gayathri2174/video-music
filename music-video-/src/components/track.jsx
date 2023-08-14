import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { details } from "./details";
import Trackcard from "./trackcard";
import Api from "./albumdetailsapi";
import Trackapi from "./trackdetailsapi";

const Track = () => {
  //fetch using api
  //separate track details
  const { id } = useParams();
  console.log("hello");
  const albumdetails = Api(id);
  const detail = albumdetails[0];
  const url = albumdetails[1]; 
  const [container,setContainer] = useState([])
  const metadata= async()=>{
    const axios = require('axios');

    const options = {
      method: 'GET',
      url: 'https://spotify-scraper.p.rapidapi.com/v1/track/metadata',
      params: {
        trackId: id
      },
      headers: {
    'X-RapidAPI-Key': '7853b13684mshdc75038438fbc40p1a797cjsn66b784385c19',
    'X-RapidAPI-Host': 'spotify-scraper.p.rapidapi.com'
      }
    };
    try {
	    const response = await axios.request(options);
	    console.log(response.data);
      setContainer(response.data)
     } catch (error) {
	      console.error(error);
      }
    }
  
  //fetch image, artist name, album name
  return (
    <div className="text">
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-end",
          marginLeft: "20px"
        }}
      >
        <img
          src={url}
          alt="albumimage"
          style={{ width: "252px", height: "255px" }}
        />

        <div>
          <div style={{ fontWeight: "400", fontSize: "15px" }}>Album</div>
          <div>{detail.name}</div>
          <div
            style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}
          >
            <div>
              {detail.artists?.map((artist, id) => {
                return <div key={id}>{artist.name}</div>;
              })}
            </div>
            <div className="dot"></div>
            <div>2015</div>
            <div className="dot"></div>
            <div>{detail.trackCount} songs</div>
          </div>
        </div>
      </div>
      <div>
        <Trackapi id={id} />
      </div>
    </div>
  );
};
export default Track;
