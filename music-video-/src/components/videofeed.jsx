import React, { useEffect, useState } from "react";
import { Grid } from "@mui/material";
import axios from "axios";
import {trend} from './trend';
import { Link } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import './styles.css'
const Videofeed = () => {
  const [containers,setContainer] = useState([])
  const [render,setrender]=useState(true)
  const [fetch,setfetch]=useState(false)
  const [countrys, setcountry] = useState('US');

  const handleChange = async (event) => {
    setcountry(event.target.value);
    setrender(true)
  };
  const trending=async()=>{
    if(render){
    try{
      const response = await axios.get('http://localhost:5000/trend',{
        params:{
          country:countrys
        }
      });
      setContainer(response.data.data)
      setrender(false)
      setfetch(true)
    }catch(error){
      console.log(error)
    }
  }

  }
  useEffect(()=>{
    trending();
  },[render,countrys])
  return(
    <div style={{color:"white"}}>
      <Grid container justifyContent={'space-between'}>
        <Grid item><h3>Trending</h3></Grid>
        <Grid item style={{backgroundColor:'black'}}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label" style={{color:'white'}}>Country</InputLabel>
          <Select labelId="demo-simple-select-label" id="demo-simple-select" value={countrys} label="Country"
               onChange={handleChange} style={{color:'white'}} className="select">
              <MenuItem value={'US'} style={{backgroundColor:'black',color:'white'}}>US</MenuItem>
              <MenuItem value={'IN'} style={{backgroundColor:'black',color:'white'}}>India</MenuItem>
          </Select>
        </FormControl>
        
        </Grid>
      </Grid>

    
       {fetch && (
        <Grid container spacing={2}>
         {containers.map((video)=>(
          
          <Grid item key={video.videoId} md={4}>
            <Link to={'/video'} state={{id:video.videoId}} style={{textDecoration:'none'}}>
          <img src={video.thumbnails[1].url} alt='videoimage' style={{width:'300px'}}/>
          <div className="video-title">{video.title}</div>
          </Link>
          </Grid>
          
        ))}
        </Grid>
       )}

    </div>
  );
};
export default Videofeed;
