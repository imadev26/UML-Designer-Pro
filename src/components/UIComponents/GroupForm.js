// src/components/UIComponents/GroupForm.js
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
} from "@mui/material";
import { useSelector } from "react-redux";

/**
 * GroupForm Component
 * -------------------------------------
 * Dialog for adding or modifying a group of classes.
 * The user chooses a group name and selects which classes belong to it.
 */

const GroupForm = ({ open, handleClose, handleSave, initialData }) => {
  // Pull all classes to display checkboxes
  const classes = useSelector((state) => state.editor.classes);

  const [name, setName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  // If editing, fill fields
  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setSelectedMembers(initialData.members);
    } else {
      setName("");
      setSelectedMembers([]);
    }
  }, [initialData]);

  /**
   * Handles toggling membership of a class in the selectedMembers array
   * @param {string} id - The ID of the class to toggle
   */
  const handleToggleMember = (id) => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers(selectedMembers.filter((memberId) => memberId !== id));
    } else {
      setSelectedMembers([...selectedMembers, id]);
    }
  };

  /**
   * Validates form fields and calls handleSave with the result
   */
  const onSave = () => {
    if (name.trim() === "") {
      alert("Le nom du groupe ne peut pas être vide.");
      return;
    }

    if (selectedMembers.length === 0) {
      alert("Le groupe doit avoir au moins un membre.");
      return;
    }

    const groupData = {
      name,
      members: selectedMembers,
    };

    handleSave(groupData);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? "Modifier Groupe" : "Ajouter Groupe"}</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            {/* Group name */}
            <Grid item xs={12}>
              <TextField
                label="Nom du Groupe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
              />
            </Grid>

            {/* Members checkboxes */}
            <Grid item xs={12}>
              <Typography variant="h6">Membres</Typography>
              <FormGroup>
                {classes.map((cls) => (
                  <FormControlLabel
                    key={cls.id}
                    control={
                      <Checkbox
                        checked={selectedMembers.includes(cls.id)}
                        onChange={() => handleToggleMember(cls.id)}
                      />
                    }
                    label={cls.name}
                  />
                ))}
              </FormGroup>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          Annuler
        </Button>
        <Button onClick={onSave} variant="contained" color="primary">
          Sauvegarder
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default GroupForm;
