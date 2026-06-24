import React from "react";
import Header from "./Header/Header";
import NavigationMenu from "./NavigationMenu/NavigationMenu";
import Quicklinks from "./Quicklinks/Quicklinks";
import Footer from "./Footer/Footer";
import { useState } from "react";
import { PanelLeftClose, PanelRightClose } from "lucide-react";

export default function Sidebar() {
  const [OpenPanel, setOpenPanel] = useState(false);
  return (
    <div
      className={`relative shrink-0 h-screen border-r border-border bg-surface pr-2 transition-all duration-300 ease-in-out ${
        OpenPanel ? "w-10" : "w-[220px]"
      }`}
    >
      <button
        onClick={(e) => {
          e.stopPropagation();
          setOpenPanel(!OpenPanel);
        }}
        className={`absolute top-5 z-50 cursor-pointer p-1 rounded ${
          OpenPanel ? "left-1/2 -translate-x-1/2 " : "right-2"
        }`}
      >
        {OpenPanel ? (
          <PanelLeftClose size={20} />
        ) : (
          <PanelRightClose size={20} />
        )}
      </button>
      <div
        className={`h-full  w-auto flex flex-col pr-2 ${OpenPanel ? "hidden" : ""}`}
      >
        <Header OpenPanel={OpenPanel} setOpenPanel={setOpenPanel} />
        <NavigationMenu />
        <Quicklinks />
        <Footer />
      </div>
    </div>
  );
}
