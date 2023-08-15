import axios from "axios";
import { useEffect, useState } from "react";

export default function Api(id) {
  const options = {
    method: "GET", 
    url: "https://spotify-scraper.p.rapidapi.com/v1/album/metadata",
    params: {
      albumId: id 
    },
    headers: {
      "X-RapidAPI-Key": "2e87ac32cfmshbbe7b492ebe9c20p12daf1jsnd4ad019388c7",
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
