import React from "react";
import { Link } from "react-router-dom";
import HoverPortrait from "./HoverPortrait";
import Introduction from "./Introduction";
import certificate from "../../assets/certificates/openai-codex-hackathon-winner.png";

const Home = () => {
    return (
        <div className="flex flex-col">
            <div className="min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 px-6 md:px-16 pt-28 pb-16">
                <div className="max-w-xl">
                    <p className="font-mono text-copper text-sm md:text-base tracking-[0.2em] uppercase mb-6">
                        Dinesh Chaudhari · Pune, IN
                    </p>
                    <h1 className="text-4xl md:text-6xl font-bold text-bone leading-tight">
                        I build products from{" "}
                        <span className="text-copper">firmware</span> to{" "}
                        <span className="text-copper">frontend</span>.
                    </h1>
                    <p className="text-ash text-lg md:text-xl mt-6">
                        Web apps, AI agents, and ESP32 hardware — designed, built,
                        and shipped end to end.
                    </p>

                    <div className="flex flex-wrap gap-3 mt-8">
                        <a
                            href={certificate}
                            target="_blank"
                            rel="noopener noreferrer"
                            title="View certificate"
                            className="font-mono text-xs md:text-sm border border-seam bg-panel text-bone px-3 py-1.5 rounded-sm hover:border-copper transition-colors"
                        >
                            🏆 OpenAI Codex Hackathon — Winner
                        </a>
                        <a
                            href="https://probuilder.in/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs md:text-sm border border-seam bg-panel text-bone px-3 py-1.5 rounded-sm hover:border-copper transition-colors"
                        >
                            Founder — ProBuilder.in
                        </a>
                    </div>

                    <div className="flex flex-wrap gap-4 mt-10">
                        <Link
                            to="/Project"
                            className="bg-copper hover:bg-copper-bright text-ink font-semibold px-6 py-3 rounded-sm transition-colors"
                        >
                            View work →
                        </Link>
                        <Link
                            to="/Resume"
                            className="border border-seam hover:border-copper text-bone font-semibold px-6 py-3 rounded-sm transition-colors"
                        >
                            Resume
                        </Link>
                    </div>
                </div>

                <HoverPortrait />
            </div>
            <Introduction />
        </div>
    );
}

export default Home;
