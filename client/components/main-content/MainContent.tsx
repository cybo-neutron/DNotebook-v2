import React from "react";

function MainContent() {
  return (
    <div className="flex flex-1 flex-col bg-slate-500">
      <input
        type="text"
        name="title"
        placeholder="Enter title"
        className="bg-transparent border-b-[1px] outline-none mx-2 text-2xl"
      />
      <textarea
        name="description"
        placeholder="Enter the description here"
        className="flex-1 bg-transparent outline-none mx-2"
      ></textarea>
    </div>
  );
}

export default MainContent;
