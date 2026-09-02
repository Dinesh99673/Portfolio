import AboutMe from "../../assets/about.png";
import { ImPointRight } from "react-icons/im";
import SectionHeading from "../SectionHeading";

const interests = [
  "Watching anime",
  "Travelling",
  "Reading — fiction and tech",
  "Learning Japanese (currently N5)",
];

const AboutCard = () => {
    return (
        <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="md:w-3/5 w-full">
                <SectionHeading label="About" title="Background" />
                <div className="text-base md:text-lg leading-relaxed text-bone/90 space-y-5">
                    <p>
                        I&apos;m Dinesh — a full-stack developer in Pune, currently at{" "}
                        <span className="text-copper">Innover Labs</span> while doing my
                        MCA at Manipal.
                    </p>
                    <p>
                        I came to the web from the hardware side, and I still think that
                        way: find the constraint first, then build the smallest thing that
                        satisfies it. GhostDesk had to fit in 512 MB, so rooms live in
                        memory with hard caps and automatic trimming. Rabbitship had to
                        ship updates without a Play Store release, so it got its own OTA
                        pipeline gated by a minimum-supported-version policy. The
                        constraint usually turns out to be the design.
                    </p>
                    <p>
                        I also run <span className="text-copper">ProBuilder</span>, helping
                        engineering students take academic projects from idea to delivery —
                        mostly because I remember how little help there was when I was
                        doing mine.
                    </p>
                </div>
                <p className="mt-8 font-mono text-sm text-ash tracking-widest uppercase">
                    Away from the keyboard
                </p>
                <ul className="mt-3 text-ash space-y-1">
                    {interests.map((item) => (
                        <li key={item} className="flex items-center">
                            <ImPointRight className="mr-2 text-copper shrink-0" /> {item}
                        </li>
                    ))}
                </ul>
                <p className="mt-8 font-mono text-copper text-base md:text-lg">
                    <span className="text-ash">//</span> I&apos;d rather ship one thing that
                    holds up than three that demo well.
                </p>
            </div>
            <div className="flex justify-center items-center md:w-2/5 w-full">
                <img
                    src={AboutMe}
                    alt="About Me"
                    className="border border-seam rounded-md w-full max-w-md h-auto"
                />
            </div>
        </div>
    );
};

export default AboutCard;
