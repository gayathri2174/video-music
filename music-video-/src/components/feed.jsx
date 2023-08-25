import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import SideBar from "./sidebar";
import Searchfeed from "./searchfeed";

const Feed = ({display}) => {
  const [selectedCategory, setSelectedCategory] = useState("Home");
  return (
    <Box className="sidebar" sx={{display: display ? 'block' : 'block'}}>
      <SideBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        display={display}
      />
    </Box> 
  );
};

export default Feed;
