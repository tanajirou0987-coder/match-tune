"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";

export default function Compatibility54StartPage() {
  const router = useRouter();

  return (
    <div className="relative min-h-screen px-4 py-12 sm:px-6 lg:px-8">
      {/* 背景エフェクト */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#1a0033] to-[#000033]" />
        <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-[#ff006e] opacity-20 blur-[200px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-[#8338ec] opacity-20 blur-[200px] animate-pulse" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative mx-auto w-full max-w-4xl">
        <motion.main
          className="rounded-[40px] border-4 border-white/30 bg-gradient-to-br from-[#ff006e]/20 via-[#8338ec]/20 to-[#00f5ff]/20 p-8 sm:p-12 backdrop-blur-2xl shadow-[0_0_80px_rgba(255,0,110,0.4)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <motion.div
              className="inline-block mb-4"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <span className="text-6xl">🔥</span>
            </motion.div>
            <h1 className="text-5xl sm:text-6xl font-black mb-4">
              <span className="bg-gradient-to-r from-[#ff006e] to-[#8338ec] bg-clip-text text-transparent">
                DEEP 54
              </span>
            </h1>
            <p className="text-xl font-black text-white mb-2">徹底相性診断</p>
            <p className="text-white/80 max-w-2xl mx-auto">
              54問で価値観から生活リズムまで照射。<br />
              ひとつずつ丁寧に進められるので、相手と共有する前に自分の感覚も整理できます。
            </p>
          </div>

          <div className="grid gap-6 mb-10 sm:grid-cols-3">
            {[
              { label: "質問数", value: "54問", emoji: "💬" },
              { label: "所要時間", value: "約7-8分", emoji: "⏱️" },
              { label: "相性軸", value: "6軸", emoji: "📊" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className="rounded-[30px] border-4 border-white/30 bg-white/10 p-6 text-center backdrop-blur-xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + i * 0.1 }}
              >
                <div className="text-4xl mb-2">{item.emoji}</div>
                <div className="text-2xl font-black text-white mb-1">{item.value}</div>
                <div className="text-xs font-black uppercase tracking-wider text-white/70">{item.label}</div>
              </motion.div>
            ))}
          </div>

          <div className="space-y-4 mb-10">
            <h2 className="text-2xl font-black text-white mb-4">診断内容</h2>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { title: "コミュニケーション", desc: "18問 / 話し方・聞き方のクセ", emoji: "💭" },
                { title: "意思決定", desc: "18問 / ロジックと感情のバランス", emoji: "⚖️" },
                { title: "関係性", desc: "18問 / リード＆サポートの傾向", emoji: "🤝" },
              ].map((item, i) => (
                <motion.div
                  key={item.title}
                  className="rounded-[30px] border-4 border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-6 backdrop-blur-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                >
                  <div className="text-3xl mb-3">{item.emoji}</div>
                  <h3 className="text-lg font-black text-white mb-2">{item.title}</h3>
                  <p className="text-sm text-white/70">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <motion.button
              onClick={() => router.push("/diagnoses/compatibility-54/questions")}
              className="w-full rounded-[40px] border-4 border-white bg-gradient-to-r from-[#ff006e] to-[#8338ec] px-8 py-6 text-2xl font-black text-white shadow-[0_0_60px_rgba(255,0,110,0.6)] transition-all transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              徹底診断を始める 🔥
            </motion.button>
            
            <div className="relative">
              <div className="absolute -top-3 left-6 z-10 rounded-full border-2 border-white bg-gradient-to-r from-[#00f5ff] to-[#8338ec] px-4 py-1 text-sm font-black text-white shadow-[0_0_30px_rgba(0,245,255,0.5)]">
                おすすめ
              </div>
              <motion.button
                onClick={() => router.push("/diagnoses/compatibility-54/multi")}
                className="w-full rounded-[40px] border-4 border-white/30 bg-gradient-to-r from-[#00f5ff] to-[#8338ec] px-8 py-6 text-xl font-black text-white shadow-[0_0_60px_rgba(0,245,255,0.4)] transition-all transform hover:scale-105"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ふたりで同時接続 💕
              </motion.button>
            </div>

            <motion.button
              onClick={() => router.push("/")}
              className="w-full rounded-[40px] border-4 border-white/20 bg-white/5 px-8 py-4 text-lg font-black text-white hover:bg-white/10 transition-all"
            >
              ホームに戻る
            </motion.button>
          </div>
        </motion.main>
      </div>
    </div>
  );
}
