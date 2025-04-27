import React from "react";
import AboutCard from "./AboutCard";
import TechStack from "./TechStack";

const About = ()=>{
    return(
        <section className="bg-[#1a061a] flex flex-col justify-center items-center h-full w-[100%] font-Nunito overflow-scroll no-scrollbar">
            <AboutCard />
            
        </section>
    );
}

export default About;