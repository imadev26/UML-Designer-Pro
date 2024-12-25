/**
 * CanvasArea Component
 * -------------------------------------
 * This component manages the main diagram area where Classes, Relations, and Groups are displayed.
 * It includes toolbar actions for adding Classes, Relations, Groups, toggling Dark Mode, zoom controls, and generating code.
 *
 * This file:
 * - Retrieves classes, relations, and groups from Redux store
 * - Provides form dialogs (ClassForm, RelationForm, GroupForm)
 * - Handles all create/update actions for classes, relations, and groups
 * - Implements zoom in/out, toggling theme, and code generation
 */

import React, { useState, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import DraggableClass from "./DraggableClass";
import ClassForm from "./ClassForm";
import RelationForm from "./RelationForm";
import GroupForm from "./GroupForm";
import Relation from "./Relation";
import Group from "./Group";
import {
  addClass,
  deleteClass,
  updateClass,
  updateClassPosition,
  addRelation,
  deleteRelation,
  updateRelation,
  addGroup,
  removeGroup,
  updateGroup,
  undo,
  redo,
} from "../../redux/editorSlice";
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  MenuItem,
  Drawer,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import LinkIcon from "@mui/icons-material/Link";
import GroupIcon from "@mui/icons-material/Group";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import CodeIcon from "@mui/icons-material/Code";
import { generateCode } from '../../utils/codeGenerator';
import EditorToolbar from "./EditorToolbar";
import SidebarToggle from './SidebarToggle';
import Sidebar from './Sidebar';

const gridSize = 20; // Set your desired grid size

const CanvasArea = forwardRef(() => {
  // Redux states
  const classes = useSelector((state) => state.editor.classes);
  const relations = useSelector((state) => state.editor.relations);
  const groups = useSelector((state) => state.editor.groups);
  const past = useSelector((state) => state.editor.past);
  const future = useSelector((state) => state.editor.future);
  const dispatch = useDispatch();

  // States for class form
  const [formOpen, setFormOpen] = useState(false);
  const [editingClass, setEditingClass] = useState(null);

  // States for relation form
  const [relationFormOpen, setRelationFormOpen] = useState(false);
  const [editingRelation, setEditingRelation] = useState(null);

  // States for group form
  const [groupFormOpen, setGroupFormOpen] = useState(false);
  const [editingGroup, setEditingGroup] = useState(null);

  // States for generated code dialog
  const [codeDialogOpen, setCodeDialogOpen] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  // State for Dark Mode
  const [darkMode, setDarkMode] = useState(false);

  // State for zoom level
  const [zoom, setZoom] = useState(1);

  // State for selected language
  const [selectedLanguage, setSelectedLanguage] = useState('java');

  // Add state for sidebar
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleZoomIn = () => {
    setZoom((prevZoom) => Math.min(prevZoom + 0.2, 3));
  };

  const handleZoomOut = () => {
    setZoom((prevZoom) => Math.max(prevZoom - 0.2, 0.5));
  };

  const handleAddClass = () => {
    setEditingClass(null);
    setFormOpen(true);
  };

  const handleEditClass = (cls) => {
    setEditingClass(cls);
    setFormOpen(true);
  };

  const handleUpdateClassPosition = (id, x, y) => {
    dispatch(updateClassPosition({ id, x, y }));
  };

  const handleAddRelation = () => {
    setEditingRelation(null);
    setRelationFormOpen(true);
  };

  const handleAddGroup = () => {
    setEditingGroup(null);
    setGroupFormOpen(true);
  };

  const handleGenerateCode = () => {
    const code = generateCode(classes, relations, selectedLanguage);
    setGeneratedCode(code);
    setCodeDialogOpen(true);
  };

  const handleSaveClass = (newClass) => {
    if (editingClass) {
      dispatch(updateClass({ id: editingClass.id, ...newClass }));
    } else {
      dispatch(addClass({ ...newClass, id: Date.now().toString() }));
    }
    setFormOpen(false);
    setEditingClass(null);
  };

  const handleSaveRelation = (newRelation) => {
    if (editingRelation) {
      dispatch(updateRelation({ id: editingRelation.id, ...newRelation }));
    } else {
      dispatch(addRelation({ ...newRelation, id: Date.now().toString() }));
    }
    setRelationFormOpen(false);
    setEditingRelation(null);
  };

  const handleSaveGroup = (newGroup) => {
    if (editingGroup) {
      dispatch(updateGroup({ id: editingGroup.id, ...newGroup }));
    } else {
      dispatch(addGroup({ ...newGroup, id: Date.now().toString() }));
    }
    setGroupFormOpen(false);
    setEditingGroup(null);
  };

  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <EditorToolbar
        darkMode={darkMode}
        onToggleDarkMode={toggleDarkMode}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onAddClass={handleAddClass}
        onAddRelation={handleAddRelation}
        onAddGroup={handleAddGroup}
        onGenerateCode={handleGenerateCode}
        onUndo={() => dispatch(undo())}
        onRedo={() => dispatch(redo())}
        canUndo={past.length > 0}
        canRedo={future.length > 0}
      />

      {/* Add Sidebar Toggle Button */}
      <SidebarToggle 
        isOpen={sidebarOpen} 
        onClick={() => setSidebarOpen(!sidebarOpen)}
      />

      {/* Add Sidebar Drawer */}
      <Drawer
        variant="persistent"
        anchor="left"
        open={sidebarOpen}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            boxSizing: 'border-box',
            top: 48,
            height: 'calc(100% - 48px)',
          },
        }}
      >
        <Sidebar
          classes={classes}
          relations={relations}
          groups={groups}
          onEditClass={handleEditClass}
          onDeleteClass={(id) => dispatch(deleteClass(id))}
          onEditRelation={(rel) => {
            setEditingRelation(rel);
            setRelationFormOpen(true);
          }}
          onDeleteRelation={(id) => dispatch(deleteRelation(id))}
          onEditGroup={(group) => {
            setEditingGroup(group);
            setGroupFormOpen(true);
          }}
          onDeleteGroup={(id) => dispatch(removeGroup(id))}
        />
      </Drawer>

      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 1,
          position: "relative",
          backgroundColor: darkMode ? "#121212" : "#f0f0f0",
          overflow: "auto",
          width: '100%',
          height: 'calc(100vh - 48px)',
          marginLeft: sidebarOpen ? '240px' : 0,
          transition: 'margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
        }}
      >
        <Box
          sx={{
            transform: `scale(${zoom})`,
            transformOrigin: "0 0",
            transition: "transform 0.2s ease-in-out",
            position: "relative",
            width: '100%',
            height: '100%',
            minWidth: '100%',
            minHeight: '100%',
          }}
        >
          {/* Grid Pattern */}
          <svg
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              zIndex: 0,
            }}
          >
            <defs>
              <pattern
                id="smallGrid"
                width="20"
                height="20"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 20 0 L 0 0 0 20"
                  fill="none"
                  stroke={darkMode ? "#333" : "#eee"}
                  strokeWidth="0.5"
                />
              </pattern>
              <pattern
                id="grid"
                width="100"
                height="100"
                patternUnits="userSpaceOnUse"
              >
                <rect width="100" height="100" fill="url(#smallGrid)" />
                <path
                  d="M 100 0 L 0 0 0 100"
                  fill="none"
                  stroke={darkMode ? "#444" : "#e0e0e0"}
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {/* Canvas Content Container */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              padding: 2,
            }}
          >
            {/* Relations Layer */}
            <Box 
              sx={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1,
              }}
            >
              {relations.map((rel) => {
                const sourceClass = classes.find((cls) => cls.id === rel.source);
                const targetClass = classes.find((cls) => cls.id === rel.target);

                if (!sourceClass || !targetClass) return null;

                return (
                  <Relation
                    key={rel.id}
                    source={{ x: sourceClass.x, y: sourceClass.y }}
                    target={{ x: targetClass.x, y: targetClass.y }}
                    type={rel.type}
                    sourceCardinality={rel.sourceCardinality}
                    targetCardinality={rel.targetCardinality}
                    classWidth={200}
                    classHeight={100}
                    darkMode={darkMode}
                  />
                );
              })}
            </Box>

            {/* Classes Layer */}
            <Box 
              sx={{ 
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 2,
              }}
            >
              {classes.map((cls) => (
                <DraggableClass
                  key={cls.id}
                  id={cls.id}
                  name={cls.name}
                  x={cls.x}
                  y={cls.y}
                  attributes={cls.attributes}
                  methods={cls.methods}
                  deleteClass={(id) => dispatch(deleteClass(id))}
                  onEdit={() => handleEditClass(cls)}
                  onDragEnd={({ x, y }) => {
                    handleUpdateClassPosition(cls.id, x, y);
                  }}
                  gridSize={gridSize}
                />
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Dialog: Add/Update Class */}
      <ClassForm
        open={formOpen}
        handleClose={() => {
          setFormOpen(false);
          setEditingClass(null);
        }}
        handleSave={handleSaveClass}
        initialData={editingClass}
      />

      {/* Dialog: Add/Update Relation */}
      <RelationForm
        open={relationFormOpen}
        handleClose={() => {
          setRelationFormOpen(false);
          setEditingRelation(null);
        }}
        handleSave={handleSaveRelation}
        initialData={editingRelation}
      />

      {/* Dialog: Add/Update Group */}
      <GroupForm
        open={groupFormOpen}
        handleClose={() => {
          setGroupFormOpen(false);
          setEditingGroup(null);
        }}
        handleSave={handleSaveGroup}
        initialData={editingGroup}
      />

      {/* Dialog: Display Generated Code */}
      <Dialog
        open={codeDialogOpen}
        onClose={() => setCodeDialogOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Generated Code</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <TextField
              select
              label="Language"
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
                const newCode = generateCode(classes, relations, e.target.value);
                setGeneratedCode(newCode);
              }}
              fullWidth
              sx={{ mb: 2 }}
            >
              <MenuItem value="java">Java</MenuItem>
              <MenuItem value="php">PHP</MenuItem>
              <MenuItem value="python">Python</MenuItem>
            </TextField>
          </Box>
          <TextField
            multiline
            fullWidth
            minRows={20}
            variant="outlined"
            value={generatedCode}
            InputProps={{
              readOnly: true,
              style: { fontFamily: 'monospace' }
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              navigator.clipboard.writeText(generatedCode);
              alert('Code copied to clipboard!');
            }}
            color="primary"
          >
            Copy
          </Button>
          <Button onClick={() => setCodeDialogOpen(false)} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
});

export default CanvasArea;
