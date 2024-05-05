import React, { useState } from "react";

function ParagraphContainer({ text, maxLength }) {
  const [expanded, setExpanded] = useState(false);
  const [readMore, setReadMore] = useState("View More");

  const toggleExpanded = () => {
    setExpanded(!expanded);
    setReadMore(expanded ? "View More" : "View Less");
  };

  return (
    <div style={{ position: "relative", textAlign: "center" }}>
      <div
        style={{ maxHeight: expanded ? "none" : "100px", overflow: "hidden" }}
      >
        <p
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "pre-wrap",
            textAlign: "justify"
          }}
        >
          {expanded ? text : text.slice(0, maxLength)}
        </p>
      </div>

      <button
        style={{
          position: "absolute",
          bottom: 0,
          left: "50%",
          transform: "translateX(-50%)",
          backgroundColor: "transparent",
          border: "none",
          cursor: "pointer",
          color: "blue"
        }}
        onClick={toggleExpanded}
      >
        {readMore}
      </button>
    </div>
  );
}

export default ParagraphContainer;
