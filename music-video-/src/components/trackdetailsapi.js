import "./styles.css";
import axios from "axios";
import { useEffect, useState } from "react";
import TrackCard from "./trackcard";

const Trackapi = (props) => {
  const [container, setcontainer] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  //const [count, setcount] = useState("");
  const [track, settrack] = useState([]);

  // setTimeout(() => {
  //    console.log("world");
  // }, 8000);
  const options = {
    method: "GET",
    url: "https://spotify-scraper.p.rapidapi.com/v1/album/tracks",
    params: { 
      albumId: props.id
    },
    headers: {
      "X-RapidAPI-Key": "c118baa328msha135d8b53c62575p1541f2jsne5557f16ccd7",
      "X-RapidAPI-Host": "spotify-scraper.p.rapidapi.com"
    }
  };
  const fetchAPI = async () => {
    if (!isLoading) {
      try {
        const response = await axios.request(options);
        //  setcontainer(response.data);
        console.log(response.data);
        setcontainer(response.data);
        setIsLoading(true);
        settrack(response.data.tracks.items);
      } catch (error) {
        console.error(error);
      }
    }
  };
  useEffect(() => {
    fetchAPI();
  }, [isLoading]);

  setTimeout(() => {
    fetchAPI();
  }, 5000);
  return (
    <div>
      {track ? (
        <div>
          {track?.map((temp) => (
            <TrackCard
            id={temp.id}
              artist={temp.artists}
              name={temp.name}
              time={temp.durationText}
            />
          ))}
        </div>
      ) : (
        <div>world</div>
      )}
    </div>
  );
};
export default Trackapi;
