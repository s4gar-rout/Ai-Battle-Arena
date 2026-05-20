import { Gavel, Award, Scale } from "lucide-react";

const JudgeSynthesis = ({
  status, // 'idle' | 'generating' | 'completed' | 'error'
  judgeData, // { solution_1_score, solution_2_score, solution_1_reason, solution_2_reason }
  model1Name,
  model2Name
}) => {
  if (status === "idle") return null;

  if (status === "generating") {
    return (
      <div className="max-w-4xl mx-auto px-8 mb-20 animate-pulse">
        <div className="warm-glass rounded-[2.5rem] p-10 overflow-hidden relative">
          <div className="flex flex-col md:flex-row gap-10 items-center">
            <div className="flex-shrink-0 relative">
              <div className="w-32 h-32 rounded-full border-2 border-dashed border-[#f59e0b]/20 flex items-center justify-center p-2">
                <div className="w-full h-full rounded-full bg-[#f59e0b]/5 flex items-center justify-center text-[#f59e0b]/40">
                  <Gavel className="w-10 h-10 animate-bounce" />
                </div>
              </div>
            </div>
            <div className="flex-1 space-y-4 w-full">
              <div className="h-4 w-28 bg-white/5 rounded-full skeleton-warm"></div>
              <div className="h-7 w-3/5 bg-white/5 rounded-full skeleton-warm"></div>
              <div className="space-y-2 pt-2">
                <div className="h-3.5 w-full bg-white/5 rounded-full skeleton-warm"></div>
                <div className="h-3.5 w-5/6 bg-white/5 rounded-full skeleton-warm"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (status === "error" || !judgeData) return null;

  const score1 = judgeData.solution_1_score || 0;
  const score2 = judgeData.solution_2_score || 0;

  // Calculate winner text
  let winnerTitle = "Balanced Dialogue";
  let winnerSub = "Both architectures demonstrated equivalent reasoning depth.";

  if (score1 > score2) {
    winnerTitle = `Resonance Found in ${model1Name}`;
    winnerSub = judgeData.solution_1_reason || "Demonstrated superior structure and depth.";
  } else if (score2 > score1) {
    winnerTitle = `Resonance Found in ${model2Name}`;
    winnerSub = judgeData.solution_2_reason || "Achieved greater clarity and contextual balance.";
  } else {
    // Tie
    winnerSub = "Both models achieved equal scoring. The judge synthesis suggests a hybrid framework.";
  }

  // Convert scores out of 10 to percentages (e.g. 8 -> 80%)
  const percentage1 = Math.min(Math.max(score1 * 10, 0), 100);
  const percentage2 = Math.min(Math.max(score2 * 10, 0), 100);

  return (
    <div className="max-w-4xl mx-auto px-8 mb-20 transition-all duration-500 animate-fade-in-up">
      <div className="warm-glass rounded-[2.5rem] p-10 overflow-hidden relative border-[#f59e0b]/10 bg-gradient-to-br from-[#f59e0b]/2 to-transparent">
        {/* Ambient background blur inside the card */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-64 h-64 bg-[#f59e0b]/3 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row gap-10 items-center relative z-10">
          {/* Gavel / Award Circle */}
          <div className="flex-shrink-0 relative">
            <div className="w-32 h-32 rounded-full border-2 border-dashed border-[#f59e0b]/40 flex items-center justify-center p-2 bg-[#12100e]/80">
              <div className="w-full h-full rounded-full bg-[#f59e0b]/10 flex items-center justify-center text-[#f59e0b] shadow-inner">
                {score1 === score2 ? (
                  <Scale className="w-10 h-10 animate-soft-float text-amber-500" />
                ) : (
                  <Award className="w-10 h-10 animate-soft-float text-[#f59e0b]" />
                )}
              </div>
            </div>
          </div>

          {/* Verdict Content */}
          <div className="flex-1 w-full">
            <div className="flex items-center gap-2 mb-3">
              <span className="px-3 py-1 rounded-full bg-[#f59e0b]/10 border border-[#f59e0b]/15 text-[#f59e0b] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                <Gavel className="w-3 h-3" />
                Gemini's Synthesis
              </span>
            </div>
            <h4 className="serif-title text-3xl text-[#fdf6e3] mb-4 leading-tight">
              {winnerTitle}
            </h4>
            <p className="text-[#8d7d6b] text-sm leading-relaxed mb-6 italic select-text">
              "{winnerSub}"
            </p>

            {/* Score Scales */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-white/5">
              <div className="space-y-2">
                <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-[#6b5c4d]">
                  <span>{model1Name} Score</span>
                  <span className="font-mono text-[#d6c5ae]">{score1} / 10</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#f59e0b] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${percentage1}%` }}
                  ></div>
                </div>
                {score1 !== score2 && score1 < score2 && (
                  <p className="text-[10px] text-[#6b5c4d] leading-normal mt-1 truncate" title={judgeData.solution_1_reason}>
                    {judgeData.solution_1_reason}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-[10px] uppercase font-bold tracking-widest text-[#6b5c4d]">
                  <span>{model2Name} Score</span>
                  <span className="font-mono text-[#d6c5ae]">{score2} / 10</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#8d7d6b] rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${percentage2}%` }}
                  ></div>
                </div>
                {score1 !== score2 && score2 < score1 && (
                  <p className="text-[10px] text-[#6b5c4d] leading-normal mt-1 truncate" title={judgeData.solution_2_reason}>
                    {judgeData.solution_2_reason}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JudgeSynthesis;
