import React from "react";
import AboutCard from "./AboutCard";
import Credentials from "./Credentials";
import TechStack from "./TechStack";
import ToolStack from "./ToolStack";
import Github from "./Github";
import SectionHeading from "../SectionHeading";

const About = ()=>{
    return(
        <section className="px-6 md:px-16 py-16 min-h-screen">
            <div className="max-w-screen-xl mx-auto mt-14">
                <AboutCard />
                <div className="mt-20">
                    <SectionHeading label="Record" title="Achievements & education" />
                    <Credentials/>
                </div>
                <div className="mt-12">
                    <SectionHeading label="Skillset" title="What I build with" />
                    <TechStack/>
                </div>
                <div className="mt-12">
                    <SectionHeading label="Toolbox" title="Daily drivers" />
                    <ToolStack/>
                </div>
                <div className="mt-12 mb-8">
                    <SectionHeading label="Activity" title="Commit history" />
                    <Github/>
                </div>
            </div>
        </section>
    );
}

export default About;
