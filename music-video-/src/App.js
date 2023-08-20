import React, { useEffect } from "react";
import { useState } from "react";
import { Navbar, Feed, Videofeed, Searchfeed, SideBar,SearchPage, PlayTrack,Playsong ,PlayVideo,Genre,Playlist} from "./components";
import Track from "./components/track.jsx";
import { Box, Stack } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App=()=>{
  const [url,seturl] = useState('https://scd.dlod.link/?expire=1692562530344&p=5X9vwqz676ZO2Wsdl52d7ToHgQ2bDY_eTwqs0atPcOJ-8xziehtKNl2j22fp-glVS9WKoAyRupFazK1m_FoRjdcw2BJZThFG-J3bcK0Mwg6f2bsciEjW8RNzX2iiEjiZeSUchCPP2UiR8RThOg_jLAz5ZWs5S2BX2VyUj7tan_CmvUq8HQrxApoRRilqBisC&s=AFpSTszuXmoe_YlGczRpWScmwwfj9WQ7aSw4yYqp0_0')
  const [currentTime, setCurrentTime] = useState(0)
  const turl=(url)=>{
    seturl(url);
  }
  console.log(url)
   
  return(
  <BrowserRouter>
    <Navbar />
    <Stack sx={{ flexDirection: "row" }}>
      <Feed />
      <Box 
        pd={2}
        sx={{ 
          flexDirection: "row",
          overflowY: "auto",
          height: "100vh",
          flex: 2,
          padding: "20px",
          backgroundColor: "black",
          flex: "100%"
        }}
      >
        <Routes>
          <Route path="/" exact element={<Searchfeed />} />
          <Route path="/discover" element={<Videofeed />} />
          <Route path="/track/:id" element={<Track turl={turl}/>} />
          <Route path="/playtrack" element={<PlayTrack turl={turl}/>} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/video" element={<PlayVideo />} />
          <Route path="/trending" element={<Genre/>} />
          <Route path="/playlist" element={<Playlist turl={turl}/>} />
        </Routes>
      </Box>
    </Stack>
    <Playsong audiourl={url} />
    
  </BrowserRouter>
  )
      
};

export default App;
