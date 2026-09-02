import React from "react";
import { VscVscode } from "react-icons/vsc";
import { FaLinux } from "react-icons/fa";
import {
    DiWindows,
    DiGit,
} from "react-icons/di";
import {
    SiPostman,
    SiVercel,
    SiFirebase,
  } from "react-icons/si";

const ToolStack = () => {
    const title = ["Windows", "Firebase",   "Linux","Visual Studio Code","Git","Postman","Vercel"]
    return (

            <div className="flex flex-wrap gap-4 py-6">
                {[ DiWindows, SiFirebase, FaLinux,VscVscode, DiGit, SiPostman, SiVercel].map((Icon, index) => (
                    <div
                        key={index}
                        className="w-[110px] md:w-[140px] h-24 flex flex-col items-center justify-center gap-1.5 text-[38px] text-bone bg-panel rounded-md border border-seam hover:border-copper hover:text-copper transition-colors duration-300"
                        title={title[index]}
                    >
                        <Icon />
                        <span className="font-mono text-[10px] text-ash tracking-wider uppercase">{title[index]}</span>
                    </div>
                ))}
            </div>
    );
};

export default ToolStack;
