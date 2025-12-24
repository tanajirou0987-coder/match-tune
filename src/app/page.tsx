"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// ヘッダー背景画像
const headerBackgroundImage = "/画像が生成されました.png";

const diagnostics = [
  {
    title: "DEEP 54",
    description: "価値観まで測る徹底54問",
    subtext: "感情・意思決定・生活リズムまで6軸で深掘り",
    href: "/diagnoses/compatibility-54",
    duration: "約7-8分",
    bgColor: "#FFB6C1", // ライトピンク
  },
  {
    title: "QUICK 18",
    description: "3分で使えるクイック診断",
    subtext: "飲み会やちょっとした待ち時間で使える",
    href: "/diagnoses/compatibility-18",
    duration: "約3分",
    bgColor: "#87CEEB", // スカイブルー
  },
];

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-blue-50 via-purple-50 to-purple-100">
      {/* スマホ用レイアウト */}
      <div className="relative z-10 max-w-md mx-auto min-h-screen md:hidden py-8 px-4">
        {/* ヘッダーセクション - Figmaデザインの背景画像とスタイル */}
        <motion.section
          className="relative h-[299px] rounded-t-[28px] overflow-hidden mx-3 mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-t-[28px]">
            <img alt="" className="absolute inset-0 w-full h-full object-cover" src={headerBackgroundImage} />
          </div>
          {/* 引用文 - Figmaデザインのフォントとスタイル */}
          <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-['Inter:Extra_Bold_Italic',sans-serif] font-extrabold italic text-[16px] text-center text-white text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] max-w-[280px] leading-[1.5]">
            2人のリズム、<br />
            響き合う瞬間を。
          </p>
        </motion.section>

        {/* メインコンテナ - Soft UIデザインスタイル */}
        <div className="relative mb-20">
          {/* メインコンテンツエリア - Soft UIカード */}
          <div className="relative bg-white/80 backdrop-blur-xl rounded-[40px] shadow-[0px_20px_60px_rgba(0,0,0,0.08),0px_8px_24px_rgba(0,0,0,0.04)] px-6 py-8 min-h-[665px] border border-white/50">
            {/* ロゴ/タイトル - Figmaデザインのフォントスタイルに合わせて調整 */}
            <motion.div
              className="text-center mb-8 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-6xl sm:text-7xl font-['Coming_Soon:Regular',sans-serif] font-normal tracking-tight mb-4 text-black">
                PAIRLY LAB
              </h1>
            </motion.div>

            {/* クイックアクションボタン - Figmaデザインのスタイルに合わせて調整 */}
            <motion.div
              className="flex flex-wrap justify-center gap-4 mb-12 px-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/diagnoses/compatibility-54"
                className="group relative px-8 py-4 text-lg font-['Coming_Soon:Regular',sans-serif] font-normal rounded-[24px] bg-gradient-to-br from-pink-200/80 to-pink-300/80 backdrop-blur-sm text-black shadow-[0px_8px_24px_rgba(255,182,193,0.3),0px_4px_12px_rgba(255,182,193,0.2)] hover:shadow-[0px_12px_32px_rgba(255,182,193,0.4),0px_6px_16px_rgba(255,182,193,0.3)] transition-all transform hover:scale-[1.02] border border-white/50"
              >
                <span className="relative z-10">54問でじっくり</span>
              </Link>
              <Link
                href="/diagnoses/compatibility-18"
                className="group relative px-8 py-4 text-lg font-['Coming_Soon:Regular',sans-serif] font-normal rounded-[24px] bg-gradient-to-br from-sky-200/80 to-sky-300/80 backdrop-blur-sm text-black shadow-[0px_8px_24px_rgba(135,206,235,0.3),0px_4px_12px_rgba(135,206,235,0.2)] hover:shadow-[0px_12px_32px_rgba(135,206,235,0.4),0px_6px_16px_rgba(135,206,235,0.3)] transition-all transform hover:scale-[1.02] border border-white/50"
              >
                <span className="relative z-10">3分で試す</span>
              </Link>
            </motion.div>

            {/* 統計セクション - Figmaデザインのスタイルに合わせて調整 */}
            <motion.div
              className="grid grid-cols-3 gap-4 mb-12 px-[22px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { label: "質問", value: "18/54" },
                { label: "タイプ", value: "27" },
                { label: "相性", value: "729" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="rounded-[24px] bg-white/70 backdrop-blur-sm p-4 shadow-[0px_8px_24px_rgba(0,0,0,0.06),0px_4px_12px_rgba(0,0,0,0.04)] border border-white/50"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  <div className="text-xl font-['Coming_Soon:Regular',sans-serif] font-normal text-black mb-1 text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">{stat.value}</div>
                  <div className="text-xs font-['Coming_Soon:Regular',sans-serif] font-normal text-black text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* 診断モードカード - Figmaデザインの色合いとスタイルを適用 */}
            <div className="space-y-4 px-[22px] mb-8">
              <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <p className="text-sm font-['Coming_Soon:Regular',sans-serif] font-normal uppercase tracking-[0.3em] text-black mb-2">選べる診断</p>
                <h2 className="text-3xl sm:text-4xl font-['Coming_Soon:Regular',sans-serif] font-normal text-black">
                  モードを選ぶ
                </h2>
              </motion.div>

              {diagnostics.map((mode, index) => (
                <motion.div
                  key={mode.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Link href={mode.href}>
                    <div
                      className="relative rounded-[28px] shadow-[0px_12px_32px_rgba(0,0,0,0.08),0px_6px_16px_rgba(0,0,0,0.04)] h-[115px] flex items-center justify-center cursor-pointer transform hover:scale-[1.02] transition-all backdrop-blur-sm border border-white/50"
                      style={{ 
                        background: mode.bgColor === "#FFB6C1" 
                          ? "linear-gradient(135deg, rgba(255,182,193,0.8) 0%, rgba(255,182,193,0.6) 100%)"
                          : "linear-gradient(135deg, rgba(135,206,235,0.8) 0%, rgba(135,206,235,0.6) 100%)"
                      }}
                    >
                      <div className="text-center px-4 max-w-[300px] mx-auto">
                        <div className="text-xs font-['Coming_Soon:Regular',sans-serif] font-normal uppercase tracking-[0.4em] mb-2 opacity-80 text-black text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                          {mode.duration}
                        </div>
                        <h3 className="text-xl font-['Coming_Soon:Regular',sans-serif] font-normal text-black mb-1 text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                          {mode.title}
                        </h3>
                        <p className="text-xs font-['Coming_Soon:Regular',sans-serif] font-normal text-black/80 mb-1 text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] leading-[1.5]">
                          {mode.description}
                        </p>
                        <p className="text-[10px] font-['Coming_Soon:Regular',sans-serif] font-normal text-black/70 text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] leading-[1.4]">
                          {mode.subtext}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* 使い方セクション - Soft UIデザインスタイル */}
            <motion.section
              className="rounded-[32px] bg-gradient-to-br from-pink-200/60 to-pink-300/60 backdrop-blur-xl p-8 mb-8 mx-4 shadow-[0px_16px_48px_rgba(255,182,193,0.2),0px_8px_24px_rgba(255,182,193,0.15)] border border-white/50"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-center mb-8">
                <p className="text-sm font-['Coming_Soon:Regular',sans-serif] font-normal uppercase tracking-[0.4em] text-black mb-3 text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">使い方</p>
                <h3 className="text-3xl sm:text-4xl font-['Coming_Soon:Regular',sans-serif] font-normal text-black text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">かんたん3ステップ</h3>
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
                    <div className="text-5xl font-['Coming_Soon:Regular',sans-serif] font-normal text-black/30 mb-2 text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">{step.num}</div>
                    <h4 className="text-xl font-['Coming_Soon:Regular',sans-serif] font-normal text-black mb-2 text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">{step.title}</h4>
                    <p className="text-sm font-['Coming_Soon:Regular',sans-serif] font-normal text-black/70 text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.section>

            {/* CTAセクション - Figmaデザインのスタイルに合わせて調整 */}
            <motion.section
              className="mt-8 text-center mb-20 px-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="rounded-[32px] bg-gradient-to-br from-yellow-50/80 to-yellow-100/80 backdrop-blur-xl p-10 shadow-[0px_16px_48px_rgba(255,248,220,0.3),0px_8px_24px_rgba(255,248,220,0.2)] border border-white/50">
                <h3 className="text-2xl sm:text-3xl font-['Coming_Soon:Regular',sans-serif] font-normal text-black mb-4 text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] leading-[1.5] mx-auto max-w-[320px]">
                  今日の2人の温度を<br />
                  診断してみる
                </h3>
                <p className="text-base font-['Coming_Soon:Regular',sans-serif] font-normal text-black/80 mb-8 text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] leading-[1.6] mx-auto max-w-[340px]">
                  気分が上がる前にサッと診断したい日も、<br />
                  じっくり語り合いたい日もOK。
                </p>
                <div className="flex flex-wrap justify-center gap-4">
                  <Link
                    href="/diagnoses/compatibility-54"
                    className="px-10 py-5 text-xl font-['Coming_Soon:Regular',sans-serif] font-normal rounded-[24px] bg-white/90 backdrop-blur-sm text-black shadow-[0px_12px_32px_rgba(0,0,0,0.08),0px_6px_16px_rgba(0,0,0,0.04)] hover:shadow-[0px_16px_40px_rgba(0,0,0,0.12),0px_8px_20px_rgba(0,0,0,0.06)] transform hover:scale-105 transition-all border border-white/50"
                  >
                    徹底診断を始める
                  </Link>
                  <Link
                    href="/diagnoses/compatibility-18"
                    className="px-10 py-5 text-xl font-['Coming_Soon:Regular',sans-serif] font-normal rounded-[24px] bg-gradient-to-br from-pink-200/80 to-pink-300/80 backdrop-blur-sm text-black shadow-[0px_12px_32px_rgba(255,182,193,0.3),0px_6px_16px_rgba(255,182,193,0.2)] hover:shadow-[0px_16px_40px_rgba(255,182,193,0.4),0px_8px_20px_rgba(255,182,193,0.3)] transform hover:scale-105 transition-all border border-white/50"
                  >
                    クイック診断
                  </Link>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>

      {/* PC用レイアウト */}
      <div className="hidden md:block relative z-10 max-w-7xl mx-auto px-8 py-16">
        {/* ヘッダーセクション - PC用 Soft UIスタイル */}
        <motion.section
          className="relative h-[400px] rounded-[40px] overflow-hidden mb-12 shadow-[0px_20px_60px_rgba(0,0,0,0.08),0px_8px_24px_rgba(0,0,0,0.04)] border border-white/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 overflow-hidden rounded-[40px]">
            <img alt="" className="absolute inset-0 w-full h-full object-cover" src={headerBackgroundImage} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/40 rounded-[40px]"></div>
          {/* 引用文 - PC用 */}
          <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 font-['Inter:Extra_Bold_Italic',sans-serif] font-extrabold italic text-3xl text-center text-white text-shadow-[0px_4px_12px_rgba(0,0,0,0.3)] max-w-2xl leading-[1.5] z-10">
            2人のリズム、<br />
            響き合う瞬間を。
          </p>
        </motion.section>

        {/* メインコンテンツエリア - PC用 */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* 左カラム */}
          <div className="space-y-8">
            {/* ロゴ/タイトル - PC用 */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h1 className="text-8xl font-['Coming_Soon:Regular',sans-serif] font-normal tracking-tight mb-6 text-black">
                PAIRLY LAB
              </h1>
            </motion.div>

            {/* クイックアクションボタン - PC用 */}
            <motion.div
              className="flex flex-col gap-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Link
                href="/diagnoses/compatibility-54"
                className="group relative px-12 py-6 text-2xl font-['Coming_Soon:Regular',sans-serif] font-normal rounded-[28px] bg-gradient-to-br from-pink-200/80 to-pink-300/80 backdrop-blur-sm text-black shadow-[0px_12px_32px_rgba(255,182,193,0.3),0px_6px_16px_rgba(255,182,193,0.2)] hover:shadow-[0px_16px_40px_rgba(255,182,193,0.4),0px_8px_20px_rgba(255,182,193,0.3)] transition-all transform hover:scale-[1.02] text-center border border-white/50"
              >
                <span className="relative z-10">54問でじっくり</span>
              </Link>
              <Link
                href="/diagnoses/compatibility-18"
                className="group relative px-12 py-6 text-2xl font-['Coming_Soon:Regular',sans-serif] font-normal rounded-[28px] bg-gradient-to-br from-sky-200/80 to-sky-300/80 backdrop-blur-sm text-black shadow-[0px_12px_32px_rgba(135,206,235,0.3),0px_6px_16px_rgba(135,206,235,0.2)] hover:shadow-[0px_16px_40px_rgba(135,206,235,0.4),0px_8px_20px_rgba(135,206,235,0.3)] transition-all transform hover:scale-[1.02] text-center border border-white/50"
              >
                <span className="relative z-10">3分で試す</span>
              </Link>
            </motion.div>

            {/* 統計セクション - PC用 */}
            <motion.div
              className="grid grid-cols-3 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {[
                { label: "質問", value: "18/54" },
                { label: "タイプ", value: "27" },
                { label: "相性", value: "729" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="rounded-[28px] bg-white/70 backdrop-blur-sm p-6 shadow-[0px_12px_32px_rgba(0,0,0,0.06),0px_6px_16px_rgba(0,0,0,0.04)] text-center border border-white/50"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                >
                  <div className="text-3xl font-['Coming_Soon:Regular',sans-serif] font-normal text-black mb-2 text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">{stat.value}</div>
                  <div className="text-sm font-['Coming_Soon:Regular',sans-serif] font-normal text-black text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* 右カラム */}
          <div className="space-y-8">
            {/* 診断モードカード - PC用 */}
            <div className="space-y-4">
              <motion.div
                className="text-center mb-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <p className="text-base font-['Coming_Soon:Regular',sans-serif] font-normal uppercase tracking-[0.3em] text-black mb-2">選べる診断</p>
                <h2 className="text-4xl font-['Coming_Soon:Regular',sans-serif] font-normal text-black">
                  モードを選ぶ
                </h2>
              </motion.div>

              {diagnostics.map((mode, index) => (
                <motion.div
                  key={mode.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Link href={mode.href}>
                    <div
                      className="relative rounded-[32px] shadow-[0px_16px_48px_rgba(0,0,0,0.08),0px_8px_24px_rgba(0,0,0,0.04)] h-[140px] flex items-center justify-center cursor-pointer transform hover:scale-[1.02] transition-all backdrop-blur-sm border border-white/50"
                      style={{ 
                        background: mode.bgColor === "#FFB6C1" 
                          ? "linear-gradient(135deg, rgba(255,182,193,0.8) 0%, rgba(255,182,193,0.6) 100%)"
                          : "linear-gradient(135deg, rgba(135,206,235,0.8) 0%, rgba(135,206,235,0.6) 100%)"
                      }}
                    >
                      <div className="text-center px-8">
                        <div className="text-sm font-['Coming_Soon:Regular',sans-serif] font-normal uppercase tracking-[0.4em] mb-2 opacity-80 text-black text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                          {mode.duration}
                        </div>
                        <h3 className="text-3xl font-['Coming_Soon:Regular',sans-serif] font-normal text-black mb-2 text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                          {mode.title}
                        </h3>
                        <p className="text-base font-['Coming_Soon:Regular',sans-serif] font-normal text-black/80 mb-1 text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] leading-[1.5]">
                          {mode.description}
                        </p>
                        <p className="text-sm font-['Coming_Soon:Regular',sans-serif] font-normal text-black/70 text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] leading-[1.4]">
                          {mode.subtext}
                        </p>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* 使い方セクション - PC用 Soft UIスタイル */}
        <motion.section
          className="rounded-[40px] bg-gradient-to-br from-pink-200/60 to-pink-300/60 backdrop-blur-xl p-12 mb-8 shadow-[0px_20px_60px_rgba(255,182,193,0.2),0px_10px_30px_rgba(255,182,193,0.15)] border border-white/50"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-8">
            <p className="text-base font-['Coming_Soon:Regular',sans-serif] font-normal uppercase tracking-[0.4em] text-black mb-3 text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">使い方</p>
            <h3 className="text-5xl font-['Coming_Soon:Regular',sans-serif] font-normal text-black text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">かんたん3ステップ</h3>
          </div>
          <div className="grid grid-cols-3 gap-8">
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
                <div className="text-7xl font-['Coming_Soon:Regular',sans-serif] font-normal text-black/30 mb-4 text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">{step.num}</div>
                <h4 className="text-2xl font-['Coming_Soon:Regular',sans-serif] font-normal text-black mb-3 text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">{step.title}</h4>
                <p className="text-lg font-['Coming_Soon:Regular',sans-serif] font-normal text-black/70 text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* CTAセクション - PC用 */}
        <motion.section
          className="text-center mb-20"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="rounded-[40px] bg-gradient-to-br from-yellow-50/80 to-yellow-100/80 backdrop-blur-xl p-16 shadow-[0px_20px_60px_rgba(255,248,220,0.3),0px_10px_30px_rgba(255,248,220,0.2)] max-w-4xl mx-auto border border-white/50">
            <h3 className="text-4xl font-['Coming_Soon:Regular',sans-serif] font-normal text-black mb-6 text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] leading-[1.5]">
              今日の2人の温度を<br />
              診断してみる
            </h3>
            <p className="text-xl font-['Coming_Soon:Regular',sans-serif] font-normal text-black/80 mb-10 text-shadow-[0px_4px_4px_rgba(0,0,0,0.25)] leading-[1.6]">
              気分が上がる前にサッと診断したい日も、<br />
              じっくり語り合いたい日もOK。
            </p>
            <div className="flex justify-center gap-6">
              <Link
                href="/diagnoses/compatibility-54"
                className="px-12 py-6 text-2xl font-['Coming_Soon:Regular',sans-serif] font-normal rounded-[28px] bg-white/90 backdrop-blur-sm text-black shadow-[0px_16px_40px_rgba(0,0,0,0.08),0px_8px_20px_rgba(0,0,0,0.04)] hover:shadow-[0px_20px_50px_rgba(0,0,0,0.12),0px_10px_25px_rgba(0,0,0,0.06)] transform hover:scale-105 transition-all border border-white/50"
              >
                徹底診断を始める
              </Link>
              <Link
                href="/diagnoses/compatibility-18"
                className="px-12 py-6 text-2xl font-['Coming_Soon:Regular',sans-serif] font-normal rounded-[28px] bg-gradient-to-br from-pink-200/80 to-pink-300/80 backdrop-blur-sm text-black shadow-[0px_16px_40px_rgba(255,182,193,0.3),0px_8px_20px_rgba(255,182,193,0.2)] hover:shadow-[0px_20px_50px_rgba(255,182,193,0.4),0px_10px_25px_rgba(255,182,193,0.3)] transform hover:scale-105 transition-all border border-white/50"
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
