import React from "react";
import AboutMe from "../../assets/about.png";
import { ImPointRight } from "react-icons/im";
import SectionHeading from "../SectionHeading";

const AboutCard = () => {
    return (
        <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-3/5 w-full">
                <SectionHeading label="About" title="Know who I am" />
                <p className="text-base md:text-lg leading-relaxed text-bone/90">
                    Hello! I&apos;m <span className="text-copper font-semibold">Dinesh Chaudhari</span>, a <span className="text-copper">Full Stack Developer</span> currently working at <span className="text-copper">Innover Labs, Pune</span>.
                    <br/> I build scalable web applications with React, Node.js, and modern cloud technologies.
                    <br />With a strong foundation in Computer Science, I am actively seeking new opportunities to tackle more complex challenges and contribute to innovative projects.
                    <br />
                    <br />
                    Apart from coding, some other activities that I love to do!
                </p>
                <ul className="mt-4 pl-2 text-ash">
                    <li className="flex items-center">
                        <ImPointRight className="mr-2 text-copper" /> Watching Anime
                    </li>
                    <li className="flex items-center">
                        <ImPointRight className="mr-2 text-copper" /> Travelling
                    </li>
                    <li className="flex items-center">
                        <ImPointRight className="mr-2 text-copper" /> Reading books (fiction, tech, etc.)
                    </li>
                </ul>
                <p className="mt-8 font-mono text-copper text-base md:text-lg">
                    <span className="text-ash">//</span> &quot;While there is <span className="line-through mx-1 text-ash opacity-60">Life</span> Code, there is <span className="line-through mx-1 text-ash opacity-60">Hope</span> Bug.&quot;
                </p>
            </div>
            <div className="flex justify-center items-center md:w-2/5 w-full">
                <img
                    src={AboutMe}
                    alt="About Me"
                    className="border border-seam rounded-md w-full max-w-md h-auto"
                />
            </div>
        </div>
    );
};

export default AboutCard;
