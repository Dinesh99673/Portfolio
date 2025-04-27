import ProjectCard from './ProjectCard.jsx';
import ProjectData from './ProjectData.jsx';

const Projects = () => {

  return (
<section id="projects" className="py-16 px-5 bg-[#121212] text-white min-h-screen">
  <div className="max-w-screen-xl mx-auto mt-14">
    <h2 className="text-3xl font-semibold text-center">
      My Recent <span className="text-purple-500">Works</span>
    </h2>
    <p className="md:text-lg text-base text-white text-center mb-14">
      Here are a few projects I've worked on recently
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-9 r">
      {ProjectData.map((project, index) => (
        <ProjectCard key={index} {...project} />
      ))}
    </div>
  </div>
</section>


  );
};

export default Projects;
