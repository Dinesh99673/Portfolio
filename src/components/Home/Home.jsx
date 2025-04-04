import React from "react";

import AboutPic from "../../assets/About-pic.avif"
import Type from "./Type";
import Introduction from "./Introduction";
import Particle from "../Particle";

const Home = () => {

    return (
        <div className="flex flex-col z-10 ">
            <div className="bg-heading-gradient text-white flex flex-col md:flex-row justify-center items-center h-screen w-[100%] px-4 py-8 space-y-10 md:px-12 ">
                <div className="md:w-1/2 hidden md:block mb-8 md:mb-0 ">
                    <center>
                        <img src={AboutPic} alt="Home-Photo" className="shadow-xl shadow-purple-950 rounded-xl w-3/5 h-auto" />
                    </center>
                </div>
                <div className="md:w-1/2 flex justify-center items-center mt-8 md:mt-0">
                    <center className="md:w-4/5 text-left">
                        <h1 className="text-3xl md:text-5xl ml-2 mb-5">Hi There!{"  "}
                            <span className="wave" role="img" aria-labelledby="wave">👋🏻</span>
                        </h1>
                        <h1 className="text-3xl md:text-4xl mt-8 ">
                            I'M {" "}
                            <strong className="text-[30px] md:text-[50px] text-purple-500">Dinesh Chaudhari</strong>
                        </h1>
                        <div className="text-left mt-14 text-2xl md:text-3xl text-purple-500">
                            <Type />
                        </div>
                    </center>
                </div>
                <div className="md:hidden mt-14">
                    <center>
                        <img src={AboutPic} alt="Home-Photo" className="shadow-xl shadow-purple-950 rounded-xl w-3/4 h-auto" />
                    </center>
                </div>
            </div>
            <Introduction/>
        </div>
    );
}

export default Home;
