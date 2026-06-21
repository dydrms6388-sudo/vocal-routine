import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "개인정보처리방침 — 보컬루틴",
  robots: { index: false, follow: true },
};

export default function Privacy() {
  return (
    <main className="mx-auto min-h-screen w-full max-w-md px-5 py-10 text-white/80">
      <Link href="/" className="text-sm text-white/40 hover:underline">← 보컬루틴</Link>
      <h1 className="mt-4 text-2xl font-bold text-white">개인정보처리방침</h1>
      <p className="mt-2 text-xs text-white/40">최종 업데이트: 2026-06-21</p>

      <div className="mt-6 space-y-5 text-sm leading-relaxed">
        <section>
          <h2 className="font-bold text-white">1. 수집하는 정보</h2>
          <p className="mt-1 text-white/60">
            보컬루틴은 회원가입이 없으며 이름·이메일 등 개인정보를 수집하지 않습니다. 연속 기록(스트릭)과
            설정은 오직 사용자 기기의 로컬 저장소(localStorage)에만 저장되며 외부 서버로 전송되지 않습니다.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-white">2. 광고 및 제휴</h2>
          <p className="mt-1 text-white/60">
            본 서비스는 Google AdSense 등 제3자 광고와 쿠팡 파트너스 등 제휴 링크를 게재할 수 있습니다.
            광고 제공자는 쿠키를 사용해 맞춤 광고를 제공할 수 있으며, 사용자는 브라우저 설정에서 쿠키를 거부할 수 있습니다.
            제휴 링크를 통한 구매 시 운영자는 일정 수수료를 받을 수 있습니다.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-white">3. 데이터 삭제</h2>
          <p className="mt-1 text-white/60">
            브라우저의 사이트 데이터/캐시를 삭제하면 저장된 모든 기록이 즉시 제거됩니다.
          </p>
        </section>
        <section>
          <h2 className="font-bold text-white">4. 문의</h2>
          <p className="mt-1 text-white/60">dydrms6388@gmail.com</p>
        </section>
        <section>
          <h2 className="font-bold text-white">5. 면책</h2>
          <p className="mt-1 text-white/60">
            제공되는 보컬 트레이닝 콘텐츠는 일반적 정보 제공 목적이며 의료적 조언이 아닙니다.
            발성 중 통증·이상이 있으면 즉시 중단하고 이비인후과 전문의와 상담하세요.
          </p>
        </section>
      </div>
    </main>
  );
}
