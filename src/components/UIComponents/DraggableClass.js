/**
 * DraggableClass Component
 * -------------------------------------
 * This component is similar to ClassEntity, but with improved styling and labels.
 * It uses React DnD to allow dragging and dropping within the diagram.
 * The parent (CanvasArea) listens to onDragEnd to update positions in Redux.
 */

import React from "react";
import { useDrag } from "react-dnd";
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardHeader,
  CardContent,
  Tooltip,
  useTheme,
  Divider,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const DraggableClass = ({
  id,
  name,
  x,
  y,
  attributes,
  methods,
  deleteClass,
  onEdit,
  onDragEnd,
}) => {
  const theme = useTheme();

  // Set up drag logic using React DnD
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "CLASS",
    item: { id, x, y },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item, monitor) => {
      const delta = monitor.getDifferenceFromInitialOffset();
      if (delta) {
        handleDragEnd(delta);
      }
    },
  }), [id, x, y, onDragEnd]);

  // Slightly reduce opacity if dragging
  const opacity = isDragging ? 0.7 : 1;

  const handleDragEnd = (delta) => {
    const newX = x + delta.x;
    const newY = y + delta.y;

    onDragEnd({ x: newX, y: newY });
  };

  return (
    <Tooltip title="Click to edit the class">
      <Box
        ref={drag}
        sx={{
          position: 'absolute',
          left: x,
          top: y,
          width: 200,
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 2,
          cursor: 'move',
          userSelect: 'none',
          zIndex: isDragging ? 1000 : 1,
        }}
      >
        <CardHeader
          title={
            <Typography variant="h6" noWrap>
              {name}
            </Typography>
          }
          action={
            <Box>
              <Tooltip title="Edit Class">
                <IconButton size="small" onClick={onEdit}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Class">
                <IconButton size="small" onClick={() => deleteClass(id)}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          }
          sx={{
            paddingBottom: 0,
            "& .MuiCardHeader-content": {
              padding: 0,
            },
          }}
        />
        <Divider />

        <CardContent sx={{ paddingTop: 1, paddingBottom: 1 }}>
          <Typography variant="subtitle2" color="textSecondary">
            Attributes
          </Typography>
          {attributes && attributes.length > 0 ? (
            attributes.map((attr, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 0.5,
                }}
              >
                <Box>
                  {attr.access} {attr.name}
                </Box>
                <Box color="textSecondary">{attr.type}</Box>
              </Typography>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No attributes
            </Typography>
          )}
        </CardContent>
        <Divider />

        <CardContent sx={{ paddingTop: 1, paddingBottom: 1 }}>
          <Typography variant="subtitle2" color="textSecondary">
            Methods
          </Typography>
          {methods && methods.length > 0 ? (
            methods.map((method, index) => (
              <Typography
                key={index}
                variant="body2"
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  mt: 0.5,
                }}
              >
                <Box>
                  {method.access} {method.name}()
                </Box>
                <Box color="textSecondary">{method.returnType}</Box>
              </Typography>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              No methods
            </Typography>
          )}
        </CardContent>
      </Box>
    </Tooltip>
  );
};

export default DraggableClass;
