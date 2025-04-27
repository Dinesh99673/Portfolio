import React from "react";
import AboutMe from "../../assets/about.png";
import { ImPointRight } from "react-icons/im";

const AboutCard = () => {
    return (
        <div className="flex flex-col md:flex-row px-6 md:px-12 pt-28 overflow-auto no-scrollbar pb-5">
            <div className="md:w-3/5 w-full md:mr-6 text-white">
                <h1 className="text-center text-2xl md:text-4xl mb-4 md:mb-6">
                    Know Who <span className="text-purple-500">I'M</span>
                </h1>
                <p className="text-base md:text-lg leading-6 md:leading-7 text-justify">
                    Hi Everyone, My name is <span className="text-purple-500">Dinesh Chaudhari</span> from <span className="text-purple-500">Maharashtra, India.</span>
                    <br />
                    I recently completed my BSc in Computer Science from Modern College, Shivajinagar, Pune.
                    <br />
                    I’m currently looking for opportunities where I can apply my skills, grow as a developer, and contribute meaningfully to exciting tech projects.
                    <br />
                    <br />
                    Apart from coding, some other activities that I love to do!
                </p>
                <ul className="mt-4 pl-6">
                    <li className="flex items-center">
                        <ImPointRight className="mr-2" /> Watching Anime
                    </li>
                    <li className="flex items-center">
                        <ImPointRight className="mr-2" /> Travelling
                    </li>
                    <li className="flex items-center">
                        <ImPointRight className="mr-2" /> Reading books (fiction, tech, etc.)
                    </li>
                </ul>
                <p className="mt-8 md:pl-20 text-center md:text-left text-lg md:text-2xl text-purple-600 font-semibold">
                    "While there is <span className="line-through mx-1 text-gray-300 opacity-60">Life</span> Code, there is <span className="line-through mx-1 text-gray-300 opacity-60">Hope</span> Bug."
                </p>
            </div>
            <div className="flex justify-center items-center mt-6 md:mt-0 md:w-2/5 w-full">
                <img
                    src={AboutMe}
                    alt="About Me"
                    className="shadow-lg rounded-lg w-full max-w-md h-auto"
                />
            </div>
        </div>
    );
};

export default AboutCard;
