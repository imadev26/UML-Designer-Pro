// src/redux/editorSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  classes: [],
  relations: [],
  groups: [],
  past: [],
  future: [],
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    // Classes
    addClass: (state, action) => {
      state.past.push(JSON.parse(JSON.stringify(state)));
      state.classes.push(action.payload);
      state.future = [];
    },
    deleteClass: (state, action) => {
      state.past.push(JSON.parse(JSON.stringify(state)));
      state.classes = state.classes.filter((cls) => cls.id !== action.payload);
      state.relations = state.relations.filter(
        (rel) => rel.source !== action.payload && rel.target !== action.payload
      );
      state.future = [];
    },
    updateClass: (state, action) => {
      state.past.push(JSON.parse(JSON.stringify(state)));
      const index = state.classes.findIndex((cls) => cls.id === action.payload.id);
      if (index !== -1) {
        state.classes[index] = { ...state.classes[index], ...action.payload };
      }
      state.future = [];
    },
    updateClassPosition: (state, action) => {
      const index = state.classes.findIndex((cls) => cls.id === action.payload.id);
      if (index !== -1) {
        state.classes[index].x = action.payload.x;
        state.classes[index].y = action.payload.y;
      }
    },

    // Relations
    addRelation: (state, action) => {
      state.past.push(JSON.parse(JSON.stringify(state)));
      // Check if relation already exists between these classes
      const existingRelation = state.relations.find(
        rel => 
          (rel.source === action.payload.source && rel.target === action.payload.target) ||
          (rel.source === action.payload.target && rel.target === action.payload.source)
      );

      if (existingRelation) {
        // Update existing relation instead of adding new one
        existingRelation.type = action.payload.type;
        existingRelation.sourceCardinality = action.payload.sourceCardinality;
        existingRelation.targetCardinality = action.payload.targetCardinality;
      } else {
        // Add new relation
        state.relations.push({
          ...action.payload,
          id: Date.now().toString(),
        });
      }
      state.future = [];
    },
    deleteRelation: (state, action) => {
      state.past.push(JSON.parse(JSON.stringify(state)));
      state.relations = state.relations.filter((rel) => rel.id !== action.payload);
      state.future = [];
    },
    updateRelation: (state, action) => {
      state.past.push(JSON.parse(JSON.stringify(state)));
      const index = state.relations.findIndex(rel => rel.id === action.payload.id);
      if (index !== -1) {
        state.relations[index] = {
          ...state.relations[index],
          ...action.payload,
        };
      }
      state.future = [];
    },

    // Groupes
    addGroup: (state, action) => {
      state.past.push(JSON.parse(JSON.stringify(state)));
      state.groups.push(action.payload);
      state.future = [];
    },
    removeGroup: (state, action) => {
      state.past.push(JSON.parse(JSON.stringify(state)));
      state.groups = state.groups.filter((group) => group.id !== action.payload);
      state.future = [];
    },
    updateGroup: (state, action) => {
      state.past.push(JSON.parse(JSON.stringify(state)));
      const index = state.groups.findIndex((group) => group.id === action.payload.id);
      if (index !== -1) {
        state.groups[index] = { ...state.groups[index], ...action.payload };
      }
      state.future = [];
    },

    // Undo/Redo
    undo: (state) => {
      if (state.past.length > 0) {
        const previousState = state.past.pop();
        state.future.push(JSON.parse(JSON.stringify({
          classes: state.classes,
          relations: state.relations,
          groups: state.groups
        })));
        state.classes = previousState.classes;
        state.relations = previousState.relations;
        state.groups = previousState.groups;
      }
    },
    redo: (state) => {
      if (state.future.length > 0) {
        const nextState = state.future.pop();
        state.past.push(JSON.parse(JSON.stringify({
          classes: state.classes,
          relations: state.relations,
          groups: state.groups
        })));
        state.classes = nextState.classes;
        state.relations = nextState.relations;
        state.groups = nextState.groups;
      }
    },

    // Réinitialiser le diagramme
    resetDiagram: (state) => {
      state.past.push(JSON.parse(JSON.stringify(state)));
      state.classes = [];
      state.relations = [];
      state.groups = [];
      state.future = [];
    },
  },
});

export const {
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
  resetDiagram,
} = editorSlice.actions;

export default editorSlice.reducer;
