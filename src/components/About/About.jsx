import React from "react";
import AboutCard from "./AboutCard";
import Credentials from "./Credentials";
import TechStack from "./TechStack";
import ToolStack from "./ToolStack";
import Github from "./Github";
import SectionHeading from "../SectionHeading";

const About = ()=>{
    return(
        <div className="px-6 md:px-16 py-16 min-h-screen">
            <div className="max-w-screen-xl mx-auto mt-14">
                <AboutCard />
                <section aria-labelledby="credentials-heading" className="mt-20">
                    <SectionHeading id="credentials-heading" label="Record" title="Achievements & education" />
                    <Credentials/>
                </section>
                <section aria-labelledby="skills-heading" className="mt-12">
                    <SectionHeading id="skills-heading" label="Skillset" title="What I build with" />
                    <TechStack/>
                </section>
                <section aria-labelledby="tools-heading" className="mt-12">
                    <SectionHeading id="tools-heading" label="Toolbox" title="Daily drivers" />
                    <ToolStack/>
                </section>
                <section aria-labelledby="activity-heading" className="mt-12 mb-8">
                    <SectionHeading id="activity-heading" label="Activity" title="Commit history" />
                    <Github/>
                </section>
            </div>
        </div>
    );
}

export default About;
