import { IconButton, Stack, AppBar, Toolbar, Button,Box } from "@mui/material";
import { Link,useNavigate } from "react-router-dom";
import Logo from "./icons/logo.png";
import React, { useState } from "react";
import { MoonStars, User, CaretLeft, CaretRight,MagnifyingGlass,List } from "phosphor-react";
import "./styles.css";
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';


 
const Navbar = ({toggle}) => {
  const [searchvalue,setsearchvalue]=useState('');
  const [searchres,setsearchres] = useState('');
  const [render,setrender] = useState(true);
  const navigate=useNavigate();
  const [display,setdisplay]=useState(false)

  const handleclick=()=>{
    toggle(!display)
    setdisplay(!display)
  }

  const redirect=()=>{
    navigate("/search",{
      state:{
        value: searchvalue
      }
    })
  }
  
  return(
  <Stack
    direction="row"
    alignItems="center"
    sx={{
      position: "sticky",
      top: 0,
      justifyContent: "space-between",
      backgroundColor: "black",
      paddingLeft: "2vh",
      paddingRight: "2vh"
    }}
  >
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        display: "flex",
        justifyContent: "space-between"
      }}
    >
      <List size={30} color="#f5f5f5" weight="fill" style={{marginLeft:'5px',cursor:'pointer'}} onClick={handleclick}/>
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img src={Logo} alt="logo" style={{ height: "107px" }} />
      </Link>
      <Stack direction="row" ml="10vh">
        <IconButton type="submit" sx={{ color: "white" }}>
          <CaretLeft />
        </IconButton>
        <IconButton type="submit" sx={{ color: "white" }}>
          <CaretRight  />
        </IconButton>
      </Stack>
    </Stack>
    <Stack
      direction="row"
      alignItems="center"
      sx={{ justifyContent: "space-between" }}
    >

    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end',backgroundColor:"#3d3d3d",color:"white" ,borderRadius:'10px',height:'51px',paddingLeft:'10px'}}>
        <MagnifyingGlass size={25} color="#f5f5f5" onClick={redirect} style={{marginBottom:'10px',marginRight:'10px',cursor:'pointer'}}/>
        <TextField id="filled-basic" label="Search" variant="filled" className="search-box"
        value={searchvalue} 
        onChange={(event) => setsearchvalue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            redirect();
          }
        }}/>
      </Box>
    </Box>
    
      <IconButton type="submit" sx={{ color: "white" }} className="moon">
        <MoonStars />
      </IconButton>
      <IconButton type="submit" sx={{ color: "white" }}>
        <User
          style={{
            backgroundColor: "463C3C",
            borderRadius: "20px",
            padding: "5px"
          }}
        />
      </IconButton>
    </Stack>
    
  </Stack>
  )
};

export default Navbar;
