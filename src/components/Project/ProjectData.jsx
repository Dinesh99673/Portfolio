import saath from "../../assets/projects/1Saath.png";
import snakeGame from "../../assets/projects/snakeGame.png";
import toDo from "../../assets/projects/todoList.png";
import pingPongGame from "../../assets/projects/pingPongGame.png";
import structify from "../../assets/projects/structify.png";
import bookCollection from "../../assets/projects/bookCollection.png";


const ProjectData = [
    {
      title: "1SAATH",
      description:
        "a full-stack web platform where NGOs can register, manage events, and receive donations. Integrated secure payment gateways and NGO-to-NGO Donation features to promote visibility and funding for rural NGOs.",
      tech: ["React", "Spring Boot", "PostgreSQL", "Redis", "Tailwind"],
      image: saath,
      githubLink:"https://github.com/Dinesh99673/Ngo_Backend",
    },    
    {
        title: "Structify",
        description:
        "Built an educational web app, Structify, to help users learn data structures interactively via dynamic visualizations, in-browser coding with output, and concise theoretical content. Integrated Piston API for code execution in multiple languages.",
        tech: ["React", "Tailwind", "PistonAPI"],
        image: structify,
        githubLink: "https://github.com/Dinesh99673/Structify",
        liveLink: "https://dinesh99673.github.io/Structify/",
    },    
    {
        title: "Book Collection",
        description:"Developed a web application to help users track books they've read using React and Appwrite. Features include user authentication, book listing, and simple CRUD operations for managing personal reading history. Used open Library API for getting Book information",
        tech: ["React", "Tailwind", "Appwrite", "Open Library API"],
        image: bookCollection,
        githubLink: "https://github.com/Dinesh99673/BookCollection_using_appwrite",
        liveLink: "https://book-collection-using-appwrite.vercel.app/",
    },
    {
        title: "ToDo List",
        description:
        "Built an educational web app, Structify, to help users learn data structures interactively via dynamic visualizations, in-browser coding with output, and concise theoretical content. Integrated Piston API for code execution in multiple languages.",
        tech: ["React", "Tailwind"],
        image: toDo,
        githubLink: "https://github.com/Dinesh99673/ToDo_using_React",
        liveLink: "https://dinesh99673.github.io/ToDo_using_React/",
    },
    {
        title: "Classic Snake Game",
        description:
        "Implemented a fully functional Snake Game in Python using the Turtle module. Features include dynamic snake growth, boundary and self-collision detection, and a real-time scoring system.",
        tech: ["Python", "Turtle"],
        image: snakeGame,
        githubLink: "https://github.com/Dinesh99673/Snake_Game",
    },
    {
        title: "Ping Pong Game",
        description:
        "Implemented a two-player Ping Pong game in Python using the Turtle module. Integrated core game mechanics like paddle collision, ball bounce logic, boundary detection, and score updates.",
        tech: ["Python", "Turtle"],
        image: pingPongGame,
        githubLink: "https://github.com/your-structify-repo",
    },
]

export default ProjectData;