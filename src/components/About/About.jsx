import React from "react";
import AboutCard from "./AboutCard";
import TechStack from "./TechStack";
import ToolStack from "./ToolStack";
import Github from "./Github";

const About = ()=>{
    return(
        <section className="bg-[#1a061a] flex flex-col justify-center items-center  w-[100%] font-sans ">
            <AboutCard />
            <h1 className="text-white md:text-[40px] text-4xl font-semibold mt-20">
                Professional <span className="text-purple-500">Skillset</span>
            </h1>
            <TechStack/>
            <h1 className="text-white md:text-[40px] text-4xl font-semibold mt-8">
                <span className="text-purple-500">Tools </span> I use
            </h1>
            <ToolStack/>
            <h1 className="text-white md:text-[40px] text-4xl font-semibold mt-6 mb-8">
                Days I <span className="text-purple-500">Code </span>
            </h1>

            <Github/>
        </section>
    );
}

export default About;