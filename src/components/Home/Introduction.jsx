import React from "react";

import avatar from "../../assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import {
  AiFillGithub,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const Introduction = () => {
  return (
    <>
      <div className="bg-[#1a061a] flex flex-col md:flex-row justify-center items-center h-full w-[100%] font-Nunito font-semibold md:p-10 ">
          <div className="md:w-3/5 w-4/5 md:mb-0 mb-8 mt-8">
              <h1 className="text-white w-full text-center md:text-4xl text-2xl mb-6">
                  LET ME <span className="text-purple-500">INTRODUCE</span> MYSELF
              </h1>
              <p className="md:text-lg text-base text-white ">
                  I fell in love with programming and I have at least learnt something, I think… 🤷‍♂️
                  <br />
                  <br />
                  I am fluent in classics like
                  <b className="text-purple-500"> C, C++, JavaScript and Java </b>
                  <br />
                  <br />
                  My interests span
                  <b className="text-purple-500"> Full-Stack Development</b>, exploring
                  <b className="text-purple-500"> innovative solutions in AI</b>, and creating intuitive user experiences.
                  <br />
                  <br />
                  I'm always eager to learn and contribute to projects involving
                  <b className="text-purple-500"> modern frameworks like Spring Boot.</b>
                  <br />
                  <br />
                  Let's build something amazing together!
              </p>
          </div>
          <div className="md:w-2/5 w-4/5 flex justify-center mb-8 md:mb-0">
              <Tilt>
                  <img
                      src={avatar}
                      alt="Home-Photo"
                      className="shadow-xl shadow-purple-950 rounded-full w-full h-[90%]"
                  />
              </Tilt>
          </div>
      </div>
      <div className="bg-[#1a061a] flex flex-col justify-center items-center h-full w-[100%] font-Nunito font-semibold md:p-10 ">
          <h1 className="md:text-5xl text-3xl text-white font-sans">FIND ME ON</h1>
          <p className="text-xl text-white font-sans mt-5">
          Feel free to <span className="text-purple-500">connect </span>with me
          </p>
          <ul className="flex flex-row mt-5 text-violet-900 md:gap-9 gap-4 text-2xl mb-10 md:mb-6">
              <li className="md:w-12 md:h-12 w-10 h-10 p-4 bg-fuchsia-100 rounded-full flex justify-center items-center border-2 hover:shadow-md shadow-inner hover:border-purple-700 hover:shadow-violet-500 transition-all duration-500 ease-in-out">
                  <a
                  href="https://github.com/Dinesh99673"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                  title="Github"
                  >
                  <AiFillGithub />
                  </a>
              </li>
              <li className="md:w-12 md:h-12 w-10 h-10 p-4 bg-fuchsia-100 rounded-full flex justify-center items-center border-2 hover:shadow-md shadow-inner hover:border-purple-700 hover:shadow-violet-500 transition-all duration-500 ease-in-out">
                  <a
                  href="https://leetcode.com/u/dinesh99673/"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                  title="LeetCode"
                  >
                  <SiLeetcode />
                  </a>
              </li>
              <li className="md:w-12 md:h-12 w-10 h-10 p-4 bg-fuchsia-100 rounded-full flex justify-center items-center border-2 hover:shadow-md shadow-inner hover:border-purple-700 hover:shadow-violet-500 transition-all duration-500 ease-in-out">
                  <a
                  href="www.linkedin.com/in/dinesh7821"
                  target="_blank"
                  rel="noreferrer"
                  className="icon-colour  home-social-icons"
                  title="Linkedin"
                  >
                  <FaLinkedinIn />
                  </a>
              </li>
              <li className="md:w-12 md:h-12 w-10 h-10 p-4 bg-fuchsia-100 rounded-full flex justify-center items-center border-2 hover:shadow-md shadow-inner hover:border-purple-700 hover:shadow-violet-500 transition-all duration-500 ease-in-out">
                  <a
                  href="https://www.instagram.com/dineshdchoudhari?igsh=MTg4dWN5aWh1aWw3OA=="
                  target="_blank"
                  rel="noreferrer"
                  className=""
                  title="Instagram"
                  >
                  <AiFillInstagram />
                  </a>
              </li>
          </ul>
      </div>
    </>
  );
};

export default Introduction;
