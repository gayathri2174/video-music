import React, { useState } from "react";
import axios from "axios";

const Chart=()=>{
    const [fetch,setfetch] = useState(true)
    const [container,setcontainer]  = useState([])
    const getchart=async()=>{
        if(fetch){
            try {
              const response = await axios.get('http://localhost:5000/get-chart',{
                params:{
                  date: '2023-08-19'
                }
              })
             const file= response.data;
              console.log(file.data);
              setcontainer(file.data)
              setfetch(false)
            } catch (error) {
              console.error(error);
            }
          }
    }

}

export default Chart;