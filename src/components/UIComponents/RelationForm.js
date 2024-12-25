/**
 * RelationForm Component
 * -------------------------------------
 * Dialog form for creating or editing a relation between two Classes.
 * The user selects source class, target class, type of relation, and cardinality.
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
  Grid,
} from "@mui/material";
import { useSelector } from "react-redux";

// Various relation types a user can choose
const relationTypes = [
  "association",
  "aggregation",
  "composition",
  "generalization",
  "dependency",
];

// Example cardinalities
const cardinalities = ["1", "0..1", "1..*", "0..*"];

const RelationForm = ({ open, handleClose, handleSave, initialData }) => {
  // Grab classes from Redux to fill the drop-down lists
  const classes = useSelector((state) => state.editor.classes);

  const [source, setSource] = useState("");
  const [target, setTarget] = useState("");
  const [type, setType] = useState("association");
  const [sourceCardinality, setSourceCardinality] = useState("1");
  const [targetCardinality, setTargetCardinality] = useState("1");

  useEffect(() => {
    if (initialData) {
      setSource(initialData.source);
      setTarget(initialData.target);
      setType(initialData.type);
      setSourceCardinality(initialData.sourceCardinality || "1");
      setTargetCardinality(initialData.targetCardinality || "1");
    } else {
      setSource("");
      setTarget("");
      setType("association");
      setSourceCardinality("1");
      setTargetCardinality("1");
    }
  }, [initialData]);

  /**
   * Save the relation form data, validating user has selected valid classes
   */
  const onSave = () => {
    if (source === "" || target === "") {
      alert("Please select source and target classes");
      return;
    }

    // Build relation data object
    const relationData = {
      source,
      target,
      type,
      sourceCardinality,
      targetCardinality,
    };

    handleSave(relationData);
  };

  /**
   * Helper to capitalize a string's first letter
   */
  const capitalize = (s) => {
    if (typeof s !== "string") return "";
    return s.charAt(0).toUpperCase() + s.slice(1);
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        {initialData ? "Modify Relation" : "Add Relation"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 1 }}>
          <Grid container spacing={2}>
            {/* Source Class */}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Source Class"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                required
                fullWidth
              >
                {classes.map((cls) => (
                  <MenuItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Target Class */}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Target Class"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                required
                fullWidth
              >
                {classes.map((cls) => (
                  <MenuItem key={cls.id} value={cls.id}>
                    {cls.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Relation Type */}
            <Grid item xs={12}>
              <TextField
                select
                label="Relation Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                required
                fullWidth
              >
                {relationTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {capitalize(type)}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Source Cardinality */}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Source Cardinality"
                value={sourceCardinality}
                onChange={(e) => setSourceCardinality(e.target.value)}
                fullWidth
              >
                {["1", "0..1", "1..*", "0..*", "*"].map((card) => (
                  <MenuItem key={card} value={card}>
                    {card}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* Target Cardinality */}
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Target Cardinality"
                value={targetCardinality}
                onChange={(e) => setTargetCardinality(e.target.value)}
                fullWidth
              >
                {["1", "0..1", "1..*", "0..*", "*"].map((card) => (
                  <MenuItem key={card} value={card}>
                    {card}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={onSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RelationForm;
