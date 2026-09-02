import React from "react";
import { CgCPlusPlus } from "react-icons/cg";
import {
    SiJavascript,
    SiTypescript,
    SiPython,
    SiOpenjdk,
    SiSolidity,
    SiReact,
    SiTailwindcss,
    SiVite,
    SiReactquery,
    SiCapacitor,
    SiNodedotjs,
    SiExpress,
    SiSpringboot,
    SiSocketdotio,
    SiWebrtc,
    SiJsonwebtokens,
    SiFirebase,
    SiPostgresql,
    SiMysql,
    SiSqlite,
    SiAmazons3,
    SiOpenai,
    SiTensorflow,
    SiKeras,
    SiScikitlearn,
    SiArduino,
    SiEspressif,
} from "react-icons/si";

const groups = [
    {
        label: "Languages",
        items: [
            { Icon: SiTypescript, name: "TypeScript" },
            { Icon: SiJavascript, name: "JavaScript" },
            { Icon: SiPython, name: "Python" },
            { Icon: SiOpenjdk, name: "Java" },
            { Icon: CgCPlusPlus, name: "C++" },
            { Icon: SiSolidity, name: "Solidity" },
        ],
    },
    {
        label: "Frontend",
        items: [
            { Icon: SiReact, name: "React 19" },
            { Icon: SiTailwindcss, name: "Tailwind" },
            { Icon: SiVite, name: "Vite" },
            { Icon: SiReactquery, name: "TanStack Query" },
            { Icon: SiCapacitor, name: "Capacitor" },
        ],
    },
    {
        label: "Backend & real-time",
        items: [
            { Icon: SiNodedotjs, name: "Node.js" },
            { Icon: SiExpress, name: "Express 5" },
            { Icon: SiSpringboot, name: "Spring Boot" },
            { Icon: SiSocketdotio, name: "Socket.IO" },
            { Icon: SiWebrtc, name: "WebRTC" },
            { Icon: SiJsonwebtokens, name: "JWT" },
        ],
    },
    {
        label: "Data & storage",
        items: [
            { Icon: SiFirebase, name: "Firestore" },
            { Icon: SiPostgresql, name: "PostgreSQL" },
            { Icon: SiMysql, name: "MySQL" },
            { Icon: SiSqlite, name: "SQLite" },
            { Icon: SiAmazons3, name: "S3 / B2" },
        ],
    },
    {
        label: "AI & machine learning",
        items: [
            { Icon: SiOpenai, name: "OpenAI API" },
            { Icon: SiTensorflow, name: "TensorFlow" },
            { Icon: SiKeras, name: "Keras" },
            { Icon: SiScikitlearn, name: "scikit-learn" },
        ],
    },
    {
        label: "Embedded",
        items: [
            { Icon: SiEspressif, name: "ESP32" },
            { Icon: SiArduino, name: "Arduino C++" },
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
                        {items.map(({ Icon, name }) => (
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
                </div>
            ))}
        </div>
    );
};

export default TechStack;
