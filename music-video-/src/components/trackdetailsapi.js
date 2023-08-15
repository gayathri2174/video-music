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
 /* const options = {
    method: "GET",
    url: "https://spotify-scraper.p.rapidapi.com/v1/album/tracks",
    params: { 
      albumId: props.id
    },
    headers: {
      "X-RapidAPI-Key": '8f26eecff1msh5fb17874cc3ec1cp1259f3jsne1a4bd11f2ba',
      "X-RapidAPI-Host": "spotify-scraper.p.rapidapi.com"
    }
  };*/
  const fetchAPI = async () => {
    if (!isLoading) {
      try {
        const response = await axios.get('http://localhost:5000/get-tracks',{
          params:{
            id: props.id
          }
        })
       const file= response.data;
        console.log(file.data);
        setcontainer(file.data);
        setIsLoading(true);
        settrack(file.data.tracks.items);
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
