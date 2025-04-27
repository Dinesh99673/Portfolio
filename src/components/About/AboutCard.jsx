import React from "react";
import AboutMe from "../../assets/about.png";
import { ImPointRight } from "react-icons/im";

const AboutCard = () => {
    return (
        <div className="flex flex-col md:flex-row px-12 pt-32 lg:pt-24 overflow-scroll no-scrollbar ">
            <div className="md:w-4/5 w-[100%] md:ml-9  md:mb-0  text-white  ">
                <h1 className="w-full text-center md:text-4xl text-3xl mb-6">
                    Know Who <span className="text-purple-500">I'M</span>
                </h1>
                <p className="md:text-xl text-lg text-justify">
                    Hi Everyone, My name is <span className="text-purple-500">Dinesh Chaudhari </span>from <span className="text-purple-500">Maharashtra, India.</span>
                    <br />
                    I recently completed my BSc in Computer Science from Modern College, Shivajinagar, Pune.
                    <br />
                    I’m currently looking for opportunities where I can apply my skills, grow as a developer, and contribute meaningfully to exciting tech projects.
                    <br />
                    <br />
                    Apart from coding, some other activities that i love to do!
                </p>
                <br />
                <ul className="pl-8 md:pl-9 ">
                    <li className="flex flex-row">
                        <ImPointRight className="mr-2"/> Watching Anime
                    </li>
                    <li className="flex flex-row">
                        <ImPointRight className="mr-2"/> Travelling
                    </li>
                    <li className="flex flex-row">
                        <ImPointRight className="mr-2"/> Reading books (fiction, tech, etc.)
                    </li>
                </ul>
                <p className="pl-8 md:pl-28 mt-10 md:text-2xl sm:text-xl text-lg text-purple-600 font-semibold">
                    "While there is <span className="line-through mx-2 text-gray-300 opacity-60">Life</span> Code, there is <span className="line-through mx-2 text-gray-300 opacity-60"> Hope </span> Bug."
                </p>
            </div>
            <div className="md:w-4/5 w-[100%] flex justify-center mb-8 md:mb-0">
                <center>
                    <img src={AboutMe} alt="Home-Photo" className="shadow-xl rounded-xl md:w-4/5 w-full mt-6 h-auto" />
                </center>
            </div>            
        </div>
    );
}

export default AboutCard;