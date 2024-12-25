import React from 'react';
import { IconButton, Tooltip } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const SidebarToggle = ({ isOpen, onClick }) => {
  return (
    <Tooltip title={isOpen ? "Close Sidebar" : "Open Sidebar"}>
      <IconButton
        onClick={onClick}
        sx={{
          position: 'absolute',
          left: isOpen ? 240 : 16,
          top: 64,
          zIndex: 1200,
          backgroundColor: (theme) => theme.palette.background.paper,
          boxShadow: 2,
          '&:hover': {
            backgroundColor: (theme) => theme.palette.action.hover,
          },
        }}
      >
        {isOpen ? <CloseIcon /> : <MenuIcon />}
      </IconButton>
    </Tooltip>
  );
};

export default SidebarToggle; 