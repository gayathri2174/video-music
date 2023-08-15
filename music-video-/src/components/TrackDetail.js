import { Grid } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const TrackDetail=({id,albumname,trackname,albumimage})=>{
    return(
        
        <Grid item md={3} sx={{width:200}}>
            <Link to={'/playtrack'} state={{id:id,trackname:trackname,albumimage:albumimage,albumname:albumname}} style={{ textDecoration: "none" }}>
            <img src={albumimage} alt="albumimage" style={{width:'200px'}}/>
            <h5>{albumname}</h5>
        </Link>
        </Grid>
       
    )
 
}

export default TrackDetail;