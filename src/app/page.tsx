"use client";

import dynamic from "next/dynamic";
import { useMemo, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  routineOfDay,
  tipOfDay,
  extraTips,
  totalRoutineSeconds,
  CATEGORY_META,
  TIPS,
  type Category,
  type Tip,
} from "@/lib/vocalContent";
import RoutinePlayer from "@/components/RoutinePlayer";
import { AdSlot, AffiliatePicks } from "@/components/AdSlot";
import { useStreak } from "@/lib/useStreak";
import * as audio from "@/lib/audio";

const VocalScene = dynamic(() => import("@/components/VocalScene"), {
  ssr: false,
  loading: () => <div className="h-full w-full animate-pulse rounded-3xl bg-white/[0.03]" />,
});

const CATS = Object.keys(CATEGORY_META) as Category[];

export default function Home() {
  const routine = useMemo(() => routineOfDay(), []);
  const todayTip = useMemo(() => tipOfDay(), []);
  const more = useMemo(() => extraTips(undefined, 3, todayTip), [todayTip]);
  const accent = CATEGORY_META[routine.focus].color;

  const [active, setActive] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [filter, setFilter] = useState<Category | "전체">("전체");
  const streak = useStreak();

  const dateLabel = useMemo(() => {
    const d = new Date();
    return `${d.getFullYear()}. ${d.getMonth() + 1}. ${d.getDate()}`;
  }, []);

  const toggleSound = useCallback(async () => {
    if (!soundOn) {
      await audio.enableAudio();
      setSoundOn(true);
      audio.startBeep();
    } else {
      audio.disableAudio();
      setSoundOn(false);
    }
  }, [soundOn]);

  const onComplete = useCallback(() => streak.markDone(), [streak]);

  const share = useCallback(async () => {
    const text = `오늘의 보컬 루틴 「${routine.title}」 완료! 🎤 #보컬루틴`;
    const url = typeof window !== "undefined" ? window.location.href : "";
    try {
      if (navigator.share) await navigator.share({ title: "보컬루틴", text, url });
      else {
        await navigator.clipboard.writeText(`${text} ${url}`);
        alert("공유 문구를 복사했어요!");
      }
    } catch {}
  }, [routine.title]);

  const filtered: Tip[] = filter === "전체" ? TIPS : TIPS.filter((t) => t.cat === filter);

  return (
    <main className="mx-auto min-h-screen w-full max-w-md px-4 pb-16 pt-6">
      {/* 헤더 */}
      <header className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🎤</span>
          <div>
            <h1 className="text-lg font-extrabold leading-none text-white">보컬루틴</h1>
            <p className="text-[11px] text-white/40">매일 1% 더 잘 부르는 법</p>
          </div>
        </div>
        <button
          onClick={toggleSound}
          aria-label="소리 토글"
          className="rounded-full border border-white/15 bg-white/5 px-3 py-2 text-sm transition active:scale-95"
        >
          {soundOn ? "🔊 소리 켜짐" : "🔇 소리 꺼짐"}
        </button>
      </header>

      {/* 히어로: 3D 씬 + 스트릭 */}
      <section className="relative mb-5 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-transparent">
        <div className="h-52 w-full">
          <VocalScene active={active} color={accent} />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between p-4">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-white/40">{dateLabel}</div>
            <div className="text-sm font-semibold text-white/80">오늘의 포커스 · {routine.focus}</div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-extrabold tabular-nums" style={{ color: accent }}>
              🔥{streak.count}
            </div>
            <div className="text-[10px] text-white/40">연속일 · 최고 {streak.best}</div>
          </div>
        </div>
      </section>

      {/* 오늘의 루틴 */}
      <section className="mb-5">
        <div className="mb-2 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-base font-bold text-white">
            <span style={{ color: accent }}>●</span> 오늘의 루틴
          </h2>
          <span className="text-xs text-white/40">
            {routine.steps.length}스텝 · 약 {Math.round(totalRoutineSeconds(routine) / 60)}분
          </span>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-2 rounded-2xl border px-4 py-3"
          style={{ borderColor: `${accent}40`, background: `${accent}10` }}
        >
          <div className="text-lg font-bold text-white">{routine.title}</div>
          <div className="text-xs text-white/50">
            {CATEGORY_META[routine.focus].emoji} {CATEGORY_META[routine.focus].blurb}
          </div>
        </motion.div>
        <RoutinePlayer steps={routine.steps} accent={accent} onActiveChange={setActive} onComplete={onComplete} />
        {streak.doneToday && (
          <button
            onClick={share}
            className="mt-3 w-full rounded-2xl border border-white/15 bg-white/5 py-3 text-sm font-semibold text-white transition active:scale-95"
          >
            ↗ 오늘 루틴 완료 공유하기
          </button>
        )}
      </section>

      <div className="mb-5">
        <AdSlot label="보컬루틴 후원" />
      </div>

      {/* 오늘의 꿀팁 */}
      <section className="mb-5">
        <h2 className="mb-2 text-base font-bold text-white">💡 오늘의 보컬 꿀팁</h2>
        <FeatureTip tip={todayTip} />
        <div className="mt-3 grid gap-2">
          {more.map((t, i) => (
            <MiniTip key={i} tip={t} />
          ))}
        </div>
      </section>

      {/* 꿀팁 라이브러리 (다각화) */}
      <section className="mb-5">
        <h2 className="mb-2 text-base font-bold text-white">📚 꿀팁 라이브러리</h2>
        <div className="mb-3 flex flex-wrap gap-1.5">
          {(["전체", ...CATS] as const).map((c) => {
            const on = filter === c;
            const col = c === "전체" ? "#94a3b8" : CATEGORY_META[c as Category].color;
            return (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className="rounded-full px-3 py-1.5 text-xs font-medium transition active:scale-95"
                style={{
                  background: on ? col : "rgba(255,255,255,0.05)",
                  color: on ? "#000" : "rgba(255,255,255,0.7)",
                  border: `1px solid ${on ? col : "rgba(255,255,255,0.1)"}`,
                }}
              >
                {c === "전체" ? "전체" : `${CATEGORY_META[c as Category].emoji} ${c}`}
              </button>
            );
          })}
        </div>
        <div className="grid gap-2">
          {filtered.map((t, i) => (
            <MiniTip key={`${filter}-${i}`} tip={t} />
          ))}
        </div>
        <p className="mt-2 text-center text-[11px] text-white/30">{TIPS.length}개의 큐레이션 팁 · 매일 새로 추천</p>
      </section>

      <div className="mb-5">
        <AffiliatePicks />
      </div>

      {/* 푸터 */}
      <footer className="mt-8 space-y-2 text-center text-[11px] text-white/30">
        <p>보컬루틴은 외부 서버 없이 브라우저에서 동작하며, 기록은 기기에만 저장됩니다.</p>
        <p>본 콘텐츠는 일반적인 보컬 트레이닝 가이드로, 통증·성대 이상 시 전문의·이비인후과 상담을 권합니다.</p>
        <div className="flex justify-center gap-3 pt-1 text-white/40">
          <a href="/privacy" className="underline-offset-2 hover:underline">개인정보</a>
          <span>·</span>
          <a href="mailto:dydrms6388@gmail.com" className="underline-offset-2 hover:underline">문의</a>
          <span>·</span>
          <a href="https://dydrms-hub.vercel.app" className="underline-offset-2 hover:underline">더 많은 도구</a>
        </div>
      </footer>
    </main>
  );
}

function FeatureTip({ tip }: { tip: Tip }) {
  const meta = CATEGORY_META[tip.cat];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-3xl border p-5"
      style={{ borderColor: `${meta.color}40`, background: `linear-gradient(135deg, ${meta.color}18, transparent)` }}
    >
      <div
        className="mb-2 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold"
        style={{ background: `${meta.color}25`, color: meta.color }}
      >
        {meta.emoji} {tip.cat}
      </div>
      <h3 className="text-lg font-bold leading-snug text-white">{tip.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/70">{tip.body}</p>
      {tip.drill && (
        <div className="mt-3 rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-white/60">
          <span className="font-semibold" style={{ color: meta.color }}>오늘 연습 →</span> {tip.drill}
        </div>
      )}
    </motion.div>
  );
}

function MiniTip({ tip }: { tip: Tip }) {
  const meta = CATEGORY_META[tip.cat];
  const [open, setOpen] = useState(false);
  return (
    <button
      onClick={() => setOpen((o) => !o)}
      className="w-full rounded-2xl border border-white/8 bg-white/[0.02] p-3 text-left transition hover:border-white/15 active:scale-[0.99]"
    >
      <div className="flex items-center gap-2">
        <span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg text-sm" style={{ background: `${meta.color}22` }}>
          {meta.emoji}
        </span>
        <span className="flex-1 text-sm font-semibold text-white/90">{tip.title}</span>
        <span className="text-white/30">{open ? "−" : "+"}</span>
      </div>
      {open && (
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="overflow-hidden">
          <p className="mt-2 pl-9 text-xs leading-relaxed text-white/60">{tip.body}</p>
          {tip.drill && <p className="mt-1.5 pl-9 text-[11px]" style={{ color: meta.color }}>연습: {tip.drill}</p>}
        </motion.div>
      )}
    </button>
  );
}
