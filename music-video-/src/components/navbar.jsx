import { IconButton, Stack, AppBar, Toolbar, Button,Box } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "./icons/logo.png";
import React from "react";
import { MoonStars, User, CaretLeft, CaretRight } from "phosphor-react";
import "./styles.css";
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';

const Navbar = () => (
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
      <Link to="/" style={{ display: "flex", alignItems: "center" }}>
        <img src={Logo} alt="logo" style={{ height: "75px" }} />
      </Link>
      <Stack direction="row" ml="10vh">
        <IconButton type="submit" sx={{ color: "white" }}>
          <CaretLeft className="caret" />
        </IconButton>
        <IconButton type="submit" sx={{ color: "white" }}>
          <CaretRight className="caret" />
        </IconButton>
      </Stack>
    </Stack>
    <Stack
      direction="row"
      alignItems="center"
      sx={{ justifyContent: "space-between" }}
    >

    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Box sx={{ display: 'flex', alignItems: 'flex-end',backgroundColor:"white",color:"white" }}>
        <SearchIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
        <TextField id="input-with-sx" label="Search" variant="standard" style={{color:"white"}} />
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
);

export default Navbar;
