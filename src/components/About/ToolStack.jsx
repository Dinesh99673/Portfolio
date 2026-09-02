import { VscVscode } from "react-icons/vsc";
import { FaLinux } from "react-icons/fa";
import { DiWindows } from "react-icons/di";
import { FiServer } from "react-icons/fi";
import {
    SiGit, SiGithub, SiPostman, SiArduino,
    SiVercel, SiRender, SiFirebase, SiGoogleplay, SiAppwrite, SiCpanel,
} from "react-icons/si";

/*
 * Brand colours, with black/near-black marks (GitHub, Vercel) rendered white
 * so they stay visible. Dokploy has no icon in the set, so it uses a neutral
 * server glyph.
 */
const tools = [
    { Icon: VscVscode, name: "VS Code", color: "#007ACC" },
    { Icon: SiGit, name: "Git", color: "#F05032" },
    { Icon: SiGithub, name: "GitHub", color: "#FFFFFF" },
    { Icon: SiPostman, name: "Postman", color: "#FF6C37" },
    { Icon: SiArduino, name: "Arduino IDE", color: "#00979D" },
    { Icon: SiVercel, name: "Vercel", color: "#FFFFFF" },
    { Icon: SiRender, name: "Render", color: "#46E3B7" },
    { Icon: FiServer, name: "Dokploy", color: "#E4E4E4" },
    { Icon: SiCpanel, name: "cPanel", color: "#FF6C2C" },
    { Icon: SiFirebase, name: "Firebase", color: "#FFCA28" },
    { Icon: SiGoogleplay, name: "Google Play", color: "#01875F" },
    { Icon: SiAppwrite, name: "Appwrite", color: "#FD366E" },
    { Icon: DiWindows, name: "Windows", color: "#0078D4" },
    { Icon: FaLinux, name: "Linux", color: "#FCC624" },
];

const ToolStack = () => {
    return (
        <div className="flex flex-wrap gap-3 py-6">
            {tools.map(({ Icon, name, color }) => (
                <div
                    key={name}
                    className="w-[104px] md:w-[128px] h-24 flex flex-col items-center justify-center gap-2 text-[34px] bg-panel rounded-md border border-seam hover:border-copper transition-colors duration-300"
                    title={name}
                >
                    <Icon style={{ color }} />
                    <span className="font-mono text-[10px] text-ash tracking-wider uppercase text-center px-1">
                        {name}
                    </span>
                </div>
            ))}
        </div>
    );
};

export default ToolStack;
