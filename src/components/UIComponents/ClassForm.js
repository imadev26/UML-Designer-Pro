/**
 * ClassForm Component
 * -------------------------------------
 * Dialog for adding or modifying a class entity.
 * - Collects class name, attributes, and methods
 * - Supports multiple attributes and methods, each with type and access level
 */

import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Box,
  MenuItem,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

// Access levels and possible Java types for demonstration
const accessModifiers = ["private", "protected", "public", "default"];
const javaTypes = ["int", "float", "double", "char", "boolean", "String"];

const ClassForm = ({ open, handleClose, handleSave, initialData }) => {
  const [name, setName] = useState("");
  const [attributes, setAttributes] = useState([]);
  const [methods, setMethods] = useState([]);

  // Load data if editing an existing class
  useEffect(() => {
    if (initialData) {
      setName(initialData.name || "");
      setAttributes(initialData.attributes || []);
      setMethods(initialData.methods || []);
    } else {
      setName("");
      setAttributes([]);
      setMethods([]);
    }
  }, [initialData]);

  /**
   * Adds a new attribute to the attributes array
   */
  const handleAddAttribute = () => {
    setAttributes([
      ...attributes,
      { name: "", type: "String", access: "private" },
    ]);
  };

  /**
   * Updates a specific field (field can be 'name', 'type', or 'access') of an attribute
   */
  const handleAttributeChange = (index, field, value) => {
    const newAttributes = [...attributes];
    newAttributes[index][field] = value;
    setAttributes(newAttributes);
  };

  /**
   * Removes an attribute from the list
   */
  const handleRemoveAttribute = (index) => {
    const newAttributes = [...attributes];
    newAttributes.splice(index, 1);
    setAttributes(newAttributes);
  };

  /**
   * Adds a new method to the methods array
   */
  const handleAddMethod = () => {
    setMethods([...methods, { name: "", returnType: "void", access: "public" }]);
  };

  /**
   * Updates a specific field of a method
   */
  const handleMethodChange = (index, field, value) => {
    const newMethods = [...methods];
    newMethods[index][field] = value;
    setMethods(newMethods);
  };

  /**
   * Removes a method from the list
   */
  const handleRemoveMethod = (index) => {
    const newMethods = [...methods];
    newMethods.splice(index, 1);
    setMethods(newMethods);
  };

  /**
   * Checks validity and calls handleSave with the final data
   */
  const onSave = () => {
    // Simple validation
    if (name.trim() === "") {
      alert("Le nom de la classe ne peut pas être vide.");
      return;
    }

    for (let attr of attributes) {
      if (attr.name.trim() === "") {
        alert("Tous les attributs doivent avoir un nom.");
        return;
      }
    }
    for (let method of methods) {
      if (method.name.trim() === "") {
        alert("Toutes les méthodes doivent avoir un nom.");
        return;
      }
    }

    // Prepare final data
    const classData = {
      name,
      attributes,
      methods,
      id: initialData ? initialData.id : undefined,
      x: initialData ? initialData.x : 100,
      y: initialData ? initialData.y : 100,
    };

    handleSave(classData);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
      {/* Dialog Title changes if editing vs. creating */}
      <DialogTitle>{initialData ? "Modifier Classe" : "Ajouter Classe"}</DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            {/* Class Name Field */}
            <Grid item xs={12}>
              <TextField
                label="Nom de la Classe"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                fullWidth
              />
            </Grid>

            {/* Attributes Section */}
            <Grid item xs={12}>
              <Typography variant="h6">Attributs</Typography>
              <Button
                variant="outlined"
                onClick={handleAddAttribute}
                sx={{ mt: 1, mb: 1 }}
                startIcon={<AddIcon />}
              >
                Ajouter Attribut
              </Button>
              {attributes.map((attr, index) => (
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  key={index}
                  sx={{ mb: 1 }}
                >
                  <Grid item xs={3}>
                    <TextField
                      select
                      label="Accès"
                      value={attr.access}
                      onChange={(e) =>
                        handleAttributeChange(index, "access", e.target.value)
                      }
                      required
                      fullWidth
                    >
                      {accessModifiers.map((modifier) => (
                        <MenuItem key={modifier} value={modifier}>
                          {modifier.charAt(0).toUpperCase() + modifier.slice(1)}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label={`Attribut ${index + 1} - Nom`}
                      value={attr.name}
                      onChange={(e) =>
                        handleAttributeChange(index, "name", e.target.value)
                      }
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      select
                      label={`Attribut ${index + 1} - Type`}
                      value={attr.type}
                      onChange={(e) =>
                        handleAttributeChange(index, "type", e.target.value)
                      }
                      required
                      fullWidth
                    >
                      {javaTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveAttribute(index)}
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
            </Grid>

            {/* Methods Section */}
            <Grid item xs={12}>
              <Typography variant="h6">Méthodes</Typography>
              <Button
                variant="outlined"
                onClick={handleAddMethod}
                sx={{ mt: 1, mb: 1 }}
                startIcon={<AddIcon />}
              >
                Ajouter Méthode
              </Button>
              {methods.map((method, index) => (
                <Grid
                  container
                  spacing={1}
                  alignItems="center"
                  key={index}
                  sx={{ mb: 1 }}
                >
                  <Grid item xs={3}>
                    <TextField
                      select
                      label="Accès"
                      value={method.access}
                      onChange={(e) =>
                        handleMethodChange(index, "access", e.target.value)
                      }
                      required
                      fullWidth
                    >
                      {accessModifiers.map((modifier) => (
                        <MenuItem key={modifier} value={modifier}>
                          {modifier.charAt(0).toUpperCase() + modifier.slice(1)}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      label={`Méthode ${index + 1} - Nom`}
                      value={method.name}
                      onChange={(e) =>
                        handleMethodChange(index, "name", e.target.value)
                      }
                      required
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField
                      select
                      label={`Méthode ${index + 1} - Type de Retour`}
                      value={method.returnType}
                      onChange={(e) =>
                        handleMethodChange(index, "returnType", e.target.value)
                      }
                      required
                      fullWidth
                    >
                      {javaTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                  <Grid item xs={1}>
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveMethod(index)}
                      size="small"
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Grid>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      {/* Dialog action buttons */}
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

export default ClassForm;
