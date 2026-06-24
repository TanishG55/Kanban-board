import React, { useState } from "react";
import { quickLinks } from "../../../constants/sidebar";
function Quicklinks() {
  const [allLinks] = useState(quickLinks);

  return (
    <div className="px-3 mt-6">
      <h2 className="mb-3 text-base font-semibold uppercase text-slate-400">
        QuickLinks
      </h2>
      <div>
        {allLinks.map((links) => (
          <div className="flex flex-row items-center align-center justify-between whitespace-nowrap  px-3 py-2 rounded-sm hover:bg-slate-100 cursor-pointer">
            <div className="flex items-center aligns-center gap-3">
              <links.icon size={18} />
              <span>{links.title}</span>
            </div>
            <span className="flex items-center align-center w-4 h-4 border border-border rounded-sm p-1 text-xs">
              {links.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Quicklinks;
