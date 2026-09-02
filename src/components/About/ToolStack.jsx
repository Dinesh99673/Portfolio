import React from "react";
import { VscVscode } from "react-icons/vsc";
import { FaLinux } from "react-icons/fa";
import { DiWindows } from "react-icons/di";
import {
    SiGit,
    SiGithub,
    SiPostman,
    SiVercel,
    SiRender,
    SiFirebase,
    SiArduino,
    SiAppwrite,
    SiGoogleplay,
    SiFigma,
} from "react-icons/si";

const tools = [
    { Icon: VscVscode, name: "VS Code" },
    { Icon: SiGit, name: "Git" },
    { Icon: SiGithub, name: "GitHub" },
    { Icon: SiPostman, name: "Postman" },
    { Icon: SiArduino, name: "Arduino IDE" },
    { Icon: SiFigma, name: "Figma" },
    { Icon: SiVercel, name: "Vercel" },
    { Icon: SiRender, name: "Render" },
    { Icon: SiFirebase, name: "Firebase" },
    { Icon: SiGoogleplay, name: "Google Play" },
    { Icon: SiAppwrite, name: "Appwrite" },
    { Icon: DiWindows, name: "Windows" },
    { Icon: FaLinux, name: "Linux" },
];

const ToolStack = () => {
    return (
        <div className="flex flex-wrap gap-3 py-6">
            {tools.map(({ Icon, name }) => (
                <div
                    key={name}
                    className="w-[104px] md:w-[128px] h-24 flex flex-col items-center justify-center gap-2 text-[34px] text-bone bg-panel rounded-md border border-seam hover:border-copper hover:text-copper transition-colors duration-300"
                    title={name}
                >
                    <Icon />
                    <span className="font-mono text-[10px] text-ash tracking-wider uppercase text-center px-1">
                        {name}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default ToolStack;
