import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const TrackDetail=({id,albumname,trackname,albumimage})=>{
    return( 
        
        <Grid item md={3} sx={{width:200}}>
            <Link to={'/playtrack'} state={{id:id,trackname:trackname,albumimage:albumimage,albumname:albumname}} style={{ textDecoration: "none" ,color:'white'}}>
            <img src={albumimage} alt="albumimage" style={{width:'200px'}}/>
            <div className="font-regular" style={{color:'#e7e4e4',marginTop:'10px',marginBottom:'4px'}}>{trackname}</div>
            <div className="font-light" style={{color:'#bbb',fontSize:'14px'}}>{albumname}</div>
        </Link>
        </Grid>
       
    )
 
}

export default TrackDetail;