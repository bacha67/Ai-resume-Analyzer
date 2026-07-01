import { Link } from "react-router";
//import { constructor, useEffect, useState } from "react";
import ScoreCircle from "./ScoreCircle";

type ResumeCardProps = {
    resume: Resume;
};

const ResumeCard = ({ resume }: ResumeCardProps) => {
    return (
        <Link
            to={`/resume/${resume.id}`}
            className="resume-card shadow-sm hover:shadow-md transition-shadow border border-gray-100 flex flex-col justify-between"
        >
            <div className="resume-card-header w-full">
                <div className="flex flex-col gap-1 items-start text-left">
                    <h2 className="text-black font-bold break-words text-2xl">
                        {resume.companyName || "General Application"}
                    </h2>
                    <h3 className="text-lg break-words text-gray-500">
                        {resume.jobTitle}
                    </h3>
                </div>

                <div className="flex-shrink-0">
                    <ScoreCircle score={resume.feedback?.overallScore || 0} />
                </div>
            </div>
            <div className="gradient-border animate-in fade-in duration-1000">
                <div className="w-full h-full">
                    <img
                        src={resume.resumeUrl || resume.imagePath || "/images/resume_01.png"}
                        alt="resume"
                        className="w-full h-[350px] max-sm:h-[200px] object-cover object-top rounded-lg"
                    />
                </div>

            </div>
        </Link>
    );
};

export default ResumeCard;