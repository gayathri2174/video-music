import { useState, useEffect } from "react";
import { Box, Stack, Typography } from "@mui/material";
import SideBar from "./sidebar";
import Searchfeed from "./searchfeed";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("Home");
  return (
    <Box className="sidebar">
      <SideBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
    </Box> 
  );
};

export default Feed;
