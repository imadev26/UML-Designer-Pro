/**
 * Relation Component
 * -------------------------------------
 * Draws a UML-style line from source class to target class.
 */

import React from "react";
import PropTypes from "prop-types";

const Relation = ({
  source,
  target,
  type,
  sourceCardinality,
  targetCardinality,
  classWidth = 200,
  classHeight = 100,
  darkMode,
}) => {
  if (!source || !target) return null;

  // Calculate centers of the classes
  const sourceCenter = {
    x: source.x + classWidth / 2,
    y: source.y + classHeight / 2,
  };

  const targetCenter = {
    x: target.x + classWidth / 2,
    y: target.y + classHeight / 2,
  };

  // Calculate intersection points with class borders
  const calculateIntersection = (center, otherCenter) => {
    const halfWidth = classWidth / 2;
    const halfHeight = classHeight / 2;

    const dx = otherCenter.x - center.x;
    const dy = otherCenter.y - center.y;

    const angle = Math.atan2(dy, dx);
    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    let x, y;

    if (absDx > absDy) {
      // Intersect with left/right edge
      x = center.x + (halfWidth * Math.sign(dx));
      y = center.y + (dy / absDx) * (halfWidth * Math.sign(dx));
    } else {
      // Intersect with top/bottom edge
      y = center.y + (halfHeight * Math.sign(dy));
      x = center.x + (dx / absDy) * (halfHeight * Math.sign(dy));
    }

    return { x, y };
  };

  const start = calculateIntersection(sourceCenter, targetCenter);
  const end = calculateIntersection(targetCenter, sourceCenter);

  // Calculate the angle for marker rotation
  const dx = end.x - start.x;
  const dy = end.y - start.y;

  // Generate unique marker IDs
  const markerId = `marker-${source.x}-${source.y}-${target.x}-${target.y}`;

  // Determine if cardinalities should be shown
  const showCardinalities = ['association', 'aggregation', 'composition'].includes(type);

  // Calculate cardinality positions with offset
  const cardinalityOffset = 30; // Adjusted for better visibility
  const sourceCardPos = {
    x: start.x + (dx / Math.sqrt(dx * dx + dy * dy)) * cardinalityOffset,
    y: start.y + (dy / Math.sqrt(dx * dx + dy * dy)) * cardinalityOffset,
  };

  const targetCardPos = {
    x: end.x - (dx / Math.sqrt(dx * dx + dy * dy)) * cardinalityOffset,
    y: end.y - (dy / Math.sqrt(dx * dx + dy * dy)) * cardinalityOffset,
  };

  // Determine stroke color based on dark mode
  const strokeColor = darkMode ? "#fff" : "#000"; // White for dark mode, black for light mode

  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        overflow: "visible",
        zIndex: 1000,
      }}
    >
      <defs>
        <marker
          id={`${markerId}-triangle`}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={strokeColor} />
        </marker>

        <marker
          id={`${markerId}-diamond-hollow`}
          viewBox="0 0 12 12"
          refX="11"
          refY="6"
          markerWidth="10"
          markerHeight="10"
          orient="auto-start-reverse"
        >
          <path d="M 0 6 L 6 0 L 12 6 L 6 12 z" fill="white" stroke="black" />
        </marker>

        <marker
          id={`${markerId}-diamond-filled`}
          viewBox="0 0 12 12"
          refX="11"
          refY="6"
          markerWidth="10"
          markerHeight="10"
          orient="auto-start-reverse"
        >
          <path d="M 0 6 L 6 0 L 12 6 L 6 12 z" fill="black" stroke="black" />
        </marker>

        <marker
          id={`${markerId}-dependency`}
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10" fill="none" stroke="black" />
        </marker>
      </defs>

      {/* Main line */}
      <line
        x1={start.x}
        y1={start.y}
        x2={end.x}
        y2={end.y}
        stroke={strokeColor}
        strokeWidth="2"
        markerStart={
          type === "aggregation"
            ? `url(#${markerId}-diamond-hollow)`
            : type === "composition"
            ? `url(#${markerId}-diamond-filled)`
            : null
        }
        markerEnd={
          type === "generalization" || type === "implementation"
            ? `url(#${markerId}-triangle)`
            : type === "dependency"
            ? `url(#${markerId}-dependency)`
            : null
        }
        strokeDasharray={
          type === "dependency" || type === "implementation" 
            ? "4,4" 
            : "none"
        }
      />

      {/* Cardinalities */}
      {showCardinalities && sourceCardinality && (
        <g transform={`translate(${sourceCardPos.x},${sourceCardPos.y})`}>
          <rect
            x="-15"
            y="-12"
            width="30"
            height="20"
            fill="white"
            stroke="none"
          />
          <text
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
          >
            {sourceCardinality}
          </text>
        </g>
      )}

      {showCardinalities && targetCardinality && (
        <g transform={`translate(${targetCardPos.x},${targetCardPos.y})`}>
          <rect
            x="-15"
            y="-12"
            width="30"
            height="20"
            fill="white"
            stroke="none"
          />
          <text
            textAnchor="middle"
            dominantBaseline="middle"
            fontSize="12"
          >
            {targetCardinality}
          </text>
        </g>
      )}
    </svg>
  );
};

Relation.propTypes = {
  source: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  target: PropTypes.shape({
    x: PropTypes.number,
    y: PropTypes.number,
  }).isRequired,
  type: PropTypes.oneOf([
    "association",
    "aggregation",
    "composition",
    "generalization",
    "implementation",
    "dependency",
  ]).isRequired,
  sourceCardinality: PropTypes.string,
  targetCardinality: PropTypes.string,
  classWidth: PropTypes.number,
  classHeight: PropTypes.number,
  darkMode: PropTypes.bool.isRequired,
};

export default Relation;
