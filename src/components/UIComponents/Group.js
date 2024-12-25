/**
 * Group Component
 * -------------------------------------
 * Renders a visual grouping of multiple classes.
 * Each group is displayed as a card that can be positioned in the diagram.
 * Shows group name and the list of member classes.
 */

import React from "react";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  Tooltip,
  useTheme,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const Group = ({
  id,
  name,
  members,
  x,
  y,
  onEdit,
  onDelete,
}) => {
  const theme = useTheme();
  // Pull classes to display each group member's name
  const classes = useSelector((state) => state.editor.classes);

  // Convert member IDs to actual class names
  const memberNames = members
    .map((memberId) => {
      const cls = classes.find((c) => c.id === memberId);
      return cls ? cls.name : "Unknown";
    })
    .join(", ");

  return (
    <Tooltip title="Cliquez pour modifier le groupe">
      <Card
        sx={{
          position: "absolute",
          left: x,
          top: y,
          opacity: 0.95,
          cursor: "pointer",
          minWidth: { xs: 150, sm: 200 },
          boxShadow: 2,
          backgroundColor: theme.palette.primary.light,
          borderRadius: 2,
          transition: "transform 0.2s, box-shadow 0.2s",
          "&:hover": {
            transform: "scale(1.03)",
            boxShadow: 4,
          },
        }}
      >
        <CardContent>
          {/* Header: Group Name and Edit/Delete Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" noWrap>
              Groupe: {name}
            </Typography>
            <Box>
              <Tooltip title="Modifier Groupe">
                <IconButton size="small" onClick={onEdit}>
                  <EditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Supprimer Groupe">
                <IconButton size="small" onClick={onDelete}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>

          {/* List of Group Members */}
          <Box sx={{ mt: 1 }}>
            <Typography variant="subtitle2">Membres:</Typography>
            {members.length > 0 ? (
              <Typography variant="body2" noWrap>
                {memberNames}
              </Typography>
            ) : (
              <Typography variant="body2" color="textSecondary">
                Aucun membre
              </Typography>
            )}
          </Box>
        </CardContent>
      </Card>
    </Tooltip>
  );
};

export default Group;
