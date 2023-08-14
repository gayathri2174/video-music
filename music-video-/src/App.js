import { Navbar, Feed, Musicfeed, Searchfeed, SideBar } from "./components";
import Track from "./components/track.jsx";
import { Box, Stack } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => (
  <BrowserRouter>
    <Navbar />
    <Stack sx={{ flexDirection: "row" }}>
      <Feed />
      <Box 
        pd={2}
        sx={{
          flexDirection: "row",
          overflowY: "auto",
          height: "100vh",
          flex: 2,
          padding: "20px",
          backgroundColor: "black",
          flex: "100%"
        }}
      >
        <Routes>
          <Route path="/" exact element={<Searchfeed />} />
          <Route path="/discover" element={<Musicfeed />} />
          <Route path="/track/:id" element={<Track />} />
        </Routes>
      </Box>
    </Stack>
  </BrowserRouter>
);

export default App;
