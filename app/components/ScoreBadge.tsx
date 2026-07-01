type ScoreBadgeProps = {
    score: number;
};

const ScoreBadge = ({ score }: ScoreBadgeProps) => {
    let bgColorClass = "bg-[#f9e3e2] text-[#752522]"; // red
    let label = "Poor";

    if (score >= 80) {
        bgColorClass = "bg-[#d5faf1] text-[#254d4a]"; // green
        label = "Excellent";
    } else if (score >= 50) {
        bgColorClass = "bg-[#fceed8] text-[#73321b]"; // yellow
        label = "Average";
    }

    return (
        <span className={`score-badge ${bgColorClass} font-semibold text-xs py-1 px-3`}>
            {label} ({score})
        </span>
    );
};

export default ScoreBadge;
