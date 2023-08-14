// SearchPage.js
import React, { useContext ,useEffect,useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import {tracksdetail} from './searchresult'
import AlbumSearch from "./AlbumSearch";

const SearchPage = () => {
    const navigate=useNavigate();
    const location =useLocation();
    const searchvalue= location.state.value;
    const [searchres,setsearchres] = useState('');
    const [render,setrender] = useState(true);
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
         
        }catch(error){
          console.log(error)
        }
      }
      const detailalbum=()=>{
        const len = tracksdetail.albums.items.length;
        if(len>0 && len>5){
            const albumsarray= tracksdetail.albums.items;
            return(
                <div>
                    <h4>Albums</h4>
                    <div>
                    {albumsarray.slice(0, 8).map((track) => (
                        <AlbumSearch id={track.id} albumname={track.name} albumimage={track.cover[0].url}/>
                    ))}
                    </div>

                </div>
            )
        }

        }
        const detailtrack=()=>{
            const len = tracksdetail.tracks.items.length;
            if(len>0 && len>5){
                const trackarray= tracksdetail.tracks.items;
                return(
                    <div>
                        <h4>Tracks</h4>
                        <div>
                        {trackarray.slice(0, 8).map((track) => (
                            <AlbumSearch id={track.id} albumname={track.name} albumimage={track.album.cover[0].url}/>
                        ))}
                        </div>
    
                    </div>
                )
            }
    
          }
      

   return(
    <div style={{color:"white"}}>
        {detailalbum()}
        {detailtrack()}
    </div>
    
   )
  
};

export default SearchPage;
