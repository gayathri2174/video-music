import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import axios from "axios";
import {trend} from './trend';
import { Link } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './styles.css';
import LoadingSpinner from "./Loading";

const Videofeed = () => {
  const [containers,setContainer] = useState([])
  const [isLoading, setIsLoading] = useState(true);
  const [render,setrender]=useState(true)
  const [fetch,setfetch]=useState(false)
  const [countrys, setcountry] = useState('US');
  const [error,setError] = useState('')
  const handleChange = async (event) => {
    setcountry(event.target.value);
    setrender(true)
  };
  const trending=async()=>{
    if(render){
    try{
      setIsLoading(true)
      const response = await axios.get('http://localhost:5000/trend',{
        params:{
          country:countrys
        }
      });
       setTimeout(() => {
        setContainer(response.data.data)
        setrender(false)
        setfetch(true)
        setIsLoading(false)
      }, 3000);
      
    }catch(error){
      console.log(error)
      setError('Unable to fetch')
      setIsLoading(false)
    }
  }

  }
  useEffect(()=>{
    trending();
  },[render,countrys])

  const Trending= (
    <div style={{color:"white"}}>
      <Grid container justifyContent={'space-between'}>
        <Grid item><h3>Trending</h3></Grid>
        <Grid item style={{backgroundColor:'black'}}>
        <FormControl fullWidth style={{backgroundColor:'black',width:'100px'}}>
          <InputLabel id="demo-simple-select-label" style={{color:'white',backgroundColor:'black',width:'100px'}}>Country</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={countrys} label="Country"
               onChange={handleChange} style={{color:'white',backgroundColor:'black'}} className="select">
              <MenuItem value={'US'} style={{backgroundColor:'black',color:'white',width:'100px'}} className="menuc">US</MenuItem>
              <MenuItem value={'IN'} style={{backgroundColor:'black',color:'white'}}>India</MenuItem>
          </Select>
        </FormControl>
        
        </Grid>
      </Grid>

    
       {fetch && (
        <Grid container spacing={2}>
         {containers.map((video)=>(
          
          <Grid item key={video.videoId} md={4}>
            <Link to={'/video'} state={{id:video.videoId}} style={{textDecoration:'none',color:'#c6c2c2'}}>
          <img src={video.thumbnails[1].url} alt='videoimage' style={{width:'300px'}}/>
          <div className="video-title">{video.title}</div>
          </Link>
          </Grid>
          
        ))}
        </Grid>
       )}

    </div>

  )
  return(
    <div>
      {isLoading ? <LoadingSpinner /> : Trending}
      {error && <div style={{color:'white'}} className="error">{error}</div>}
    </div>
  );
};
export default Videofeed;
