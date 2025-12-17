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
      className={`rounded-xl border p-3 text-white ${
        isAnswered 
          ? "border-white/25 bg-[#ff006e]/15" 
          : "border-white/8 bg-white/3"
      }`}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <h2 className="text-base font-black leading-snug flex-1">
          {question.text}
        </h2>
        <span className="ml-1 flex-shrink-0 rounded border border-white/15 bg-white/8 px-2 py-0.5 text-[10px] font-black text-white">
          {index + 1}
        </span>
      </div>

      <div className="space-y-1.5">
        {question.options.map((option, optionIndex) => {
          const isSelected = currentAnswer === option.score;

          return (
            <button
              key={optionIndex}
              onClick={() => onAnswer(question.id, option.score)}
              className={`w-full rounded-lg border px-3 py-2 text-left text-xs font-black ${
                isSelected
                  ? "border-white/35 bg-[#ff006e]/25 text-white"
                  : "border-white/8 bg-white/3 text-white hover:border-white/15 hover:bg-white/8"
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

