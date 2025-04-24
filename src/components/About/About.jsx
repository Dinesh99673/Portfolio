import React from "react";
import AboutMe from "../../assets/about.png";

const About = ()=>{
    return(
        <section className="bg-[#1a061a] flex flex-col justify-center items-center h-full w-[100%] font-Nunito font-semibold md:p-10 ">
            <div className="flex flex-col md:flex-row px-12">
                <div className="md:w-4/5 w-4/5 md:mb-0 mb-8 mt-9">
                    <h1 className="text-white w-full text-center md:text-4xl text-2xl mb-6">
                        Know Who <span className="text-purple-500">I'M</span>
                    </h1>
                    <p className="md:text-lg text-base text-white ">
                        Hi Everyone, My name is <span className="text-purple-500">Dinesh Chaudhari </span>from Maharashtra, India.
                        <br />
                        I recently completed my BSc in Computer Science from Modern College, Shivajinagar, Pune.
                        <br />
                        I’m currently looking for opportunities where I can apply my skills,<br /> grow as a developer, and contribute meaningfully to exciting tech projects.
                    </p>
                </div>
                <div className="md:w-4/5 w-4/5 flex justify-center mb-8 md:mb-0">
                    <center>
                        <img src={AboutMe} alt="Home-Photo" className="shadow-xl rounded-xl w-4/5 mt-6 h-auto" />
                    </center>
                </div>            
            </div>
        </section>
    );
}

export default About;