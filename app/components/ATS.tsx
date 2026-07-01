type ATSProps = {
    score: number;
    suggestions: {
        type: "good" | "improve";
        tip: string;
    }[];
};

const ATS = ({ score, suggestions }: ATSProps) => {
    return (
        <div className="flex flex-col gap-4 bg-gray-50 p-6 rounded-2xl border border-gray-100 text-left">
            <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <h3 className="text-xl font-bold text-black">ATS Suitability Score</h3>
                <span className="text-2xl font-black text-blue-600">{score}%</span>
            </div>
            
            <div className="flex flex-col gap-3 mt-2">
                {suggestions.map((item, index) => (
                    <div key={index} className="flex gap-3 items-start">
                        <img 
                            src={item.type === "good" ? "/icons/check.svg" : "/icons/warning.svg"} 
                            alt={item.type} 
                            className="w-5 h-5 mt-0.5 flex-shrink-0"
                        />
                        <p className="text-sm text-gray-700">{item.tip}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ATS;
