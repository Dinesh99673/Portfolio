import { CgCPlusPlus } from "react-icons/cg";
import {
    SiJavascript, SiTypescript, SiPython, SiSolidity,
    SiReact, SiTailwindcss, SiVite, SiReactquery, SiCapacitor, SiNextdotjs,
    SiNodedotjs, SiExpress, SiSocketdotio, SiWebrtc,
    SiFirebase, SiPostgresql, SiMysql, SiSqlite, SiAmazons3,
    SiOpenai, SiTensorflow, SiKeras, SiScikitlearn,
    SiEspressif, SiArduino,
} from "react-icons/si";

/*
 * Brand colours, except where the real one is black or near-black and would
 * disappear on this background — Next.js, Express and Socket.IO are rendered
 * white, and a few very dark blues are lightened to stay legible.
 */
const groups = [
    {
        label: "Languages",
        items: [
            { Icon: SiTypescript, name: "TypeScript", color: "#3178C6" },
            { Icon: SiJavascript, name: "JavaScript", color: "#F7DF1E" },
            { Icon: SiPython, name: "Python", color: "#4B8BBE" },
            { Icon: CgCPlusPlus, name: "C++", color: "#649AD2" },
            { Icon: SiSolidity, name: "Solidity", color: "#C4C4C4" },
        ],
    },
    {
        label: "Frontend",
        items: [
            { Icon: SiReact, name: "React 19", color: "#61DAFB" },
            { Icon: SiNextdotjs, name: "Next.js", color: "#FFFFFF" },
            { Icon: SiTailwindcss, name: "Tailwind", color: "#06B6D4" },
            { Icon: SiVite, name: "Vite", color: "#646CFF" },
            { Icon: SiReactquery, name: "TanStack Query", color: "#FF4154" },
            { Icon: SiCapacitor, name: "Capacitor", color: "#119EFF" },
        ],
    },
    {
        label: "Backend & real-time",
        items: [
            { Icon: SiNodedotjs, name: "Node.js", color: "#5FA04E" },
            { Icon: SiExpress, name: "Express 5", color: "#E4E4E4" },
            { Icon: SiSocketdotio, name: "Socket.IO", color: "#E4E4E4" },
            { Icon: SiWebrtc, name: "WebRTC", color: "#B7B7B7" },
        ],
    },
    {
        label: "Data & storage",
        items: [
            { Icon: SiFirebase, name: "Firestore", color: "#FFCA28" },
            { Icon: SiPostgresql, name: "PostgreSQL", color: "#4169E1" },
            { Icon: SiMysql, name: "MySQL", color: "#4479A1" },
            { Icon: SiSqlite, name: "SQLite", color: "#7BB3CC" },
            { Icon: SiAmazons3, name: "S3 / B2", color: "#569A31" },
        ],
    },
    {
        label: "AI & machine learning",
        items: [
            { Icon: SiOpenai, name: "OpenAI API", color: "#74AA9C" },
            { Icon: SiTensorflow, name: "TensorFlow", color: "#FF6F00" },
            { Icon: SiKeras, name: "Keras", color: "#D00000" },
            { Icon: SiScikitlearn, name: "scikit-learn", color: "#F7931E" },
        ],
    },
    {
        label: "Embedded",
        items: [
            { Icon: SiEspressif, name: "ESP32", color: "#E7352C" },
            { Icon: SiArduino, name: "Arduino C++", color: "#00979D" },
        ],
    },
];

const TechStack = () => {
    return (
        <div className="space-y-8 py-6">
            {groups.map(({ label, items }) => (
                <div key={label}>
                    <p className="font-mono text-xs text-ash tracking-[0.25em] uppercase mb-3">
                        {label}
                    </p>
                    <div className="flex flex-wrap gap-3">
                        {items.map(({ Icon, name, color }) => (
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
                </div>
            ))}
        </div>
    );
};

export default TechStack;
