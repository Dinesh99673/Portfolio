import React from "react";
import AboutMe from "../../assets/about.png";

import { ImPointRight } from "react-icons/im";


const About = ()=>{
    return(
        <section className="bg-[#1a061a] flex flex-col justify-center items-center h-full w-[100%] font-Nunito font-semibold overflow-scroll no-scrollbar">
            <div className="flex flex-col md:flex-row px-12">
                <div className="md:w-4/5 w-[100%]  md:mb-0 md:pt-0 xs:pt-[450px] pt-[250px] mb-8  md:mt-0 text-white  ">
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
                            <ImPointRight className="mr-2"/> Reading Tech News
                        </li>
                        <li className="flex flex-row">
                            <ImPointRight className="mr-2"/> Travelling
                        </li>
                        <li className="flex flex-row">
                            <ImPointRight className="mr-2"/> Playing Games
                        </li>
                    </ul>
                    <p>
                        
                    </p>
                </div>
                <div className="md:w-4/5 w-[100%] flex justify-center mb-8 md:mb-0">
                    <center>
                        <img src={AboutMe} alt="Home-Photo" className="shadow-xl rounded-xl md:w-4/5 w-full mt-6 h-auto" />
                    </center>
                </div>            
            </div>
        </section>
    );
}

export default About;