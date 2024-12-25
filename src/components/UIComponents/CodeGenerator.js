/**
 * CodeGenerator Component
 * -------------------------------------
 * (Optional usage)
 * This component can be used separately to generate and display Java code from the diagram.
 * It pulls classes and relations from Redux, uses a helper function to generate code,
 * and displays it in a modal.
 */

import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useSelector } from "react-redux";
import { generateJavaCode } from "../../utils/codeGenerator";

const CodeGenerator = () => {
  const [open, setOpen] = useState(false);

  // Pull data from Redux
  const classes = useSelector((state) => state.editor.classes);
  const relations = useSelector((state) => state.editor.relations);

  // Generate code based on classes and relations
  const code = generateJavaCode(classes, relations);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <Button variant="contained" color="primary" onClick={handleOpen} fullWidth>
        Générer Code Java
      </Button>

      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle>Code Java Généré</DialogTitle>
        <DialogContent>
          <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            {code}
          </pre>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Fermer
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CodeGenerator;
