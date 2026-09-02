import React from "react";

import {
    AiFillGithub,
    AiFillInstagram,
  } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";
import { SiLeetcode } from "react-icons/si";

const Footer = () =>{
    return(
        <footer className="border-t border-seam text-ash py-5 px-6 md:px-10 md:flex-row gap-3 md:gap-0 flex-col flex md:justify-between items-center w-full">
        <div>
          <p className="text-sm">Designed and developed by <span className="text-copper">Dinesh Chaudhari</span></p>
        </div>
        <div>
          <p className="font-mono text-xs">© {new Date().getFullYear()} DC</p>
        </div>
        <div className="flex gap-5 text-xl">
          <a
            href="https://github.com/Dinesh99673"
            target="_blank"
            rel="noreferrer"
            className="hover:text-copper transition-colors"
            title="Github"
          >
            <AiFillGithub />
          </a>
          <a
            href="https://leetcode.com/u/dinesh99673/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-copper transition-colors"
            title="LeetCode"
          >
            <SiLeetcode />
          </a>
          <a
            href="https://www.linkedin.com/in/dinesh7821"
            target="_blank"
            rel="noreferrer"
            className="hover:text-copper transition-colors"
            title="Linkedin"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://www.instagram.com/dineshdchoudhari?igsh=MTg4dWN5aWh1aWw3OA=="
            target="_blank"
            rel="noreferrer"
            className="hover:text-copper transition-colors"
            title="Instagram"
          >
            <AiFillInstagram />
          </a>
        </div>
      </footer>
    );
}

export default Footer;
