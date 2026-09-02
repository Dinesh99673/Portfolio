import React from "react";
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

const Elsewhere = () => {
  return (
    <div className="border-t border-seam px-6 md:px-16 py-16 flex flex-col items-center">
      <h2 className="text-3xl md:text-4xl font-semibold text-bone">Elsewhere</h2>
      <p className="text-ash mt-3">GitHub is where most of it lives.</p>
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
  );
};

export default Elsewhere;
