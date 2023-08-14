import React from "react";
import { Link } from "react-router-dom";

const TrackDetail=({id,albumname,albumimage})=>{
    return(
        <Link to={`/track/${id}`} style={{ textDecoration: "none" }}>
        <div>
            <img src={albumimage} alt="albumimage"/>
            <h5>{albumname}</h5>

        </div>
        </Link>
    )

}

export default TrackDetail;