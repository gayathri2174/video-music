import React, { useEffect } from "react";
import { useState } from "react";
import { Navbar, Feed, Musicfeed, Searchfeed, SideBar,SearchPage, PlayTrack,Playsong } from "./components";
import Track from "./components/track.jsx";
import { Box, Stack } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App=()=>{
  const [url,seturl] = useState('')
  const turl=(url)=>{
    seturl(url);
  }
  console.log('APP')
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
          <Route path="/discover" element={<Musicfeed />} />
          <Route path="/track/:id" element={<Track turl={turl}/>} />
          <Route path="/playtrack" element={<PlayTrack turl={turl}/>} />
          <Route path="/search" element={<SearchPage />} />
        </Routes>
      </Box>
    </Stack>
    <Playsong audiourl={url}/>
    
  </BrowserRouter>
  )
      
};

export default App;
