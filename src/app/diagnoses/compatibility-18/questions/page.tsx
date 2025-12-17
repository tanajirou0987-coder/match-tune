"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import questionsData from "../../../../../data/diagnoses/compatibility-18/questions.json";
import type { Question, Answer, Score } from "@/lib/types";
import { calculateScores, getPersonalityType } from "@/lib/calculate";

const TOTAL_QUESTIONS = 18;
type Step = "user" | "partner";

export default function Compatibility18QuestionsPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>("user");
  const [userAnswers, setUserAnswers] = useState<Answer[]>([]);
  const [partnerAnswers, setPartnerAnswers] = useState<Answer[]>([]);
  const [questions] = useState<Question[]>(questionsData as Question[]);

  const currentAnswers = step === "user" ? userAnswers : partnerAnswers;
  const answeredCount = currentAnswers.length;
  const progress = (answeredCount / TOTAL_QUESTIONS) * 100;

  const handleAnswer = (questionId: number, score: Score) => {
    const existingAnswerIndex = currentAnswers.findIndex(
      (a) => a.questionId === questionId
    );

    const newAnswer: Answer = {
      questionId,
      score,
    };

    const newAnswers =
      existingAnswerIndex >= 0
        ? currentAnswers.map((a, i) => (i === existingAnswerIndex ? newAnswer : a))
        : [...currentAnswers, newAnswer];

    if (step === "user") {
      setUserAnswers(newAnswers);
    } else {
      setPartnerAnswers(newAnswers);
    }
  };
  
  const handleComplete = () => {
    if (answeredCount === TOTAL_QUESTIONS) {
      if (step === "user") {
        setStep("partner");
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else {
        calculateResult(userAnswers, partnerAnswers);
      }
    }
  };

  const calculateResult = (userFinalAnswers: Answer[], partnerFinalAnswers: Answer[]) => {
    try {
      const userScores = calculateScores(userFinalAnswers, 18);
      const userType = getPersonalityType(
        userScores.axis1,
        userScores.axis2,
        userScores.axis3,
        "18"
      );

      const partnerScores = calculateScores(partnerFinalAnswers, 18);
      const partnerType = getPersonalityType(
        partnerScores.axis1,
        partnerScores.axis2,
        partnerScores.axis3,
        "18"
      );

      const params = new URLSearchParams({
        type: userType.type,
        score1: userScores.axis1.toString(),
        score2: userScores.axis2.toString(),
        score3: userScores.axis3.toString(),
        partnerType: partnerType.type,
        partnerScore1: partnerScores.axis1.toString(),
        partnerScore2: partnerScores.axis2.toString(),
        partnerScore3: partnerScores.axis3.toString(),
        diagnosis: "compatibility-18",
      });

      router.push(`/diagnoses/compatibility-18/result?${params.toString()}`);
    } catch (error) {
      console.error("Error calculating result:", error);
      router.push("/diagnoses/compatibility-18");
    }
  };

  const getAnswerForQuestion = (questionId: number): Score | null => {
    const answer = currentAnswers.find((a) => a.questionId === questionId);
    return answer ? answer.score : null;
  };

  return (
    <div className="relative min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      {/* 背景エフェクト - 音楽フェス風 */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#1a0033] to-[#000033]" />
        <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-[#00f5ff] opacity-20 blur-[200px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-[#8338ec] opacity-20 blur-[200px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative mx-auto w-full max-w-3xl space-y-10">
        <motion.div
          className="text-center"
          key={step}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="inline-flex items-center gap-3 rounded-full border-4 border-white/30 bg-gradient-to-r from-[#00f5ff]/30 to-[#8338ec]/30 px-6 py-3 text-white backdrop-blur-xl shadow-[0_0_40px_rgba(0,245,255,0.3)]">
            <span className="text-lg font-black">{step === "user" ? "自分の回答" : "パートナーの回答"}</span>
            <span className="text-sm font-black bg-white/20 px-3 py-1 rounded-full">{step === "user" ? "ステップ 1/2" : "ステップ 2/2"}</span>
          </div>
        </motion.div>

        <motion.div
          className="sticky top-0 z-20 -mx-4 border-b-4 border-white/30 bg-gradient-to-r from-[#00f5ff]/40 to-[#8338ec]/40 px-4 py-6 backdrop-blur-2xl shadow-[0_10px_60px_rgba(0,245,255,0.3)]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="mb-3 flex items-center justify-between text-lg text-white">
            <span className="font-black">
              回答済み {answeredCount} / {TOTAL_QUESTIONS}
            </span>
            <span className="font-black text-2xl bg-gradient-to-r from-[#00f5ff] to-[#ff006e] bg-clip-text text-transparent">{Math.round(progress)}%</span>
          </div>
          <div className="h-4 w-full overflow-hidden rounded-full border-2 border-white/30 bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-[#00f5ff] via-[#8338ec] to-[#ff006e] shadow-[0_0_20px_rgba(0,245,255,0.6)]"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        <div className={`space-y-6 ${answeredCount === TOTAL_QUESTIONS ? "pb-32" : "pb-10"}`}>
          {questions.map((question, index) => {
            const currentAnswer = getAnswerForQuestion(question.id);
            const isAnswered = currentAnswer !== null;

            return (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`rounded-[40px] border-4 p-6 text-white shadow-[0_0_60px_rgba(0,0,0,0.3)] transition-all duration-200 ${
                  isAnswered 
                    ? "border-white/40 bg-gradient-to-br from-[#00f5ff]/30 to-[#8338ec]/30 backdrop-blur-xl shadow-[0_0_60px_rgba(0,245,255,0.4)]" 
                    : "border-white/20 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl"
                }`}
              >
                <div className="mb-4 flex items-start justify-between gap-3">
                  <h2 className="text-2xl font-black sm:text-3xl leading-tight">
                    {question.text}
                  </h2>
                  <span className="ml-4 flex-shrink-0 rounded-full border-2 border-white/30 bg-gradient-to-r from-[#00f5ff] to-[#8338ec] px-4 py-2 text-xs font-black text-white">
                    Q{index + 1}
                  </span>
                </div>

                <div className="space-y-3">
                  {question.options.map((option, optionIndex) => {
                    const isSelected = currentAnswer === option.score;

                    return (
                      <motion.button
                        key={optionIndex}
                        onClick={() => handleAnswer(question.id, option.score)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: index * 0.05 + optionIndex * 0.05,
                          duration: 0.2,
                        }}
                        className={`w-full rounded-[30px] border-4 px-6 py-4 text-left text-base font-black transition-all duration-200 ${
                          isSelected
                            ? "border-white/50 bg-gradient-to-r from-[#00f5ff] to-[#8338ec] text-white shadow-[0_0_40px_rgba(0,245,255,0.6)]"
                            : "border-white/20 bg-white/5 text-white hover:border-white/40 hover:bg-white/10"
                        }`}
                      >
                        {option.label}
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm font-black uppercase tracking-wider text-white/60">
            クイック診断（18問・約3分）
          </p>
        </motion.div>

        <AnimatePresence>
          {answeredCount === TOTAL_QUESTIONS && (
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed bottom-0 left-0 right-0 z-50 border-t-4 border-white/30 bg-gradient-to-r from-[#00f5ff]/40 to-[#8338ec]/40 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,245,255,0.4)]"
            >
              <div className="mx-auto max-w-3xl px-4 py-6">
                <div className="flex items-center justify-between gap-4 text-white">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <div>
                        <p className="text-lg font-black">
                          {step === "user"
                            ? "自分の回答が完了しました！"
                            : "すべての質問に回答しました！"}
                        </p>
                        <p className="text-sm text-white/80">
                          {step === "user" ? "次はパートナーの回答です" : "結果を確認しましょう"}
                        </p>
                      </div>
                    </div>
                  </div>
                  <motion.button
                    onClick={handleComplete}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-full border-4 border-white bg-white px-8 py-4 text-base font-black text-black shadow-[0_0_40px_rgba(255,255,255,0.4)] transition-all"
                  >
                    {step === "user" ? "次へ進む →" : "結果を見る"}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
