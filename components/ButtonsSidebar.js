import React from "react";

function Buttons({ BtnText, Icon }) {
  return (
    <button className="flex space-x-2 items-center hover:text-white">
      <Icon className="w-5 h-5" />
      <p>{BtnText}</p>
    </button>
  );
}

export default Buttons;
