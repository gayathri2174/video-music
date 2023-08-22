import { Stack } from "@mui/material";
import { library, library_extra } from "./constants";
import "./styles.css";
import { House, Sparkle, Shuffle, ChartBar } from "phosphor-react";
import { Link } from "react-router-dom";

const SideBar = ({ selectedCategory, setSelectedCategory }) => (
  <Stack
    direction="column"
    spacing={0}
    sx={{
      overflowY: "auto",
      height: "100vh",
      flexDirection: { md: "column" },
      marginBlockStart: "10px"
    }}
  >
    <Link to="/" style={{ textDecoration: "none" }}>
      <button
        className="category-btn"
        onClick={() => setSelectedCategory("Home")}
      >
        <span
          className="sidebar-icon"
          style={{ color: "Home" === selectedCategory && "white" }}
        >
          <House size={26} />
        </span>
        <span
          className="sidebar-name"
          style={{ color: "Home" === selectedCategory && "white" }}
        >
          Home
        </span>
      </button>
    </Link>
    <Link to="/discover" style={{ textDecoration: "none" }}>
      <button
        className="category-btn"
        onClick={() => setSelectedCategory("Trend")}
      >
        <span
          className="sidebar-icon"
          style={{ color: "Trend" === selectedCategory && "white" }}
        >
          <ChartBar size={26} />
        </span>
        <span
          className="sidebar-name"
          style={{ color: "Trend" === selectedCategory && "white" }}
        >
          Trend
        </span>
      </button>
    </Link>
    
    <Link to="/trending" style={{ textDecoration: "none" }}>
      <button
        className="category-btn"
        onClick={() => setSelectedCategory("Genre")}
      >
        <span
          className="sidebar-icon"
          style={{ color: "Genre" === selectedCategory && "white" }}
        >
          <Sparkle size={26} />
        </span>
        <span
          className="sidebar-name"
          style={{ color: "Genre" === selectedCategory && "white" }}
        >
          Genre
        </span>
      </button>
    </Link>
    {library.map((category) => (
      <button className="category-btn" key={category.name}>
        <span className="sidebar-icon" style={{ color: "white" }}>
          {category.icon}
        </span>
        <span className="sidebar-name" style={{ color: "white" }}>
          {category.name}
        </span>
      </button>
    ))}
    {library_extra.map((category) => (
      <button
        className="category-btn"
        onClick={() => setSelectedCategory(category.name)}
        key={category.name}
      >
        <span
          className="sidebar-iconextra"
          style={{ color: category.name === selectedCategory && "white" }}
        >
          {category.icon}
        </span>
        <span
          className="sidebar-name"
          style={{ color: category.name === selectedCategory && "white" }}
        >
          {category.name}
        </span>
      </button>
    ))}
  </Stack>
);

export default SideBar;
