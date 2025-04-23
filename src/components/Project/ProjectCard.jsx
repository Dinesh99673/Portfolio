import React from "react";

const ProjectCard = ({ title, description, tech, image, githubLink, liveLink }) => {
    return (
        
      <div className="my-1 min-w-30 sm:min-w-50 md:min-w-60  md:max-w-83 h-[550px] bg-[#121212]  rounded-xl overflow-hidden shadow-md shadow-purple-700 border-black hover:scale-105 hover:shadow-lg hover:shadow-purple-500 transition-transform duration-500">
        <img src={image} alt={title} className="w-full h-48 object-center mt-2 mb-1 p-4" />
        <div className="p-4">
          <h3 className="text-gray-300 text-2xl text-center font-semibold mb-2">{title}</h3>
          <p className="text-gray-400 text-md mb-3">{description}</p>
          <div className="flex flex-wrap gap-2 text-sm text-gray-300 mb-4">
            {tech.map((item, idx) => (
              <span key={idx} className="bg-gray-700 px-2 py-1 rounded ">
                {item}
              </span>
            ))} 
          </div>
          <div className="flex justify-between">
            <a
              href={githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:underline text-xl"
            >
              GitHub
            </a>
           { liveLink && <a
              href={liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-400 hover:underline text-xl"
            >
              Live
            </a>}
          </div>
        </div>
      </div>
    );
  };
  
  export default ProjectCard;
  