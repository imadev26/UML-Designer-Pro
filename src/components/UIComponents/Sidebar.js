/**
 * Sidebar Component
 * -------------------------------------
 * Displays navigation and lists of existing Classes, Relations, and Groups.
 * Contains undo/redo buttons, as well as a reset button for clearing the diagram.
 */

import React from 'react';
import { 
  Box, 
  Typography, 
  List, 
  ListItem, 
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Sidebar = ({ 
  classes, 
  relations, 
  groups,
  onEditClass,
  onDeleteClass,
  onEditRelation,
  onDeleteRelation,
  onEditGroup,
  onDeleteGroup
}) => {
  return (
    <Box sx={{ p: 2 }}>
      {/* Classes Section */}
      <Typography variant="h6" gutterBottom>
        Classes
      </Typography>
      <List>
        {classes.map((cls) => (
          <ListItem
            key={cls.id}
            sx={{
              mb: 1,
              bgcolor: 'background.paper',
              borderRadius: 1,
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
            secondaryAction={
              <Box>
                <IconButton size="small" onClick={() => onEditClass(cls)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => onDeleteClass(cls.id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            }
          >
            <ListItemText primary={cls.name} />
          </ListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Relations Section */}
      <Typography variant="h6" gutterBottom>
        Relations
      </Typography>
      <List>
        {relations.map((rel) => {
          const sourceClass = classes.find(c => c.id === rel.source);
          const targetClass = classes.find(c => c.id === rel.target);
          return (
            <ListItem
              key={rel.id}
              sx={{
                mb: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
              secondaryAction={
                <Box>
                  <IconButton size="small" onClick={() => onEditRelation(rel)}>
                    <EditIcon fontSize="small" />
                  </IconButton>
                  <IconButton size="small" onClick={() => onDeleteRelation(rel.id)}>
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              }
            >
              <ListItemText 
                primary={`${sourceClass?.name || 'Unknown'} → ${targetClass?.name || 'Unknown'}`}
                secondary={rel.type}
              />
            </ListItem>
          );
        })}
      </List>

      <Divider sx={{ my: 2 }} />

      {/* Groups Section */}
      <Typography variant="h6" gutterBottom>
        Groups
      </Typography>
      <List>
        {groups.map((group) => (
          <ListItem
            key={group.id}
            sx={{
              mb: 1,
              bgcolor: 'background.paper',
              borderRadius: 1,
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
            secondaryAction={
              <Box>
                <IconButton size="small" onClick={() => onEditGroup(group)}>
                  <EditIcon fontSize="small" />
                </IconButton>
                <IconButton size="small" onClick={() => onDeleteGroup(group.id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Box>
            }
          >
            <ListItemText 
              primary={group.name}
              secondary={`${group.members?.length || 0} members`}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default Sidebar;
