import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LinkIcon from "@mui/icons-material/Link";
import GroupIcon from "@mui/icons-material/Group";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import CodeIcon from "@mui/icons-material/Code";
import UndoIcon from '@mui/icons-material/Undo';
import RedoIcon from '@mui/icons-material/Redo';

const Navbar = ({
  darkMode,
  onToggleDarkMode,
  onZoomIn,
  onZoomOut,
  onGenerateCode,
  onAddClass,
  onAddRelation,
  onAddGroup,
  onUndo,
  onRedo,
  canUndo,
  canRedo,
}) => {
  return (
    <AppBar position="static" color="primary" elevation={4}>
      <Toolbar variant="dense">
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          UML Class Diagram Editor
        </Typography>

        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Undo">
            <span>
              <IconButton 
                color="inherit" 
                onClick={onUndo}
                disabled={!canUndo}
              >
                <UndoIcon />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title="Redo">
            <span>
              <IconButton 
                color="inherit" 
                onClick={onRedo}
                disabled={!canRedo}
              >
                <RedoIcon />
              </IconButton>
            </span>
          </Tooltip>

          <Tooltip title="Zoom In">
            <IconButton color="inherit" onClick={onZoomIn}>
              <ZoomInIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Zoom Out">
            <IconButton color="inherit" onClick={onZoomOut}>
              <ZoomOutIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Add Class">
            <IconButton color="inherit" onClick={onAddClass}>
              <AddIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Add Relation">
            <IconButton color="inherit" onClick={onAddRelation}>
              <LinkIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Add Group">
            <IconButton color="inherit" onClick={onAddGroup}>
              <GroupIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Generate Code">
            <IconButton color="inherit" onClick={onGenerateCode}>
              <CodeIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"}>
            <IconButton color="inherit" onClick={onToggleDarkMode}>
              {darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
