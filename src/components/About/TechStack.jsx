import { CgCPlusPlus } from "react-icons/cg";
import { FaNode } from "react-icons/fa";
import {
    DiJavascript1,
    DiReact,
    DiPython,
    DiJava,
    DiDatabase
} from "react-icons/di";
import { BiLogoTypescript } from "react-icons/bi";
import {
  SiRedis,
  SiPostgresql,
} from "react-icons/si";

const TechStack = () => {
    const title = ["React", "TypeScript","Node.js","Java","C++","JavaScript","PostgreSQL","Database","Python","Redis"];
    return (

            <div className="flex flex-wrap gap-4 py-6">
                {[DiReact, BiLogoTypescript, FaNode, DiJava, CgCPlusPlus, DiJavascript1, SiPostgresql, DiDatabase, DiPython, SiRedis].map((Icon, index) => (
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

export default TechStack;
