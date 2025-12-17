"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const diagnostics = [
  {
    title: "DEEP 54",
    description: "価値観まで測る徹底54問",
    subtext: "感情・意思決定・生活リズムまで6軸で深掘り",
    href: "/diagnoses/compatibility-54",
    duration: "約7-8分",
    gradient: "from-[#ff006e] via-[#ff006e] to-[#8338ec]",
    glow: "shadow-[0_0_60px_rgba(255,0,110,0.5)]",
  },
  {
    title: "QUICK 18",
    description: "3分で使えるクイック診断",
    subtext: "飲み会やちょっとした待ち時間で使える",
    href: "/diagnoses/compatibility-18",
    duration: "約3分",
    gradient: "from-[#00f5ff] via-[#00d4ff] to-[#8338ec]",
    glow: "shadow-[0_0_60px_rgba(0,245,255,0.5)]",
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* 背景エフェクト - 音楽フェス風 */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000] via-[#1a0033] to-[#000033]" />
        <div className="absolute top-0 left-1/4 h-[600px] w-[600px] rounded-full bg-[#ff006e] opacity-20 blur-[200px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 h-[500px] w-[500px] rounded-full bg-[#00f5ff] opacity-20 blur-[200px] animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#8338ec] opacity-15 blur-[180px] animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      <div className="relative z-10 px-4 py-12 sm:px-6 lg:px-8">
        {/* メインビジュアル - K-POPアルバム風 */}
        <motion.section
          className="text-center mb-16 sm:mb-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-block mb-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-7xl sm:text-8xl lg:text-9xl font-black tracking-tight mb-4">
              <span className="bg-gradient-to-r from-[#ff006e] via-[#00f5ff] to-[#8338ec] bg-clip-text text-transparent animate-pulse">
                PAIRLY
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#8338ec] via-[#ff006e] to-[#00f5ff] bg-clip-text text-transparent">
                LAB
              </span>
            </h1>
          </motion.div>
          
          <motion.p
            className="text-xl sm:text-2xl font-bold text-white mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            2人のリズム、<br className="sm:hidden" />
            <span className="bg-gradient-to-r from-[#ff006e] to-[#00f5ff] bg-clip-text text-transparent">
              響き合う瞬間を。
            </span>
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-4 mb-12"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Link
              href="/diagnoses/compatibility-54"
              className="group relative px-8 py-4 text-lg font-black rounded-full bg-gradient-to-r from-[#ff006e] to-[#8338ec] text-white shadow-[0_0_40px_rgba(255,0,110,0.6)] hover:shadow-[0_0_60px_rgba(255,0,110,0.8)] transition-all transform hover:scale-105"
            >
              <span className="relative z-10">54問でじっくり</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#ff006e] to-[#8338ec] opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
            </Link>
            <Link
              href="/diagnoses/compatibility-18"
              className="group relative px-8 py-4 text-lg font-black rounded-full bg-gradient-to-r from-[#00f5ff] to-[#8338ec] text-black shadow-[0_0_40px_rgba(0,245,255,0.6)] hover:shadow-[0_0_60px_rgba(0,245,255,0.8)] transition-all transform hover:scale-105"
            >
              <span className="relative z-10">3分で試す</span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#00f5ff] to-[#8338ec] opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
            </Link>
          </motion.div>

          {/* 統計 - TikTok診断風 */}
          <motion.div
            className="grid grid-cols-3 gap-4 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {[
              { label: "質問", value: "18/54" },
              { label: "タイプ", value: "27" },
              { label: "相性", value: "729" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="rounded-3xl border-2 border-white/20 bg-gradient-to-br from-white/10 to-white/5 p-4 backdrop-blur-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9 + i * 0.1 }}
              >
                <div className="text-2xl font-black text-white mb-1">{stat.value}</div>
                <div className="text-xs font-bold uppercase tracking-wider text-white/70">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* 診断モード - Z世代占いアプリ風 */}
        <section className="space-y-8 mb-16">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-sm font-black uppercase tracking-[0.3em] text-white/50 mb-2">選べる診断</p>
            <h2 className="text-4xl sm:text-5xl font-black text-white">
              モードを
              <span className="bg-gradient-to-r from-[#ff006e] to-[#00f5ff] bg-clip-text text-transparent">選ぶ</span>
            </h2>
          </motion.div>

          <div className="grid gap-6 lg:grid-cols-2">
            {diagnostics.map((mode, index) => (
              <motion.div
                key={mode.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
              >
                <Link href={mode.href}>
                  <div className={`relative rounded-[40px] border-4 border-white/30 bg-gradient-to-br ${mode.gradient} p-8 text-white ${mode.glow} transform hover:scale-[1.02] transition-all cursor-pointer`}>
                    <div className="relative z-10">
                      <div className="text-xs font-black uppercase tracking-[0.4em] mb-3 opacity-80">{mode.duration}</div>
                      <h3 className="text-4xl font-black mb-3">{mode.title}</h3>
                      <p className="text-xl font-bold mb-2">{mode.description}</p>
                      <p className="text-sm opacity-90">{mode.subtext}</p>
                      <div className="mt-6 inline-flex items-center gap-2 text-sm font-black uppercase tracking-wider">
                        診断する →
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* 使い方 - 音楽フェスフライヤー風 */}
        <motion.section
          className="rounded-[40px] border-4 border-white/20 bg-gradient-to-br from-[#8338ec]/30 to-[#ff006e]/30 p-8 sm:p-12 backdrop-blur-2xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <p className="text-sm font-black uppercase tracking-[0.4em] text-white/60 mb-3">使い方</p>
            <h3 className="text-3xl sm:text-4xl font-black text-white">かんたん3ステップ</h3>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { num: "01", title: "診断を選ぶ", desc: "気分に合わせて3分 or 7分" },
              { num: "02", title: "質問に答える", desc: "シンプルな選択肢だけ" },
              { num: "03", title: "結果を共有", desc: "カードでスクショして拡散" },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                className="text-center"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
              >
                <div className="text-5xl font-black text-white/30 mb-2">{step.num}</div>
                <h4 className="text-xl font-black text-white mb-2">{step.title}</h4>
                <p className="text-sm text-white/70">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTA - TikTok診断風 */}
        <motion.section
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="rounded-[40px] border-4 border-white/30 bg-gradient-to-r from-[#ff006e] via-[#8338ec] to-[#00f5ff] p-12 shadow-[0_0_80px_rgba(255,0,110,0.4)]">
            <h3 className="text-4xl sm:text-5xl font-black text-white mb-4">
              今日の2人の温度を<br />
              診断してみる
            </h3>
            <p className="text-lg text-white/90 mb-8">
              気分が上がる前にサッと診断したい日も、<br />
              じっくり語り合いたい日もOK。
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/diagnoses/compatibility-54"
                className="px-10 py-5 text-xl font-black rounded-full bg-white text-black shadow-[0_10px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_50px_rgba(0,0,0,0.4)] transform hover:scale-105 transition-all"
              >
                徹底診断を始める
              </Link>
              <Link
                href="/diagnoses/compatibility-18"
                className="px-10 py-5 text-xl font-black rounded-full border-4 border-white text-white hover:bg-white hover:text-black transform hover:scale-105 transition-all"
              >
                クイック診断
              </Link>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
