import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PanelLeftClose, PanelRightClose } from "lucide-react";
import { Logo } from "../../../UI/icons";

function Header({OpenPanel , setOpenPanel}) {
  const navigate = useNavigate();
  return (
    <div
      onClick={(e) => {e.stopPropagation(); navigate("/") }}
      className="flex flex row items-center aligns-center justify-between p-4 border-b border-border cursor-pointer"
    >
      {/* <Logo/> */}
      <span className="text-xl">SprintFlow</span>
      {/* <button onClick={(e)=>{
        e.stopPropagation();
        setOpenPanel(!OpenPanel);
      }} className="cursor-pointer"> {OpenPanel ? <PanelLeftClose size={20} /> : <PanelRightClose size={20} />}</button> */}
    </div>
  );
}

export default Header;
