import { Link } from "react-router";
import { useEffect, useState } from "react";
//import { usePuterStore } from "~/lib/puter";

// Define the Resume type if it isn't already imported
type Resume = {
    id: string;
    companyName: string;
    jobTitle: string;
    feedback?: string;
};

type ResumeCardProps = {
    resume: Resume;
};

const ResumeCard = ({ resume }: ResumeCardProps) => {
    return (
        <Link
            to={`/resume/${resume.id}`}
            className="resume-card animate-in fade-in duration-200"
        >
            <div className="flex flex-col gap-2">
                <h2 className="text-black font-bold break-words">
                    {resume.companyName}
                </h2>

                <h3 className="text-lg break-words text-gray-500">
                    {resume.jobTitle}
                </h3>
            </div>

            <div className="flex-shrink-0">

            </div>
        </Link>
    );
};

export default ResumeCard;