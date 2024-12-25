/**
 * ClassEntity (Deprecated / Not in active use if replaced by DraggableClass)
 * ------------------------------------------------------------------------------
 * If you're still using ClassEntity somewhere, you can maintain it.
 * It is an alternative version for a draggable class box.
 * If you rely on DraggableClass, you can remove or unify this component.
 */

import React from "react";
import { useDrag } from "react-dnd";
import { Box, Typography, IconButton, Card, CardContent } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ClassEntity = ({
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
  // Configure drag behavior
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: "CLASS",
      item: { id, x, y },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const delta = monitor.getDifferenceFromInitialOffset();
        if (delta) {
          onDragEnd(delta);
        }
      },
    }),
    [id, x, y, onDragEnd]
  );

  // Vary styling if dragging
  const opacity = isDragging ? 0.5 : 1;

  return (
    <Card
      ref={drag}
      sx={{
        position: "absolute",
        left: x,
        top: y,
        opacity,
        cursor: "move",
        minWidth: 200,
        boxShadow: 3,
      }}
    >
      <CardContent>
        {/* Class header section */}
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Typography variant="h6">{name}</Typography>
          <Box>
            <IconButton size="small" onClick={onEdit}>
              <EditIcon />
            </IconButton>
            <IconButton size="small" onClick={() => deleteClass(id)}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Box>

        {/* Class attributes */}
        <Box sx={{ mt: 1 }}>
          <Typography variant="subtitle2">Attributs:</Typography>
          {attributes && attributes.length > 0 ? (
            attributes.map((attr, index) => (
              <Typography key={index} variant="body2">
                {attr.type} {attr.name}
              </Typography>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              Aucun attribut
            </Typography>
          )}
        </Box>

        {/* Class methods */}
        <Box sx={{ mt: 1 }}>
          <Typography variant="subtitle2">Méthodes:</Typography>
          {methods && methods.length > 0 ? (
            methods.map((method, index) => (
              <Typography key={index} variant="body2">
                {method.returnType} {method.name}()
              </Typography>
            ))
          ) : (
            <Typography variant="body2" color="textSecondary">
              Aucune méthode
            </Typography>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ClassEntity;
