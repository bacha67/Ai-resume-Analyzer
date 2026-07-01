import { Link } from "react-router";
import ScoreCircle from "~/components/ScoreCircle";
import { useEffect, useState } from "react";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({ resume: { id, companyName, jobTitle, feedback, imagePath } }: { resume: Resume }) => {
    const { fs } = usePuterStore();
    const [resumeUrl, setResumeUrl] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadResume = async () => {
            setLoading(true);

            if (!imagePath) {
                setLoading(false);
                return;
            }

            // If it's already a blob/http URL, set it directly
            if (imagePath.startsWith("blob:") || imagePath.startsWith("http:") || imagePath.startsWith("https:")) {
                setResumeUrl(imagePath);
                setLoading(false);
                return;
            }

            try {
                const blob = await fs.read(imagePath);
                if (blob) {
                    const url = URL.createObjectURL(blob);
                    setResumeUrl(url);
                }
            } catch (err) {
                console.error("Failed to load resume card image:", imagePath, err);
            } finally {
                setLoading(false);
            }
        }

        loadResume();
    }, [imagePath, fs]);

    return (
        <Link to={`/resume/${id}`} className="resume-card animate-in fade-in duration-1000">
            <div className="resume-card-header">
                <div className="flex flex-col gap-2">
                    {companyName && <h2 className="!text-black font-bold break-words">{companyName}</h2>}
                    {jobTitle && <h3 className="text-lg break-words text-gray-500">{jobTitle}</h3>}
                    {!companyName && !jobTitle && <h2 className="!text-black font-bold">Resume</h2>}
                </div>
                <div className="flex-shrink-0">
                    <ScoreCircle score={feedback.overallScore} />
                </div>
            </div>

            <div className="gradient-border animate-in fade-in duration-1000">
                <div className="w-full h-full">
                    {loading ? (
                        // Skeleton loader
                        <div className="w-full h-[350px] max-sm:h-[200px] rounded-lg bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse flex items-center justify-center">
                            <svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                        </div>
                    ) : resumeUrl ? (
                        // Real resume image from Puter
                        <img
                            src={resumeUrl}
                            alt="resume preview"
                            className="w-full h-[350px] max-sm:h-[200px] object-cover object-top rounded-lg"
                        />
                    ) : (
                        // No image available fallback
                        <div className="w-full h-[350px] max-sm:h-[200px] rounded-lg bg-gradient-to-br from-indigo-50 to-purple-50 flex flex-col items-center justify-center gap-2">
                            <svg className="w-10 h-10 text-indigo-300" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                                    d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                            </svg>
                            <p className="text-xs text-gray-400 font-medium">Preview not available</p>
                        </div>
                    )}
                </div>
            </div>
        </Link>
    );
}
export default ResumeCard;