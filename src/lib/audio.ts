// Web Audio 엔진 — 외부 에셋 없이 합성음으로 피치 가이드/UI 피드백 제공.
// 자동재생 차단·접근성: 기본 OFF, 사용자가 첫 탭(enable)으로 깨운 뒤에만 재생.

let ctx: AudioContext | null = null;
let enabled = false;

export function isAudioEnabled() {
  return enabled;
}

// 사용자 제스처 안에서 호출 → AudioContext resume
export async function enableAudio(): Promise<boolean> {
  try {
    if (typeof window === "undefined") return false;
    if (!ctx) {
      const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      ctx = new AC();
    }
    if (ctx.state === "suspended") await ctx.resume();
    enabled = true;
    return true;
  } catch {
    return false;
  }
}

export function disableAudio() {
  enabled = false;
}

export function toggleAudio(): boolean {
  if (enabled) {
    disableAudio();
    return false;
  }
  void enableAudio();
  return true;
}

function envTone(freq: number, start: number, dur: number, type: OscillatorType, peak: number) {
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(freq, start);
  gain.gain.setValueAtTime(0.0001, start);
  gain.gain.exponentialRampToValueAtTime(peak, start + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, start + dur);
  osc.connect(gain).connect(ctx.destination);
  osc.start(start);
  osc.stop(start + dur + 0.05);
}

// 한 음 가이드 (피아노 같은 사인 톤)
export function playNote(freq: number, dur = 0.6) {
  if (!enabled || !ctx) return;
  envTone(freq, ctx.currentTime, dur, "sine", 0.18);
}

// 스케일/시퀀스 — 음 배열을 순차 재생
export function playSequence(freqs: number[], stepDur = 0.55) {
  if (!enabled || !ctx) return;
  const t0 = ctx.currentTime;
  freqs.forEach((f, i) => envTone(f, t0 + i * stepDur, stepDur * 0.9, "sine", 0.16));
}

// 사이렌(글리산도) — 두 음 사이 부드럽게 오르내림
export function playSiren(from: number, to: number, dur = 2.2) {
  if (!enabled || !ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "sine";
  const t0 = ctx.currentTime;
  osc.frequency.setValueAtTime(from, t0);
  osc.frequency.linearRampToValueAtTime(to, t0 + dur / 2);
  osc.frequency.linearRampToValueAtTime(from, t0 + dur);
  gain.gain.setValueAtTime(0.0001, t0);
  gain.gain.exponentialRampToValueAtTime(0.14, t0 + 0.05);
  gain.gain.setValueAtTime(0.14, t0 + dur - 0.1);
  gain.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
  osc.connect(gain).connect(ctx.destination);
  osc.start(t0);
  osc.stop(t0 + dur + 0.05);
}

// UI 피드백
export function tick() {
  if (!enabled || !ctx) return;
  envTone(880, ctx.currentTime, 0.05, "triangle", 0.05);
}
export function success() {
  if (!enabled || !ctx) return;
  const t0 = ctx.currentTime;
  [523.25, 659.25, 783.99, 1046.5].forEach((f, i) =>
    envTone(f, t0 + i * 0.09, 0.18, "triangle", 0.1)
  );
}
export function startBeep() {
  if (!enabled || !ctx) return;
  envTone(660, ctx.currentTime, 0.12, "sine", 0.08);
}
