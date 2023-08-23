// SearchPage.js
import React, { useContext ,useEffect,useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {tracksdetail} from './searchresult'
import AlbumSearch from "./AlbumSearch";
import Grid from '@mui/material/Grid';
import TrackDetail from "./TrackDetail";
import PlaylistSearch from "./PlaylistSearch";

const SearchPage = () => {
    const navigate=useNavigate();
    const location =useLocation();
    const searchvalue= location.state.value;
    const [searchres,setsearchres] = useState('');
    const [render,setrender] = useState(false);
    const Search=async()=>{
        try{
          const response = await axios.get('http://localhost:5000/search',{
            params:{
              search: searchvalue
            }
          })
         const file= response.data;
         console.log(file.data)
         setsearchres(file.data) 
         setrender(true)

         
        }catch(error){
          console.log(error)
        }
      }
      useEffect(()=>{
        Search()
      },[])
      const detailalbum=()=>{
        const len = searchres.albums.items.length;
        console.log('album',len)
        if(len>0 && len>5){
            const albumsarray= searchres.albums.items;
            return(
                <div style={{marginBottom:'25px'}}>
                    <div className="font-regular" style={{fontSize:'25px',margin:'20px',marginLeft:'5px'}}>Albums</div>
                    <Grid container spacing={2}>
                       
                        {albumsarray.slice(0, 8).map((track) => (
                        <AlbumSearch id={track.id} albumname={track.name} albumimage={track.cover[0].url}/>
                    ))}
                        
                    
                    </Grid>

                </div>
            )
        }

        }
        const detailtrack=()=>{
            const len = searchres.tracks.items.length;
            console.log('track',len)
            if(len>0 && len>5){
                const trackarray= searchres.tracks.items;
                return(
                    <div style={{marginBottom:'25px'}}>
                        <div className="font-regular" style={{fontSize:'25px',margin:'20px',marginLeft:'5px'}}>Tracks</div>
                        <Grid container spacing={2}>
                        {trackarray.slice(0, 8).map((track) => (
                            <TrackDetail id={track.id} albumname={track.album.name} trackname={track.name} albumimage={track.album.cover[0].url}/>
                        ))}
                        </Grid>
    
                    </div>
                )
            }
    
          }
        
      /*    const detailgenre=()=>{
            const len = searchres.genres.items.length;
            console.log('genre',len)
            if(len>0 && len>5){
                const playlistarray= searchres.genres.items;
                console.log(playlistarray)
                return(
                    <div style={{marginBottom:'25px'}}>
                        <div className="font-regular" style={{fontSize:'25px',margin:'20px',marginLeft:'5px'}}>Genre</div>
                        <Grid container spacing={2}>
                       
                        {playlistarray.slice(0, 8).map((track) => (
                        <PlaylistSearch id={track.id} albumname={track.name} albumimage={track.image?.[0]?.url}/>
                         ))}

                    </Grid>
    
                    </div> 
                )
            }
            else{
                return(
                    <div>no</div>
                )
            }
           
        }*/

        const detailplaylist=()=>{
            const len = searchres.playlists.items.length;
            console.log('playlist',len)
            if(len>0 && len>5){
                const playlistarray= searchres.playlists.items;
                return(
                    <div style={{marginBottom:'25px'}}>
                        <div className="font-regular" style={{fontSize:'25px',margin:'20px',marginLeft:'5px'}}>Playlist</div>
                        <Grid container spacing={2}>
                       
                        {playlistarray.slice(0, 8).map((track) => (
                        <PlaylistSearch id={track.id} albumname={track.name} albumimage={track.images[0][0].url}/>
                        
                        ))}
                    </Grid>
    
                    </div>
                )
            }
            
        }
      

   return(
    <div style={{color:"white"}}>
        
        {render && detailtrack()}
        {render && detailalbum()}
        {render && detailplaylist()}
       
    </div>
    
   )
  
};

export default SearchPage;
