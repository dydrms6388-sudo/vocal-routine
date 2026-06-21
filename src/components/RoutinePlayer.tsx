"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import type { RoutineStep } from "@/lib/vocalContent";
import * as audio from "@/lib/audio";

interface Props {
  steps: RoutineStep[];
  accent: string;
  onActiveChange?: (active: boolean) => void;
  onComplete?: () => void;
}

export default function RoutinePlayer({ steps, accent, onActiveChange, onComplete }: Props) {
  const [idx, setIdx] = useState(0);
  const [remain, setRemain] = useState(steps[0].seconds);
  const [running, setRunning] = useState(false);
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const guideRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const step = steps[idx];

  const clearTimers = () => {
    if (timer.current) clearInterval(timer.current);
    if (guideRef.current) clearInterval(guideRef.current);
    timer.current = null;
    guideRef.current = null;
  };

  // 현재 스텝의 오디오 가이드 재생 (반복)
  const playGuide = useCallback(
    (s: RoutineStep) => {
      if (!audio.isAudioEnabled()) return;
      const fire = () => {
        if (s.tone === "scale" && s.notes) audio.playSequence(s.notes);
        else if (s.tone === "siren" && s.notes) audio.playSiren(s.notes[0], s.notes[1]);
        else if (s.tone === "hold" && s.notes) audio.playNote(s.notes[0], 1.2);
        else if (s.tone === "lip") audio.playSiren(160, 320, 2.4);
      };
      fire();
      if (guideRef.current) clearInterval(guideRef.current);
      const interval = s.tone === "scale" ? 4000 : s.tone === "rest" ? 0 : 3000;
      if (interval) guideRef.current = setInterval(fire, interval);
    },
    []
  );

  useEffect(() => {
    onActiveChange?.(running);
  }, [running, onActiveChange]);

  useEffect(() => () => clearTimers(), []);

  const goStep = useCallback(
    (next: number) => {
      if (next >= steps.length) {
        clearTimers();
        setRunning(false);
        setDone(true);
        onActiveChange?.(false);
        audio.success();
        confetti({ particleCount: 140, spread: 80, origin: { y: 0.6 }, colors: [accent, "#ffffff", "#fbbf24"] });
        onComplete?.();
        return;
      }
      setIdx(next);
      setRemain(steps[next].seconds);
      audio.startBeep();
      playGuide(steps[next]);
    },
    [steps, accent, onActiveChange, onComplete, playGuide]
  );

  const start = async () => {
    await audio.enableAudio();
    setDone(false);
    setRunning(true);
    audio.startBeep();
    playGuide(steps[idx]);
    if (timer.current) clearInterval(timer.current);
    timer.current = setInterval(() => {
      setRemain((r) => {
        if (r <= 1) {
          setIdx((cur) => {
            const nx = cur + 1;
            // 다음 틱에서 처리되도록 큐잉
            queueMicrotask(() => goStep(nx));
            return cur;
          });
          return 0;
        }
        if (r <= 4) audio.tick();
        return r - 1;
      });
    }, 1000);
  };

  const pause = () => {
    clearTimers();
    setRunning(false);
  };

  const reset = () => {
    clearTimers();
    setRunning(false);
    setDone(false);
    setIdx(0);
    setRemain(steps[0].seconds);
  };

  const skip = () => {
    clearTimers();
    const nx = idx + 1;
    if (running) {
      goStep(nx);
      if (nx < steps.length) start();
    } else {
      if (nx < steps.length) {
        setIdx(nx);
        setRemain(steps[nx].seconds);
      }
    }
  };

  const totalSecs = steps.reduce((a, s) => a + s.seconds, 0);
  const elapsed = steps.slice(0, idx).reduce((a, s) => a + s.seconds, 0) + (step.seconds - remain);
  const pct = Math.min(100, (elapsed / totalSecs) * 100);
  const stepPct = ((step.seconds - remain) / step.seconds) * 100;

  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 backdrop-blur">
      {/* 전체 진행바 */}
      <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-white/10">
        <motion.div
          className="h-full rounded-full"
          style={{ background: accent }}
          animate={{ width: `${pct}%` }}
          transition={{ ease: "linear", duration: 0.3 }}
        />
      </div>

      <AnimatePresence mode="wait">
        {!done ? (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.3 }}
            className="text-center"
          >
            <div className="mb-1 text-xs font-medium uppercase tracking-widest text-white/40">
              STEP {idx + 1} / {steps.length}
            </div>
            <h3 className="text-2xl font-bold text-white">{step.name}</h3>
            <p className="mt-2 min-h-[2.5rem] text-sm text-white/60">{step.cue}</p>

            {/* 원형 타이머 */}
            <div className="relative mx-auto my-5 h-40 w-40">
              <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="6" />
                <circle
                  cx="50" cy="50" r="44" fill="none" stroke={accent} strokeWidth="6" strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 44}
                  strokeDashoffset={2 * Math.PI * 44 * (1 - stepPct / 100)}
                  style={{ transition: "stroke-dashoffset 0.9s linear" }}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold tabular-nums text-white">{remain}</span>
                <span className="text-xs text-white/40">초</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-3">
              {!running ? (
                <button
                  onClick={start}
                  className="rounded-full px-7 py-3 text-sm font-bold text-black shadow-lg transition active:scale-95"
                  style={{ background: accent, boxShadow: `0 8px 30px -8px ${accent}` }}
                >
                  {idx === 0 && remain === steps[0].seconds ? "▶ 루틴 시작" : "▶ 이어서"}
                </button>
              ) : (
                <button
                  onClick={pause}
                  className="rounded-full border border-white/20 bg-white/5 px-7 py-3 text-sm font-bold text-white transition active:scale-95"
                >
                  ⏸ 일시정지
                </button>
              )}
              <button
                onClick={skip}
                className="rounded-full border border-white/15 px-4 py-3 text-sm text-white/70 transition hover:bg-white/5 active:scale-95"
              >
                다음 ⏭
              </button>
              <button
                onClick={reset}
                className="rounded-full border border-white/15 px-4 py-3 text-sm text-white/70 transition hover:bg-white/5 active:scale-95"
              >
                ↺
              </button>
            </div>

            {/* 스텝 점들 */}
            <div className="mt-5 flex justify-center gap-2">
              {steps.map((s, i) => (
                <div
                  key={i}
                  title={s.name}
                  className="h-2 rounded-full transition-all"
                  style={{
                    width: i === idx ? 22 : 8,
                    background: i < idx ? accent : i === idx ? accent : "rgba(255,255,255,0.18)",
                    opacity: i <= idx ? 1 : 0.5,
                  }}
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="done"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-6 text-center"
          >
            <div className="text-5xl">🎉</div>
            <h3 className="mt-3 text-2xl font-bold text-white">루틴 완료!</h3>
            <p className="mt-2 text-sm text-white/60">목이 풀렸어요. 오늘도 한 걸음 성장 ✨</p>
            <button
              onClick={reset}
              className="mt-5 rounded-full px-6 py-3 text-sm font-bold text-black transition active:scale-95"
              style={{ background: accent }}
            >
              ↺ 다시 하기
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
