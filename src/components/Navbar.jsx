import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { AiFillGithub } from "react-icons/ai";

const links = [
    { to: "/", label: "Home" },
    { to: "/About", label: "About" },
    { to: "/Project", label: "Projects" },
    { to: "/Resume", label: "Resume" },
    { to: "/Contact", label: "Contact" },
];

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className="z-50 fixed top-0 left-0 right-0 h-16 bg-ink/85 backdrop-blur border-b border-seam flex items-center justify-between px-6 md:px-10">
            {/* Logo */}
            <NavLink to="/" className="font-mono text-copper text-xl font-bold tracking-tight" onClick={() => setMenuOpen(false)}>
                DC<span className="text-ash">.</span>
            </NavLink>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center space-x-8">
                {links.map(({ to, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={to === "/"}
                        className={({ isActive }) =>
                            `relative group font-mono text-sm tracking-widest uppercase transition-colors ${
                                isActive ? "text-copper" : "text-ash hover:text-bone"
                            }`
                        }
                    >
                        {label}
                        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-copper transition-all duration-300 group-hover:w-full"></span>
                    </NavLink>
                ))}
                <a
                    className="text-ash hover:text-copper transition-colors text-2xl"
                    href="https://github.com/Dinesh99673"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                >
                    <AiFillGithub />
                </a>
            </nav>

            {/* Mobile Menu Icon */}
            <button
                aria-label="Toggle Menu"
                aria-expanded={menuOpen}
                className="md:hidden text-bone"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Mobile Dropdown Menu */}
            <div
                className={`absolute top-16 left-0 w-full bg-ink/95 backdrop-blur border-b border-seam md:hidden flex flex-col items-center gap-6 py-8 transition-all duration-300 ease-in-out ${
                    menuOpen
                        ? "translate-y-0 opacity-100 pointer-events-auto"
                        : "-translate-y-4 opacity-0 pointer-events-none"
                }`}
            >
                {links.map(({ to, label }) => (
                    <NavLink
                        key={to}
                        to={to}
                        end={to === "/"}
                        className={({ isActive }) =>
                            `font-mono text-base tracking-widest uppercase ${
                                isActive ? "text-copper" : "text-ash"
                            }`
                        }
                        onClick={() => setMenuOpen(false)}
                    >
                        {label}
                    </NavLink>
                ))}
                <a
                    className="text-ash text-2xl"
                    href="https://github.com/Dinesh99673"
                    target="_blank"
                    rel="noopener noreferrer"
                    title="GitHub"
                    onClick={() => setMenuOpen(false)}
                >
                    <AiFillGithub />
                </a>
            </div>
        </header>
    );
};

export default Navbar;
