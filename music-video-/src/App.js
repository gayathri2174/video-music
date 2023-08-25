import React, { useEffect } from "react";
import { useState } from "react";
import { Navbar, Feed, Videofeed, Searchfeed, SideBar,SearchPage, PlayTrack,Playsong ,PlayVideo,Genre,Playlist} from "./components";
import Track from "./components/track.jsx";
import { Box, Stack } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App=()=>{
  const [url,seturl] = useState('')
  const [image,setimage] = useState('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASIAAACuCAMAAAClZfCTAAAAV1BMVEUAAADtGyP0HCT3HCXwGyPnGiLkGiLMFx6cEhfIFx2hEhhsDBArBQaZERfEFh1jCw80BggvBQdqDBAoBAYlBAZwDRAjBAViCw4SAgOqExmkExg2BggxBQfyAw1eAAAD+UlEQVR4nO2ZiVIbQQwFJ5A7JAacO/z/dwZjMPZ6dz2HpNYc/QWarup6tXb4/ef67ZvBCiGE2w/X9BWuCTt+vLui73BM2PN31LbIs6Lwb9S2RDgwalsgHDFqm+VY0di2WcIpo7ZzwpTPo7YJZ4pGbVPOFY3aJswpGtt2wryiUdsRC4pGba8sKhrb9sKKolHbnjVFo7Yn1hU91nbVfW2XFI3aLisatUUo6n3bohT1XVucohC+9FtbrKKOty1eUbe1JSjqdduSFPW5bYmKwkN/taUq6nDb0hV1V1uOos5qy1LUV22ZinqqLVtRuOultnxF3dRWoqiT77YyReHhU/u1FSrqobZiRe1vm4Ci1rdNQlHjtckoanrbpBSF22a3TUxRu7UJKmp120QVtbltsoqarE1aUYPbJq+oue82BUWt1aaiqK1tU1IU7tqpTUtRQ7XpKWpm2zQVNbJtqoraqE1ZUQvbpq4o3NRem76i6muzUFT5ttkoqnrbjBTVXJuZonq3zVBRrd9tlooqrc1WUZXbZq2owm0zVxTCfWW1AYpq2zZEUV3bxiiqatsoRSF8rGXbOEXV1AYqqmXbUEWPtVWwbbCi3W+S3iXRiirYNlrQDufbRut5wve20Xae8bxttJsDfmujzbzi9v82WswxTmujtZzisjZaygSP20Y7OcNfbbSRGbzVRvuYw9l3G61jHle10TKWcFQbrWIRP9tGm1jBS220h1V81EZbWMfFttESLnH/Hq+NVnAZvDZaQAT0ryT0+6Ngt41+fSRkbfTbYwG3jX56PNi20Q9PAaqNfnYSzLbRr06E2Db6zcnY10a/OB3zbaMfnINxbfRz8zCtjX5sJpbbRr81m41ZbfRLC7CqjX5nCTffTLaNfmYZJt9t9CNLMaiNfmIxW/Vto18owEa5Nvp9IujWRr9OBtVtox8nheK20U+TQ602+mGCbJV+JaHfJYrOttGvEkajNvpN0ihsG/0kecRrox+kwVfZ2ujnqLAVrY1+jRKStdFvUUOuNvoleohtG/0QTYRqo5+hi0ht9COU+S5QG/0Gdcpro19gQGlt9P0WFG4bfb4NRbXRx1tRUBt9uhn520ZfbkhubfTdpuTVRl9tS9avJPTR1mTURp9sT3Jt9MEAPxNro+9FSKuNvhYipTb6VoqEbaNP5YiujT6UJLI2+kyUuG2jr4SJqY2+EedybfSFPBe3jT7QA7/Wa6PP88FqbfRxTljbNvo2NyxvG32ZI5Zqo+/yxMI/APRZvpitjT7KGzO10Se543zb6IscMq2Nvsclp7XR1/jkZNvoY7xy9N1Gn+KXQ230IY552Tb6Dtfsa6OvcM6uNvoG7zxuG32Cfzb/AfCLcUk4ws2XAAAAAElFTkSuQmCC')
  const [title,settitle] = useState('Helo')
  const [album,setalbum] = useState('World')
 
  const [isPlaying,setIsPlaying] = useState(false)
  const playing=(isPlaying)=>{
    setIsPlaying(isPlaying) 
    console.log('app', isPlaying)
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
