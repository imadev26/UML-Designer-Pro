// src/components/UIComponents/DiagramEditor.js
import React from "react";
import CanvasArea from "./CanvasArea";
import { Box } from "@mui/material";

const DiagramEditor = ({ darkMode, setDarkMode }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <CanvasArea darkMode={darkMode} setDarkMode={setDarkMode} />
    </Box>
  );
};

export default DiagramEditor;
