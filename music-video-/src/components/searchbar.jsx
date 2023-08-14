import { Paper, IconButton } from "@mui/material";
import { MagnifyingGlass } from "phosphor-react";
import "./styles.css";

const SearchBar = () => {
  return (
    <Paper
      className="paper"
      component="form"
      onSubmit={() => {}}
      sx={{
        borderRadius: 25,
        pl: 2,
        position: "sticky",
        boxShadow: "none",
        mr: { sm: 5 },
        backgroundColor: "#372D2D",
        height: "auto",
        alignItems: "center"
      }}
    >
      <input
        className="search-bar"
        placeholder="What you wish?"
        type="text"
        onChange={() => {}}
      />
      <IconButton
        className="glass"
        type="submit"
        sx={{ p: "5px", color: "#CECECE", pr: "10px" }}
      >
        <MagnifyingGlass />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
