import { Box ,Grid} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const PlaylistSearch=({id,albumname,albumimage})=>{
    return(
        <Grid item md={3}>
        <Link to={'/playlist'} state={{id:id,playlistimage:albumimage,playlistname:albumname}}>
        
            <img src={albumimage} alt="albumimage" style={{width:"200px"}}/>
            <div className="font-regular" style={{color:'#e7e4e4',marginTop:'10px',marginBottom:'4px'}}>{albumname}</div>
            

        
        </Link>
        </Grid> 
    )

}

export default PlaylistSearch;