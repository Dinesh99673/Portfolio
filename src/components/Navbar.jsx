import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import {
    AiOutlineHome,
    AiOutlineFundProjectionScreen,
    AiOutlineUser,
  } from "react-icons/ai";

  import { CgFileDocument } from "react-icons/cg";


const Navbar = () =>{

    const [menuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    return (
        <header className="z-50 Header fixed top-0 md:top-3 left-0 right-0 md:w-[80%] h-16 md:h-14 mx-auto md:bg-transparent bg-gray-100 bg-opacity-[0.2] text-white md:rounded-full shadow-sm md:shadow-white flex items-center justify-between px-6">
            {/* Logo */}
            <p className="text-[#7a2fa9] text-4xl font-extrabold font-serif">DC.</p>

            {/* Desktop Menu */}
            <nav className="hidden  md:flex space-x-8 text-xl">
                <button  className=" text-white flex transition relative group" onClick={()=>{navigate("/")}}>
                <AiOutlineHome className="mr-2 mt-1"/>
                    Home
                    <span className="absolute left-0 bottom-0 w-0 h-[3px] rounded-full bg-purple-500 transition-all duration-500 group-hover:w-full"></span>
                </button>
                <button  className=" text-white flex transition relative group">
                    <AiOutlineUser className="mr-2 mt-1"/>
                    About
                    <span className="absolute left-0 bottom-0 w-0 h-[3px] rounded-full bg-purple-500 transition-all duration-500 group-hover:w-full"></span>
                </button>
                <button  className=" text-white flex transition relative group" onClick={()=>{navigate("/project")}}>
                    <AiOutlineFundProjectionScreen className="mr-2 mt-1"/>
                    Projects
                    <span className="absolute left-0 bottom-0 w-0 h-[3px] rounded-full bg-purple-500 transition-all duration-500 group-hover:w-full"></span>
                </button>
                <button  className=" text-white flex transition relative group" onClick={()=>{navigate("/Resume")}}>
                    <CgFileDocument className="mr-2 mt-1"/>
                    Resume
                    <span className="absolute left-0 bottom-0 w-0 h-[3px] rounded-full bg-purple-500 transition-all duration-500 group-hover:w-full"></span>
                </button>
                <button  className=" text-white flex transition relative group">
                    <AiOutlineHome className="mr-2 mt-1"/>
                    Contact
                    <span className="absolute left-0 bottom-0 w-0 h-[3px] rounded-full bg-purple-500 transition-all duration-500 group-hover:w-full"></span>
                </button>
            </nav>

            {/* Mobile Menu Icon */}
            <button
                aria-label="Toggle Menu"
                className="md:hidden text-white focus:outline-none"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>

            {/* Mobile Dropdown Menu */}
            <div
                className={`Header absolute top-0 left-0 w-full mt-16 text-xl text-white md:hidden flex flex-col items-center space-y-4 transition-transform duration-500 ease-in-out${
                    menuOpen
                    ? "transform translate-y-0 opacity-100 pointer-events-auto"
                    : "transform -translate-y-full opacity-0 pointer-events-none"
                }`}
                >
                <button
                    className="flex text-white font-semibold transition mt-5"
                    onClick={() => {
                    setMenuOpen(false);
                    navigate("/about");
                    }}
                >
                    <AiOutlineUser className="mr-2 mt-1" />
                    About
                </button>
                <button
                    className="flex text-white font-semibold transition"
                    onClick={() => {
                    setMenuOpen(false);
                    navigate("/project");
                    }}
                >
                    <AiOutlineFundProjectionScreen className="mr-2 mt-1" />
                    Projects
                </button>
                <button
                    className="flex text-white font-semibold"
                    onClick={() => {
                    setMenuOpen(false);
                    navigate("/Resume");
                    }}
                >
                    <CgFileDocument className="mr-2 mt-1" />
                    Resume
                </button>
                <button
                    className="flex text-white font-semibold transition"
                    onClick={() => {
                    setMenuOpen(false);
                    navigate("/contact");
                    }}
                >
                    <AiOutlineHome className="mr-2 mt-1" />
                    Contact
                </button>
            </div>


        </header>
    );
}

export default Navbar;