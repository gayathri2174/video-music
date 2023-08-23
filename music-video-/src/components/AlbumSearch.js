import { Box ,Grid} from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const AlbumSearch=({id,albumname,albumimage})=>{
    return(
        <Grid item md={3}>
        <Link to={`/track/${id}`} style={{ textDecoration: "none" ,color:'white'}}>
        
            <img src={albumimage} alt="albumimage" style={{width:"200px"}}/>
            <h5>{albumname}</h5>
            

        
        </Link>
        </Grid> 
    )

}

export default AlbumSearch;