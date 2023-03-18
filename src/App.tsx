import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Box, AppBar } from "@mui/material";
import Navbar from "./components/Navbar";
import CountriesList from "./components/CountriesList";

function App() {
  return (
    <>
      <Navbar />
      <CountriesList />
    </>
  );
}

export default App;
