import axios from "axios";
import { useEffect, useState } from "react";

export default function Api(id) {
  const options = {
    method: "GET", 
    url: "https://spotify-scraper.p.rapidapi.com/v1/album/metadata",
    params: {
      albumId: id // '0P3oVJBFOv3TDXlYRhGL7s'
    },
    headers: {
      "X-RapidAPI-Key": "c118baa328msha135d8b53c62575p1541f2jsne5557f16ccd7",
      "X-RapidAPI-Host": "spotify-scraper.p.rapidapi.com"
    }
  };
  const [container, setcontainer] = useState([]);
  const [url, seturl] = useState("");
  //`${BASE_URL}/${url}`,
  const fetchFromAPI = async () => {
    try {
      const response = await axios.request(options);
      setcontainer(response.data);
      seturl(response.data.cover[0].url);
    } catch (error) {
      console.error(error);
    }
  };

  fetchFromAPI();
  return [container, url];
}
