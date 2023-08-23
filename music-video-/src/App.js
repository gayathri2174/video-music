import React, { useEffect } from "react";
import { useState } from "react";
import { Navbar, Feed, Videofeed, Searchfeed, SideBar,SearchPage, PlayTrack,Playsong ,PlayVideo,Genre,Playlist} from "./components";
import Track from "./components/track.jsx";
import { Box, Stack } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App=()=>{
  const [url,seturl] = useState('')
  const [image,setimage] = useState('')
  const [title,settitle] = useState('')
  const [album,setalbum] = useState('')
 
  const [isPlaying,setIsPlaying] = useState(false)
  const playing=(isPlaying)=>{
    setIsPlaying(isPlaying) 
    console.log(isPlaying)
  }
  const turl=(url)=>{
    
    seturl(url);
    console.log(url)
  }
  const imageurl=(image)=>{
    
    setimage(image);
    console.log(image)
  }
  const titlefun=(title)=>{
    
    settitle(title);
    console.log(title)
   
  }
  const albumfun=(album)=>{
    
    setalbum(album);
    console.log(album)
   
  }
  
  useEffect(()=>{

  },[isPlaying,url])
   
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
          <Route path="/track/:id" element={<Track turl={turl} playing={playing} imageurl={imageurl} albumfun={albumfun} titlefun={titlefun}/>} />
          <Route path="/playtrack" element={<PlayTrack turl={turl} playing={playing}/>} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/video" element={<PlayVideo />} />
          <Route path="/trending" element={<Genre/>} />
          <Route path="/playlist" element={<Playlist turl={turl} playing={playing}/>} />
        </Routes>
      </Box>
    </Stack>
    <Playsong audiourl={url} isplaying={isPlaying} imgurl={image} albumname={album} titlename={title}/>
    
  </BrowserRouter>
  )
      
};

export default App;
