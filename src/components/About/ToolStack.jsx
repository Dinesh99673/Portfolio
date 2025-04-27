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
  } from "react-icons/si";

const ToolStack = () => {
    return (

            <div className="flex flex-wrap justify-center gap-8 py-16 md:px-28">
                {[ DiWindows, FaLinux,VscVscode, DiGit, SiPostman, SiVercel].map((Icon, index) => (
                    <div
                        key={index}
                        className="w-[150px] md:w-[200px] h-28 px-4 py-3 text-[50px] text-white rounded-md border-2 border-purple-800 flex items-center justify-center transition-transform transform duration-500 hover:scale-110 hover:bg-purple-800 hover:text-purple-300"
                    >
                        <Icon />
                    </div>
                ))}
            </div>
    );
};

export default ToolStack;
