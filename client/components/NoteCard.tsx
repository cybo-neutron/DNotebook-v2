import React from "react";

function NoteCard() {
  return (
    <div>
      <h1 className={`hello ${true ? "" : ""}`}>Title</h1>
      <p>Description</p>
    </div>
  );
}

export default NoteCard;
