import saath from "../../assets/projects/1Saath.jpg";
import structify from "../../assets/projects/structify.png";
import bookCollection from "../../assets/projects/bookCollection.jpg";
import Book_Review from "../../assets/projects/Book-Review.jpeg"
import schedula from "../../assets/projects/schedula.png";
import BioPrintAI from "../../assets/projects/BioPrint-AI.png";
import ghostdesk from "../../assets/projects/ghostdesk.png";
import wappr from "../../assets/projects/wappr.png";
import probuilder from "../../assets/projects/probuilder.png";
import dsignitefitness from "../../assets/projects/dsignitefitness.png";
import secureDonations from "../../assets/projects/secureDonations.png";
import gestureAI from "../../assets/projects/gestureAI.png";
import smartEV from "../../assets/projects/smartEV.png";
import coinSorting from "../../assets/projects/coinSorting.png";
import cellBalancing from "../../assets/projects/cellBalancing.png";
import codexCertificate from "../../assets/certificates/openai-codex-hackathon-winner.png";

const ProjectData = [
    {
        title: "GhostDesk",
        description:
        "A privacy-first, disposable collaborative workspace — video calls with live reactions, real-time collaborative notes and code editor, whiteboard, P2P file sharing, and a push-to-talk AI agent. When the last participant leaves, the entire room is permanently destroyed. Winner of the OpenAI Codex Hackathon.",
        tech: ["React", "Node.js", "Socket.IO", "WebRTC", "Yjs", "OpenAI API"],
        image: ghostdesk,
        githubLink: "https://github.com/Dinesh99673/GhostDesk",
        liveLink: "https://ghostdesk.probuilder.in/",
        award: "Hackathon Winner",
        awardLink: codexCertificate,
        categories: ["Web", "AI"],
        featured: true,
    },
    {
        title: "BioPrint-AI",
        description:
        "BioPrint AI is a fingerprint-based healthcare system for instant patient identification during emergency. It includes secure OTP access, role-based dashboards, centralized medical records, and blood-donor search by location. The project also features an ML model for blood-group prediction from fingerprints.",
        tech: ["React.js", "Firebase", "Python", "FastAPI", "R307s Module"],
        image: BioPrintAI,
        githubLink: "https://github.com/Dinesh99673/BioPrint-AI",
        liveLink: "https://bio-print-ai.vercel.app/",
        categories: ["Web", "AI", "Embedded"],
        featured: true,
    },
    {
        title: "Wappr",
        description:
        "A self-hosted WhatsApp bulk messaging dashboard. Log in with your own WhatsApp by scanning a QR code, then send single or bulk messages — text and media — to any list of contacts from a clean dashboard. No external services required, with Docker support for one-command deployment.",
        tech: ["Next.js", "whatsapp-web.js", "Prisma", "SQLite", "Docker"],
        image: wappr,
        githubLink: "https://github.com/Dinesh99673/wappr",
        categories: ["Web"],
        featured: true,
    },
    {
        title: "ProBuilder.in",
        description:
        "The official website of ProBuilder, my own venture helping engineering students build complete academic projects from idea to delivery. A cyberpunk-themed, animation-rich site with 3D visuals, smooth scrolling, and an owl mentor that guides visitors section by section as they scroll.",
        tech: ["React", "TypeScript", "Three.js", "GSAP", "Framer Motion"],
        image: probuilder,
        githubLink: "https://github.com/Dinesh99673/ProBuilder",
        liveLink: "https://probuilder.in/",
        categories: ["Web"],
        featured: true,
    },
    {
        title: "DSigniteFitness",
        description:
        "A production marketing website built for DSigniteFitness, a premium gym brand. Designed from the gym's real photography with a custom design system, scroll animations, a photo gallery, and a prerendered build for fast loads and SEO.",
        tech: ["React", "TypeScript", "Vite", "Tailwind", "shadcn/ui"],
        image: dsignitefitness,
        githubLink: "https://github.com/Dinesh99673/dsignitefitness",
        liveLink: "https://www.dsignitefitness.com/",
        categories: ["Web"],
    },
    {
        title: "Secure Donations on Blockchain",
        description:
        "A decentralized application for secure, transparent donations on Ethereum. NGOs are verified on-chain before they can accept funds; donors pay through a smart contract that forwards ETH to the NGO and immutably logs every donation, with admin and donor dashboards powered by MetaMask.",
        tech: ["Solidity", "Hardhat", "ethers.js", "React", "MetaMask"],
        image: secureDonations,
        categories: ["Blockchain", "Web"],
    },
    {
        title: "Schedula",
        description:
         "A conversational AI agent that can assist users in booking appointments on your Google Calendar. The agent is capable of engaging in a natural, back-and-forth conversation with the user, understanding their intent, checking calendar availability, suggesting suitable time slots, and confirming bookings — all seamlessly through chat. ",
        tech: ["Python", "FastAPI", "Streamlit", "Google Calendar"],
        image: schedula,
        githubLink: "https://github.com/Dinesh99673/Schedula",
        liveLink: "https://schedulagit-cjppuhitiurwqxfbaswkqq.streamlit.app/",
        categories: ["AI"],
    },
    {
        title: "Gesture AI — Air-Writing Recognition",
        description:
        "An air-writing recognition system: a glove mounted with an ESP32 and an MPU-6050 IMU captures hand motion, and an LSTM deep-learning model recognizes letters (A–Z) and digits (0–9) drawn in the air, speaking the result aloud through real-time text-to-speech.",
        tech: ["ESP32", "MPU-6050", "Python", "TensorFlow", "LSTM"],
        image: gestureAI,
        categories: ["Embedded", "AI"],
    },
    {
        title: "Smart EV Recharge Assistant",
        description:
        "An emergency recharge assistant retrofitted to a 24V electric tricycle. An ESP32 monitors pack voltage and current to estimate state of charge, alerting the rider and latching a power-saving mode when charge runs low. Live telemetry streams over BLE to a Flutter app that finds the nearest charging station and checks it is within remaining range.",
        tech: ["ESP32", "C++", "PlatformIO", "Flutter", "BLE"],
        image: smartEV,
        categories: ["Embedded"],
    },
    {
        title: "Coin Sorting Machine",
        description:
        "An automatic coin sorting machine for Indian ₹1, ₹2, ₹5 and ₹10 coins. Dual USB cameras image both faces of each coin, a MobileNetV2 classifier identifies the denomination through OpenCV, and an ESP32 drives the stepper, belt and sweeper to drop it into the right bin.",
        tech: ["Python", "OpenCV", "MobileNetV2", "ESP32", "Tkinter"],
        image: coinSorting,
        categories: ["Embedded", "AI"],
    },
    {
        title: "BMS — Cell Balancing",
        description:
        "A battery management system for a grid-interactive Li-ion standby storage setup: cell balancing and thermal protection for a 4S pack that carries the load when mains fails. A MATLAB simulation covers the dangerous scenarios, validated against a hardware prototype that measures honestly enough to prove the simulation can be trusted.",
        tech: ["MATLAB", "Embedded C", "Li-ion BMS", "Power Electronics"],
        image: cellBalancing,
        categories: ["Embedded"],
    },
    {
        title: "Book Review API",
        description:
        "  Built a RESTful API using Node.js and Express to manage books and user reviews. Implemented features like user registration, login with JWT authentication, and CRUD operations for books and reviews using PostgreSQL.",
        tech: ["Node.js", "Express.js", "PostgreSQL", "REST API"],
        image: Book_Review,
        githubLink: "https://github.com/Dinesh99673/Book-Review-API",
        categories: ["Web"],
    },
    {
      title: "1SAATH",
      description:
        "A full-stack web platform where NGOs can register, manage events, and receive donations. Integrated secure payment gateways and NGO-to-NGO Donation features to promote visibility and funding for rural NGOs.",
      tech: ["React", "Spring Boot", "PostgreSQL", "Redis", "Tailwind"],
      image: saath,
      githubLink:"https://github.com/Dinesh99673/Ngo_Backend",
      categories: ["Web"],
    },
    {
        title: "Structify",
        description:
        "Built an educational web app, Structify, to help users learn data structures interactively via dynamic visualizations, in-browser coding with output, and concise theoretical content. Integrated Piston API for code execution in multiple languages.",
        tech: ["React", "Tailwind", "PistonAPI"],
        image: structify,
        githubLink: "https://github.com/Dinesh99673/Structify",
        liveLink: "https://dinesh99673.github.io/Structify/",
        categories: ["Web"],
    },
    {
        title: "Book Collection",
        description:"Developed a web application to help users track books they've read using React and Appwrite. Features include user authentication, book listing, and simple CRUD operations for managing personal reading history. Used open Library API for getting Book information",
        tech: ["React", "Tailwind", "Appwrite", "Open Library API"],
        image: bookCollection,
        githubLink: "https://github.com/Dinesh99673/BookCollection_using_appwrite",
        liveLink: "https://book-collection-using-appwrite.vercel.app/",
        categories: ["Web"],
    },
]

export default ProjectData;
