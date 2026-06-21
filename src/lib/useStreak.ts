"use client";

import { useCallback, useEffect, useState } from "react";

const KEY = "vocalroutine.streak.v1";

interface StreakState {
  count: number;
  best: number;
  last: string; // YYYY-MM-DD
  totalDays: number;
}

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}
function yesterdayStr(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export function useStreak() {
  const [state, setState] = useState<StreakState>({ count: 0, best: 0, last: "", totalDays: 0 });
  const [doneToday, setDoneToday] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw) as StreakState;
        setState(s);
        setDoneToday(s.last === todayStr());
      }
    } catch {}
  }, []);

  const markDone = useCallback(() => {
    setState((prev) => {
      const t = todayStr();
      if (prev.last === t) return prev; // 이미 오늘 완료
      const continued = prev.last === yesterdayStr();
      const count = continued ? prev.count + 1 : 1;
      const next: StreakState = {
        count,
        best: Math.max(prev.best, count),
        last: t,
        totalDays: prev.totalDays + 1,
      };
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {}
      return next;
    });
    setDoneToday(true);
  }, []);

  return { ...state, doneToday, markDone };
}
