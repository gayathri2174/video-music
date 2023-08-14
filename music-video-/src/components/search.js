// SearchPage.js
import React, { useContext ,useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

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
   Search();
  
};

export default SearchPage;
