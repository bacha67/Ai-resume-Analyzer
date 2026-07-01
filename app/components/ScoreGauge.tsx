type ScoreGaugeProps = {
    score: number;
    label?: string;
};

const ScoreGauge = ({ score, label }: ScoreGaugeProps) => {
    return (
        <div className="w-full flex flex-col gap-2">
            <div className="flex justify-between items-center">
                {label && <span className="text-sm font-semibold text-gray-700">{label}</span>}
                <span className="text-sm font-bold text-gray-900">{score}/100</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
                <div
                    className="h-3 rounded-full bg-gradient-to-r from-[#FF97AD] to-[#5171FF] transition-all duration-1000"
                    style={{ width: `${score}%` }}
                />
            </div>
        </div>
    );
};

export default ScoreGauge;
