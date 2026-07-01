import ScoreGauge from "~/components/ScoreGauge";
import ScoreBadge from "~/components/ScoreBadge";

const Category = ({ title, score }: { title: string, score: number }) => {
    const textColor = score > 70 ? 'text-green-600'
        : score > 49
            ? 'text-yellow-600' : 'text-red-600';

    return (
        <div className="flex flex-row justify-between items-center w-full py-4 border-b border-gray-100 last:border-b-0">
            <div className="flex flex-row gap-3 items-center">
                <p className="text-lg font-semibold text-gray-800">{title}</p>
                <ScoreBadge score={score} />
            </div>
            <p className="text-lg font-bold text-gray-400">
                <span className={textColor}>{score}</span>/100
            </p>
        </div>
    )
}

const Summary = ({ feedback }: { feedback: Feedback }) => {
    return (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 w-full p-6 flex flex-col gap-6">
            <div className="flex flex-row items-center gap-8 w-full border-b border-gray-100 pb-6 max-sm:flex-col max-sm:text-center max-sm:gap-4">
                <div className="flex-shrink-0">
                    <ScoreGauge score={feedback.overallScore} />
                </div>

                <div className="flex flex-col gap-2 text-left max-sm:text-center">
                    <h2 className="text-2xl font-bold text-black">Your Resume Score</h2>
                    <p className="text-sm text-gray-500">
                        This score is calculated based on the variables listed below.
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-4 w-full">
                <Category title="Tone & Style" score={feedback.toneAndStyle.score} />
                <Category title="Content" score={feedback.content.score} />
                <Category title="Structure" score={feedback.structure.score} />
                <Category title="Skills" score={feedback.skills.score} />
            </div>
        </div>
    )
}
export default Summary