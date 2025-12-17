import { memo } from "react";
import type { Question, Score } from "@/lib/types";

interface QuestionCardProps {
  question: Question;
  index: number;
  currentAnswer: Score | null;
  isAnswered: boolean;
  onAnswer: (questionId: number, score: Score) => void;
  step: "user" | "partner";
}

export const QuestionCard = memo(function QuestionCard({
  question,
  index,
  currentAnswer,
  isAnswered,
  onAnswer,
  step,
}: QuestionCardProps) {
  return (
    <div
      key={`${step}-${question.id}`}
      className={`rounded-2xl border-2 p-4 text-white ${
        isAnswered 
          ? "border-white/30 bg-[#ff006e]/20" 
          : "border-white/10 bg-white/5"
      }`}
    >
      <div className="mb-3 flex items-start justify-between gap-2">
        <h2 className="text-xl font-black sm:text-2xl leading-tight">
          {question.text}
        </h2>
        <span className="ml-2 flex-shrink-0 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-black text-white">
          Q{index + 1}
        </span>
      </div>

      <div className="space-y-2">
        {question.options.map((option, optionIndex) => {
          const isSelected = currentAnswer === option.score;

          return (
            <button
              key={optionIndex}
              onClick={() => onAnswer(question.id, option.score)}
              className={`w-full rounded-xl border-2 px-4 py-3 text-left text-sm font-black ${
                isSelected
                  ? "border-white/40 bg-[#ff006e]/30 text-white"
                  : "border-white/10 bg-white/5 text-white hover:border-white/20 hover:bg-white/10"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
});

