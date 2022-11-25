import React from "react";
import CreatableSelect from "react-select/creatable";

function MainContent() {
  return (
    <div className="flex flex-1 flex-col bg-zinc-500 gap-y-2">
      {/* Title  */}
      <input
        type="text"
        name="title"
        placeholder="Enter title"
        className="bg-transparent border-b-[1px] outline-none mx-2 text-2xl"
        defaultValue={""}
      />
      {/* Tags  */}
      {/* <CreatableSelect isMulti /> */}

      {/* Description  */}
      <textarea
        name="description"
        placeholder="Enter the description here"
        className="flex-1 bg-transparent outline-none mx-2"
      ></textarea>
    </div>
  );
}

export default MainContent;
