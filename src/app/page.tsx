import Link from "next/link";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-[#fefaf5] via-[#f7f8ff] to-white text-[#1f2933]">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-16 h-64 w-64 rounded-full bg-[#f0f4ff] blur-3xl opacity-70" />
        <div className="absolute right-16 top-1/4 h-72 w-72 rounded-full bg-[#ffe7d6] blur-3xl opacity-60" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#dff3ec] blur-3xl opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_25%,rgba(28,73,103,0.04),transparent_30%),radial-gradient(circle_at_80%_0%,rgba(238,129,64,0.06),transparent_28%)]" />
      </div>

      <main className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-between px-6 py-14">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 rounded-full bg-white/80 px-4 py-2 text-sm font-semibold shadow-sm ring-1 ring-black/5 backdrop-blur">
            <span className="text-[#1f2933]">MatchTune</span>
            <span className="rounded-full bg-[#f2e4d5] px-3 py-1 text-xs font-medium text-[#8a5a2e]">ふたりで使える</span>
          </div>
          <span className="hidden text-sm text-[#475467] sm:block">音ではなく、ふたりの空気をやさしくチューニングする診断</span>
        </div>

        <div className="grid flex-1 items-center gap-10 pt-10 md:grid-cols-[1.05fr_0.95fr] md:pt-14">
          <div className="space-y-8">
            <div className="space-y-4">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold tracking-[0.12em] text-[#8a5a2e] shadow-sm ring-1 ring-black/5 backdrop-blur">
                手触りのある診断
                <span className="h-[2px] w-10 rounded-full bg-gradient-to-r from-[#f59e0b] to-[#f97316]" />
              </p>
              <h1 className="text-4xl font-bold leading-tight text-[#15202b] sm:text-5xl">
                ふたりの空気を、
                <span className="block text-[#1f2933]">やわらかく整えるマッチング診断</span>
              </h1>
              <p className="text-lg leading-relaxed text-[#4b5563]">
                無機質なAI感をそっと抑えて、紙のアンケートのような温度感で問いかけます。
                かるい質問に答えるだけで、似ているところと違うところが静かに浮かび上がります。
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/diagnoses"
                className="group relative inline-flex items-center justify-center gap-2 rounded-full bg-[#2c3e50] px-6 py-3 text-base font-semibold text-white shadow-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg"
              >
                診断をはじめる
                <span className="text-lg">→</span>
                <span className="absolute inset-0 scale-0 rounded-full bg-white/10 opacity-0 transition group-hover:scale-100 group-hover:opacity-100" />
              </Link>
              <Link
                href="/dev"
                className="inline-flex items-center gap-2 rounded-full bg-white/90 px-5 py-3 text-sm font-semibold text-[#1f2933] shadow-sm ring-1 ring-black/5 transition duration-200 hover:-translate-y-0.5 hover:shadow-md"
              >
                雰囲気をみる
              </Link>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold text-[#6b7280] shadow-sm ring-1 ring-black/5">
                <span className="h-2 w-2 rounded-full bg-[#10b981]" /> プライバシーは診断後に自分で共有
              </span>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {["やさしい日本語で質問", "パートナーとリンク共有", "結果は色で直感的"].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-2 rounded-2xl bg-white/80 px-4 py-3 text-sm font-semibold text-[#1f2933] shadow-sm ring-1 ring-black/5 backdrop-blur"
                >
                  <span className="text-lg">✺</span>
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6 rounded-3xl bg-white/80 p-6 shadow-xl ring-1 ring-black/5 backdrop-blur">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-xs font-semibold tracking-[0.18em] text-[#8a5a2e]">流れ</p>
                <h2 className="text-2xl font-bold text-[#1f2933]">MatchTuneの流れ</h2>
                <p className="text-sm text-[#4b5563]">3ステップで、ふたりのテンポをそろえます。</p>
              </div>
              <div className="flex flex-col items-end gap-1 text-xs text-[#6b7280]">
                <span className="rounded-full bg-[#f2e4d5] px-3 py-1 font-semibold text-[#8a5a2e]">約5分</span>
                <span className="rounded-full bg-[#e7f5ef] px-3 py-1 font-semibold text-[#0f9f6e]">トーンは穏やか</span>
              </div>
            </div>

            <div className="space-y-3">
              {[
                "短い質問でいまの気分を整える",
                "リンクを共有してパートナーも回答",
                "ふたりの回答を重ね、似ている景色を探す",
              ].map((step, index) => (
                <div
                  key={step}
                  className="flex items-start gap-3 rounded-2xl bg-gradient-to-r from-white to-[#f9f4ec] px-4 py-3 shadow-sm ring-1 ring-black/5"
                >
                  <span className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-[#2c3e50] text-sm font-semibold text-white">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-relaxed text-[#334155]">{step}</p>
                </div>
              ))}
            </div>

            <div className="space-y-4 rounded-2xl bg-[#0f172a] px-5 py-4 text-white shadow-md">
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-1">
                  <p className="text-sm font-semibold">診断のあとは、ふたりだけの色が静かに並びます</p>
                  <p className="text-xs text-white/80">数字ではなく「空気感」で眺められるから、気楽に共有できます。</p>
                </div>
                <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold">サンプルを見る</span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs text-white/80">
                <div className="rounded-xl bg-white/5 px-3 py-2">温度感が似ている項目</div>
                <div className="rounded-xl bg-white/5 px-3 py-2">違いを楽しめる項目</div>
                <div className="rounded-xl bg-white/5 px-3 py-2">次のデートのヒント</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
