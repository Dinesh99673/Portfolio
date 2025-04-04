import React from "react";

import {
    AiFillGithub,
    AiOutlineTwitter,
    AiFillInstagram,
  } from "react-icons/ai";
import { FaLinkedinIn } from "react-icons/fa";

const Footer = () =>{
    return(
        <footer className="bg-black text-white py-4 px-6 md:flex-row gap-3 md:gap-0 flex-col flex md:justify-between items-center w-full">
        <div>
          <p>Designed and Developed by <span className="text-purple-500">Dinesh Chaudhari</span></p>
        </div>
        <div>
          <p>Copyright &copy; {new Date().getFullYear()} DC</p>
        </div>
        <div className="flex gap-4">
          <a
            href="https://github.com/Dinesh99673"
            target="_blank"
            rel="noreferrer"
            className="text-white text-2xl"
          >
            <AiFillGithub />
          </a>
          <a
            href="https://twitter.com/dinesh"
            target="_blank"
            rel="noreferrer"
            className="text-white text-2xl"
          >
            <AiOutlineTwitter />
          </a>
          <a
            href="www.linkedin.com/in/dinesh7821"
            target="_blank"
            rel="noreferrer"
            className="text-white text-2xl"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://www.instagram.com/dineshdchoudhari?igsh=MTg4dWN5aWh1aWw3OA=="
            target="_blank"
            rel="noreferrer"
            className="text-white text-2xl"
          >
            <AiFillInstagram />
          </a>
        </div>
      </footer>
    );
}

export default Footer;