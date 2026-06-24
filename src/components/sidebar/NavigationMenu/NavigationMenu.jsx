import React from "react";
import { menu } from "../../../constants/sidebar";
import { Link } from "react-router-dom";

function NavigationMenu() {
  return (
    <div className="flex flex-col p-3 space-y-1">
      {menu.map(({ title, icon: Icon }) => {
        const content = (
          <>
            <Icon size={18} />
            <span>{title}</span>
          </>
        );

        return title === "Backlog" ? (
          <Link
            key={title}
            to="/backlog"
            className="flex items-center gap-3 px-3 py-2 rounded-sm hover:bg-slate-100"
          >
            {content}
          </Link>
        ) : (
          <span
            key={title}
            className="flex items-center gap-3 px-3 py-2 rounded-sm hover:bg-slate-100 cursor-pointer"
          >
            {content}
          </span>
        );
      })}
    </div>
  );
}

export default NavigationMenu;