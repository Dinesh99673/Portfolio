import React from "react";

import avatar from "../../assets/avatar.svg";
import Tilt from "react-parallax-tilt";
import SectionHeading from "../SectionHeading";
import {
  AiFillGithub,
  AiFillInstagram,
} from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const socials = [
  { href: "https://github.com/Dinesh99673", title: "GitHub", Icon: AiFillGithub },
  { href: "https://leetcode.com/u/dinesh99673/", title: "LeetCode", Icon: SiLeetcode },
  { href: "https://www.linkedin.com/in/dinesh7821/", title: "LinkedIn", Icon: FaLinkedinIn },
  { href: "https://www.instagram.com/dineshdchoudhari?igsh=MTg4dWN5aWh1aWw3OA==", title: "Instagram", Icon: AiFillInstagram },
];

const Introduction = () => {
  return (
    <>
      <div className="border-t border-seam px-6 md:px-16 py-16 md:py-24">
        <div className="max-w-screen-xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-3/5 w-full">
            <SectionHeading label="Introduction" title="Let me introduce myself" />
            <p className="text-lg text-bone/90 leading-relaxed">
              I fell in love with programming and I have at least learnt something, I think… 🤷‍♂️
              <br />
              <br />
              I am fluent in classics like
              <b className="text-copper"> C, JavaScript, Python and Java</b>, and just as
              comfortable flashing firmware onto an
              <b className="text-copper"> ESP32</b> as deploying a web app.
              <br />
              <br />
              My work spans
              <b className="text-copper"> full-stack development</b>,
              <b className="text-copper"> AI agents</b>, and
              <b className="text-copper"> embedded systems</b> — building intuitive products
              that connect software to the physical world.
              <br />
              <br />
              I&apos;m always eager to learn and contribute to projects involving
              <b className="text-copper"> modern frameworks like Express.js, React.js and Spring Boot.</b>
              <br />
              <br />
              Let&apos;s build something amazing together!
            </p>
          </div>
          <div className="md:w-2/5 w-3/5 flex justify-center">
            <Tilt>
              <img src={avatar} alt="Illustrated developer avatar" className="w-full max-w-sm" />
            </Tilt>
          </div>
        </div>
      </div>

      <div className="border-t border-seam px-6 md:px-16 py-16 flex flex-col items-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-bone">Find me on</h2>
        <p className="text-ash mt-3">
          Feel free to <span className="text-copper">connect</span> with me
        </p>
        <ul className="flex flex-row mt-8 gap-4 md:gap-6">
          {socials.map(({ href, title, Icon }) => (
            <li key={title}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                title={title}
                className="w-12 h-12 border border-seam bg-panel text-bone text-2xl rounded-sm flex justify-center items-center hover:border-copper hover:text-copper transition-colors duration-300"
              >
                <Icon />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Introduction;
