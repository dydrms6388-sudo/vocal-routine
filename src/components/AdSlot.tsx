// 수익화 키트: 애드센스 자리(자체 도메인 승인 후 활성) + 맥락 쿠팡 제휴.
export function AdSlot({ label = "광고" }: { label?: string }) {
  return (
    <div className="flex min-h-[90px] w-full items-center justify-center rounded-2xl border border-dashed border-white/10 bg-white/[0.015] text-center">
      <span className="text-[11px] tracking-widest text-white/25">{label} · AD</span>
    </div>
  );
}

// 보컬 맥락 제휴 추천 (쿠팡 파트너스 — 승인 후 실링크 교체)
const PICKS = [
  { emoji: "🎙️", name: "USB 콘덴서 마이크", note: "홈 녹음·연습 모니터링" },
  { emoji: "🎧", name: "모니터링 헤드폰", note: "내 음정 정확히 듣기" },
  { emoji: "🍯", name: "도라지·프로폴리스 목캔디", note: "성대 컨디션 관리" },
  { emoji: "📱", name: "스마트폰 삼각대", note: "연습 영상 셀프 피드백" },
];

export function AffiliatePicks() {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.02] p-5">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-bold text-white/80">🛒 보컬러 필수템</h3>
        <span className="text-[10px] text-white/30">제휴 링크</span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {PICKS.map((p) => (
          <a
            key={p.name}
            href="#"
            onClick={(e) => e.preventDefault()}
            className="group flex items-center gap-2 rounded-xl border border-white/8 bg-white/[0.02] p-3 transition hover:border-white/20 hover:bg-white/5"
          >
            <span className="text-xl">{p.emoji}</span>
            <span className="leading-tight">
              <span className="block text-xs font-semibold text-white/85">{p.name}</span>
              <span className="block text-[10px] text-white/40">{p.note}</span>
            </span>
          </a>
        ))}
      </div>
      <p className="mt-3 text-[10px] leading-relaxed text-white/25">
        ※ 이 영역은 쿠팡 파트너스 등 제휴 활동의 일환으로, 이에 따른 일정액의 수수료를 제공받을 수 있습니다.
      </p>
    </section>
  );
}
