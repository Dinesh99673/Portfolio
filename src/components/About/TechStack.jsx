import { CgCPlusPlus } from "react-icons/cg";
import { FaNode } from "react-icons/fa";
import {
    DiJavascript1,
    DiReact,
    DiPython,
    DiJava,
    DiDatabase
} from "react-icons/di";
import {
  SiRedis,
  SiPostgresql,
} from "react-icons/si";

const TechStack = () => {
    const title = ["React","Node.js","Java","C++","JavaScript","PostgreSQL","Database","Pyython","Redis"];
    return (

            <div className="flex flex-wrap justify-center gap-8 py-16 md:px-28">
                {[DiReact, FaNode, DiJava, CgCPlusPlus, DiJavascript1, SiPostgresql, DiDatabase, DiPython, SiRedis].map((Icon, index) => (
                    <div
                        key={index}
                        className="w-[150px] md:w-[200px] h-28 px-4 py-3 text-[50px] text-white rounded-md border-2 border-purple-800 flex items-center justify-center transition-transform transform duration-500 hover:scale-110 hover:bg-purple-800 hover:text-purple-300"
                        title={title[index]}
                    >
                        <Icon />
                    </div>
                ))}
            </div>
    );
};

export default TechStack;
