import React from "react";

function Sidebar() {
  return (
    <div className="bg-zinc-700 w-4/12 h-screen flex flex-col">
      <button className="bg-blue-500 my-2 mx-2">New note</button>

      {/* notes section  */}
      <div></div>

      {/* logout */}
      <button className="bg-red-600 mx-2 rounded-sm mt-auto mb-2">
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
