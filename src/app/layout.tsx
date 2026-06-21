import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE = "https://vocal-routine.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: "보컬루틴 — 매일 따라 하는 보컬 트레이닝 + 오늘의 꿀팁",
  description:
    "매일 새로운 워밍업 루틴과 보컬 꿀팁으로 노래 실력을 키우세요. 피치 가이드 사운드, 고음·믹스보이스·호흡·딕션까지 12개 카테고리 80+ 팁. 설치 없이 브라우저에서.",
  keywords: ["보컬연습", "보컬트레이닝", "발성연습", "고음내는법", "믹스보이스", "보컬꿀팁", "노래잘하는법", "워밍업"],
  authors: [{ name: "보컬루틴" }],
  openGraph: {
    title: "보컬루틴 🎤 매일 따라 하는 보컬 트레이닝",
    description: "오늘의 루틴 + 보컬 꿀팁. 피치 가이드 사운드와 함께 매일 1%씩 성장.",
    url: SITE,
    siteName: "보컬루틴",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "보컬루틴 🎤 매일 따라 하는 보컬 트레이닝",
    description: "오늘의 루틴 + 보컬 꿀팁. 매일 1%씩 성장.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0a0a12",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "보컬루틴",
    applicationCategory: "EducationApplication",
    operatingSystem: "Web",
    description: "매일 따라 하는 보컬 트레이닝 루틴과 보컬 꿀팁.",
    offers: { "@type": "Offer", price: "0", priceCurrency: "KRW" },
    inLanguage: "ko",
  };
  return (
    <html lang="ko" className="h-full antialiased">
      <body className="min-h-full">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        {children}
      </body>
    </html>
  );
}
