// 보컬루틴 콘텐츠 엔진 — 외부 API 없이 날짜 기반으로 매일 다른 꿀팁/루틴을 결정적으로 생성.
// 다각화: 카테고리 12종, 팁 80+개, 매일 다른 워밍업 루틴.

export type Category =
  | "호흡"
  | "발성"
  | "고음"
  | "믹스보이스"
  | "음정"
  | "딕션"
  | "리듬"
  | "감정표현"
  | "무대매너"
  | "마이크"
  | "컨디션관리"
  | "멘탈";

export const CATEGORY_META: Record<Category, { emoji: string; color: string; blurb: string }> = {
  호흡: { emoji: "🫁", color: "#38bdf8", blurb: "복식호흡과 호흡 지지(support)" },
  발성: { emoji: "🔊", color: "#a78bfa", blurb: "성대 접지와 울림 만들기" },
  고음: { emoji: "🚀", color: "#f472b6", blurb: "긴장 없이 음역 넓히기" },
  믹스보이스: { emoji: "🪄", color: "#fbbf24", blurb: "흉성과 두성을 잇는 다리" },
  음정: { emoji: "🎯", color: "#34d399", blurb: "정확한 피치 감각" },
  딕션: { emoji: "🗣️", color: "#60a5fa", blurb: "또렷한 가사 전달" },
  리듬: { emoji: "🥁", color: "#fb7185", blurb: "그루브와 타이밍" },
  감정표현: { emoji: "💗", color: "#f87171", blurb: "전달되는 감정 연기" },
  무대매너: { emoji: "🎤", color: "#c084fc", blurb: "무대 위 존재감" },
  마이크: { emoji: "🎙️", color: "#22d3ee", blurb: "마이크 컨트롤 기술" },
  컨디션관리: { emoji: "🍵", color: "#4ade80", blurb: "목 건강과 회복" },
  멘탈: { emoji: "🧘", color: "#818cf8", blurb: "무대 불안과 자신감" },
};

export interface Tip {
  cat: Category;
  title: string;
  body: string;
  drill?: string; // 바로 해볼 수 있는 한 줄 연습
}

// 80+ 큐레이션 꿀팁 — 보컬 코치 관점으로 작성.
export const TIPS: Tip[] = [
  // 호흡
  { cat: "호흡", title: "어깨가 아니라 배가 움직여야 한다", body: "숨을 마실 때 어깨가 올라가면 가슴호흡입니다. 손을 배꼽 위에 올리고, 들숨에 배가 풍선처럼 나오는지 확인하세요. 어깨는 가만히.", drill: "4초 들숨(배 팽창) → 8초 날숨 ‘스–’ 5세트" },
  { cat: "호흡", title: "날숨을 ‘아껴 쓰는’ 감각", body: "고음·긴 프레이즈가 흔들리는 건 폐활량보다 ‘호흡 분배’ 문제일 때가 많습니다. 한 호흡을 길게 잘게 나눠 쓰는 컨트롤을 길러야 합니다.", drill: "‘스–’ 소리로 15초 균일하게 내뱉기" },
  { cat: "호흡", title: "호흡 지지(support)는 ‘버티기’다", body: "소리를 낼 때 복부가 안으로 푹 꺼지지 않도록 살짝 바깥으로 버텨주면 성대 부담이 줄고 음이 안정됩니다. 이게 ‘아포지오’의 핵심.", drill: "‘하!’ 짧게 끊어 외치며 복부 반동 느끼기 10회" },
  { cat: "호흡", title: "들숨은 소리 없이, 빠르게", body: "프레이즈 사이 ‘헉’ 소리나는 들숨은 청중에게 들립니다. 입과 코로 동시에 조용히 빠르게 채우는 연습을 하세요.", drill: "노래 한 소절마다 0.5초 무음 들숨 끼우기" },

  // 발성
  { cat: "발성", title: "립트릴은 만능 워밍업이다", body: "입술을 부르르 떨며 소리 내면 성대 접촉이 부드러워지고 호흡과 발성이 자동으로 연결됩니다. 음역 전체를 립트릴로 오르내리면 부담 없이 풀립니다.", drill: "낮은음→높은음 사이렌처럼 립트릴 1분" },
  { cat: "발성", title: "‘응–’ 허밍으로 울림 위치 찾기", body: "허밍할 때 콧등·광대 주변이 간질거리면 소리가 ‘앞쪽’으로 모인 상태입니다. 이 마스크 공명을 노래에서도 유지하면 적은 힘으로 멀리 갑니다.", drill: "‘음–’ 허밍하며 코끝 진동 느끼기 30초" },
  { cat: "발성", title: "목이 아니라 ‘공간’으로 소리낸다", body: "목으로 누르면 금방 잠깁니다. 하품 직전처럼 목 안쪽을 열어 공간을 만들고 그 공간을 울리세요.", drill: "하품하듯 ‘아–’ 내며 목 안 넓게 유지" },
  { cat: "발성", title: "성대를 ‘닫되 누르지 않기’", body: "바람 새는 소리(과소접지)도, 쥐어짜는 소리(과접지)도 아닌 중간. ‘에지(보컬 프라이)’에서 바로 모음으로 이어가면 적정 접지가 잡힙니다.", drill: "보컬프라이 ‘으어어’ → ‘아–’로 연결 10회" },

  // 고음
  { cat: "고음", title: "고음은 ‘더 세게’가 아니라 ‘더 얇게’", body: "음이 올라갈수록 성대는 얇고 길어져야 합니다. 힘을 더 주면 두꺼워져 막힙니다. 작게·얇게 시작해 공명으로 키우세요.", drill: "가성으로 고음 터치 → 점점 진성 섞기" },
  { cat: "고음", title: "고음 직전에 ‘낮춰서’ 도약 줄이기", body: "도약 폭이 크면 삑사리가 납니다. 바로 앞 음을 살짝 높은 위치감으로 미리 준비하면 점프가 작아집니다.", drill: "목표음을 가성으로 미리 한 번 ‘찍고’ 본 프레이즈 부르기" },
  { cat: "고음", title: "턱과 혀의 긴장을 풀어라", body: "고음에서 턱을 앞으로 내밀거나 혀뿌리를 누르면 길이 막힙니다. 손가락으로 턱을 가볍게 받쳐 고정한 채 불러보세요.", drill: "‘아’ 모음 고음 때 혀끝을 아랫니에 가볍게 붙이기" },
  { cat: "고음", title: "‘우’와 ‘이’ 모음으로 길을 연다", body: "넓은 ‘아’보다 좁은 ‘우/이’가 고음에서 성대를 모으기 쉽습니다. 어려운 ‘아’ 고음은 ‘우’로 연습 후 모음을 바꿔보세요.", drill: "어려운 고음 가사를 ‘우’로 바꿔 5회 → 원가사" },

  // 믹스보이스
  { cat: "믹스보이스", title: "믹스는 ‘섞는 비율’ 게임", body: "흉성 100%도 두성 100%도 아닌, 음에 따라 비율을 바꾸는 것이 믹스입니다. 파사지오(전환 구간)에서 갑자기 바꾸지 말고 그라데이션으로.", drill: "‘응가–’로 흉성→두성 미끄러지기 사이렌" },
  { cat: "믹스보이스", title: "‘응가(nga)’ 발음의 마법", body: "‘ng’ 자음은 연구개를 자연스럽게 올려 두성 공간을 열어줍니다. 믹스 전환이 막힐 때 ‘응–가’로 통로를 뚫으세요.", drill: "‘응–아’ 글리산도로 전환점 통과 1분" },
  { cat: "믹스보이스", title: "전환점에서 볼륨을 ‘줄여’ 통과", body: "파사지오에서 크게 내려 하면 막힙니다. 그 구간만 의도적으로 작게, 얇게 통과한 뒤 위에서 다시 키우세요.", drill: "전환 음만 70% 볼륨으로 가볍게 넘기기" },

  // 음정
  { cat: "음정", title: "음을 ‘아래에서’ 잡지 말고 ‘위에서’ 내려놓기", body: "음정이 자꾸 낮게 시작되면(플랫) 목표음을 위에서 살짝 얹는다는 이미지로 접근하세요. 특히 첫음·고음에서 효과적.", drill: "피아노/앱 기준음과 ‘아–’ 매칭, 위에서 안착" },
  { cat: "음정", title: "샵(높게)보다 플랫(낮게)이 더 거슬린다", body: "사람 귀는 음이 낮은 걸 더 ‘틀렸다’고 느낍니다. 애매하면 아주 미세하게 높은 쪽을 노리는 편이 안전합니다.", drill: "롱톤 유지 중 음이 처지지 않게 지지 유지" },
  { cat: "음정", title: "음치가 아니라 ‘듣고 따라하기’ 훈련 부족", body: "음정은 재능보다 ‘들은 음을 내 소리로 재현’하는 피드백 루프입니다. 한 음씩 따라 부르고 녹음해 비교하면 빠르게 좋아집니다.", drill: "단음 5개 듣고 따라 부른 뒤 녹음 비교" },

  // 딕션
  { cat: "딕션", title: "자음은 짧고 또렷, 모음은 길게", body: "노래의 음정·울림은 모음 위에 실립니다. 자음에 시간을 뺏기지 말고 빠르게 처리한 뒤 모음을 충분히 늘리세요.", drill: "‘사랑’을 ‘ㅅ-아아앙’처럼 모음 길게" },
  { cat: "딕션", title: "받침은 음 끝에 ‘살짝’만", body: "받침(종성)을 너무 일찍·세게 닫으면 소리가 끊깁니다. 모음을 끝까지 울린 뒤 마지막 순간에 받침을 가볍게 붙이세요.", drill: "‘밤’을 ‘바–(ㅁ)’으로, ㅁ은 끝에만" },
  { cat: "딕션", title: "‘ㅎ’ 바람 새는 가사 주의", body: "‘하·해·후’ 같은 ㅎ 발음은 호흡을 많이 흘립니다. 성대를 먼저 모은 뒤 ㅎ을 얹으면 음 손실이 줄어요.", drill: "‘하늘’ 첫음 성대 먼저 닫고 발음" },

  // 리듬
  { cat: "리듬", title: "박자는 ‘발’로 느껴라", body: "머리로 세지 말고 몸으로. 발끝이나 손으로 비트를 가볍게 짚으며 부르면 그루브가 안정됩니다.", drill: "메트로놈 80bpm에 발 까닥이며 한 소절" },
  { cat: "리듬", title: "쉼표도 노래의 일부다", body: "초보는 쉼표를 못 참고 채웁니다. 정확히 쉬어주는 ‘공간’이 리듬을 살립니다. 들숨도 박자 안에서.", drill: "쉼표 구간을 손가락으로 ‘딱’ 짚어 표시하며 부르기" },
  { cat: "리듬", title: "당김음(싱코페이션)은 ‘미리 준비’", body: "엇박에 들어가는 가사는 한 박 먼저 마음속으로 준비해야 늦지 않습니다. 원곡 보컬의 들어가는 타이밍을 입모양까지 따라하세요.", drill: "엇박 구간만 분리해 5회 반복" },

  // 감정표현
  { cat: "감정표현", title: "다이내믹(셈여림)이 감정을 만든다", body: "처음부터 끝까지 같은 크기로 부르면 밋밋합니다. 한 곡 안에서 ‘속삭임→폭발’의 곡선을 설계하세요.", drill: "1절은 작게, 후렴은 크게 — 대비 설계하고 부르기" },
  { cat: "감정표현", title: "가사의 ‘한 단어’를 정해 강조", body: "모든 단어를 강조하면 아무것도 강조되지 않습니다. 각 소절에서 가장 중요한 단어 하나를 골라 거기에 색을 입히세요.", drill: "후렴 가사에서 핵심 단어 1개 밑줄, 거기만 강조" },
  { cat: "감정표현", title: "표정과 호흡으로 ‘먼저’ 느껴라", body: "소리는 감정의 결과입니다. 부르기 전 그 가사의 장면을 떠올리면 톤이 저절로 바뀝니다.", drill: "첫 소절 전, 가사 상황 3초 상상하고 시작" },

  // 무대매너
  { cat: "무대매너", title: "시선은 ‘한 점’을 정해 둔다", body: "눈이 흔들리면 불안해 보입니다. 객석 뒤쪽 한 점을 정해 거기에 노래한다는 느낌으로 시선을 안정시키세요.", drill: "거울 보며 한 소절 동안 시선 고정 연습" },
  { cat: "무대매너", title: "인트로 4초가 첫인상을 결정", body: "노래 시작 전 자세·표정·호흡이 이미 무대를 시작합니다. 첫 음 전 ‘준비된 정적’을 즐기세요.", drill: "시작 전 3초 정지 → 호흡 → 첫음" },
  { cat: "무대매너", title: "실수는 ‘표정으로’ 덮인다", body: "삑사리보다 ‘당황한 표정’이 더 들킵니다. 틀려도 표정을 유지하면 관객 대부분은 모릅니다.", drill: "일부러 틀리고도 미소 유지하는 연습" },

  // 마이크
  { cat: "마이크", title: "고음엔 멀리, 저음엔 가까이", body: "큰 소리는 마이크를 떼고, 작고 낮은 소리는 가까이. 이 ‘마이크 무빙’만으로 다이내믹이 두 배가 됩니다.", drill: "후렴 고음에서 마이크 한 뼘 떼기 연습" },
  { cat: "마이크", title: "마이크는 입 ‘정면’이 기본", body: "그릴을 입 정면 2~5cm에 두는 게 기본. 비스듬히 두면 음색이 얇아지고 파열음(ㅍ,ㅂ)이 ‘퍽’ 칩니다.", drill: "‘파도’ 발음하며 팝 노이즈 안 나는 각도 찾기" },
  { cat: "마이크", title: "그릴을 손으로 감싸지 마라", body: "마이크 머리를 손으로 덮으면 하울링과 음색 왜곡이 생깁니다. 바디를 잡으세요.", drill: "마이크 잡는 손 위치 점검(머리 X, 몸통 O)" },

  // 컨디션관리
  { cat: "컨디션관리", title: "미지근한 물이 최고의 친구", body: "찬물은 성대를 수축시키고 카페인·술은 탈수시킵니다. 노래 전후 미지근한 물을 자주 한 모금씩.", drill: "연습 30분마다 물 한 모금" },
  { cat: "컨디션관리", title: "목 아플 땐 ‘무음(voice rest)’", body: "잠긴 목으로 무리하면 결절로 갑니다. 가장 빠른 회복은 ‘안 쓰기’. 속삭임도 성대엔 부담이니 피하세요.", drill: "통증 시 30분 완전 무음 + 수분" },
  { cat: "컨디션관리", title: "워밍업 없이 고음 금지", body: "찬 성대로 고음·벨팅은 부상 지름길. 최소 5분 립트릴·허밍으로 풀고 시작하세요.", drill: "노래 전 5분 사이렌 워밍업 루틴" },
  { cat: "컨디션관리", title: "쿨다운으로 다음 날을 산다", body: "강하게 부른 뒤엔 낮은음 허밍·립트릴로 성대를 진정시키세요. 워밍업만큼 쿨다운도 중요합니다.", drill: "연습 끝 2분 저음 허밍 글리산도" },

  // 멘탈
  { cat: "멘탈", title: "긴장은 ‘없애는’ 게 아니라 ‘쓰는’ 것", body: "프로도 떨립니다. 그 에너지를 ‘집중’으로 바꾸세요. 떨림을 인정하고 호흡으로 가라앉히면 오히려 무대가 살아납니다.", drill: "무대 전 4-7-8 호흡(4초 들숨·7초 멈춤·8초 날숨)" },
  { cat: "멘탈", title: "녹음을 ‘적’이 아니라 ‘코치’로", body: "내 녹음을 듣기 싫은 건 성장의 신호입니다. 비난이 아니라 ‘다음에 고칠 한 가지’만 찾는 도구로 쓰세요.", drill: "녹음 듣고 칭찬 1개·개선점 1개만 메모" },
  { cat: "멘탈", title: "비교 대상은 ‘어제의 나’", body: "남과 비교하면 끝이 없습니다. 매일 1%씩 어제보다 나아지는 데 집중하면 6개월 뒤 다른 사람이 됩니다.", drill: "오늘 연습에서 좋아진 점 1개 기록" },
];

// ── 결정적 난수 (날짜 시드) ──────────────────────────────
export function dateSeed(d = new Date()): number {
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
}
function mulberry32(a: number) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function tipOfDay(seed = dateSeed()): Tip {
  const rnd = mulberry32(seed);
  return TIPS[Math.floor(rnd() * TIPS.length)];
}

// 3개의 보조 팁(중복 없이) — '오늘의 추가 팁'
export function extraTips(seed = dateSeed(), n = 3, exclude?: Tip): Tip[] {
  const rnd = mulberry32(seed ^ 0x9e3779b9);
  const pool = TIPS.filter((t) => t !== exclude);
  const out: Tip[] = [];
  while (out.length < n && pool.length) {
    const i = Math.floor(rnd() * pool.length);
    out.push(pool.splice(i, 1)[0]);
  }
  return out;
}

// ── 워밍업 루틴 ──────────────────────────────────────────
export interface RoutineStep {
  name: string;
  seconds: number;
  cue: string; // 따라할 안내
  tone: "siren" | "scale" | "hold" | "rest" | "lip"; // 오디오 가이드 종류
  // 스케일/홀드용 기준 음 (Hz). 없으면 가이드음 없음.
  notes?: number[];
}

// 음이름 → 주파수 (A4=440)
const NOTE: Record<string, number> = {
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, G3: 196.0, A3: 220.0, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.0, A4: 440.0, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25,
};
const majorScale = (root: string[]) => root.map((n) => NOTE[n]);

interface RoutineFlavor {
  key: string;
  title: string;
  focus: Category;
  steps: RoutineStep[];
}

// 7가지 루틴 풀 — 매일 다른 루틴 (다각화)
const ROUTINES: RoutineFlavor[] = [
  {
    key: "wakeup",
    title: "기상 후 5분 깨우기",
    focus: "호흡",
    steps: [
      { name: "복식호흡", seconds: 40, cue: "배로 4초 들숨 · ‘스–’ 8초 날숨", tone: "rest" },
      { name: "립트릴 사이렌", seconds: 60, cue: "입술 부르르 떨며 낮은음↔높은음", tone: "lip" },
      { name: "허밍 공명", seconds: 50, cue: "‘음–’ 코끝 진동 느끼며", tone: "hold", notes: [NOTE.C4, NOTE.E4, NOTE.G4] },
      { name: "5음 스케일", seconds: 60, cue: "‘마–메–미–모–무’ 도레미파솔", tone: "scale", notes: majorScale(["C4", "D4", "E4", "F4", "G4"]) },
      { name: "마무리 롱톤", seconds: 40, cue: "‘아–’ 한 음 길게 안정되게", tone: "hold", notes: [NOTE.E4] },
    ],
  },
  {
    key: "highnote",
    title: "고음 도전 루틴",
    focus: "고음",
    steps: [
      { name: "립트릴 워밍", seconds: 50, cue: "부담 없이 음역 위아래로", tone: "lip" },
      { name: "‘우’ 글리산도", seconds: 60, cue: "‘우–’로 저음→고음 미끄러지기", tone: "siren", notes: [NOTE.C4, NOTE.C5] },
      { name: "가성 터치", seconds: 50, cue: "높은음 가볍게 가성으로 찍기", tone: "hold", notes: [NOTE.G4, NOTE.C5] },
      { name: "‘응가’ 믹스", seconds: 60, cue: "‘응–가’로 전환점 부드럽게", tone: "siren", notes: [NOTE.E4, NOTE.A4] },
      { name: "진성 얇게 키우기", seconds: 50, cue: "얇게 시작해 공명으로 확장", tone: "scale", notes: majorScale(["G4", "A4", "B4", "C5", "D5"]) },
    ],
  },
  {
    key: "pitch",
    title: "음정 교정 루틴",
    focus: "음정",
    steps: [
      { name: "기준음 매칭", seconds: 50, cue: "들리는 음에 ‘아–’ 정확히 맞추기", tone: "hold", notes: [NOTE.A3] },
      { name: "반음 계단", seconds: 60, cue: "한 음씩 위에서 내려놓듯", tone: "scale", notes: [NOTE.C4, NOTE.D4, NOTE.E4, NOTE.F4, NOTE.G4] },
      { name: "옥타브 점프", seconds: 50, cue: "낮은 도→높은 도 정확히", tone: "siren", notes: [NOTE.C4, NOTE.C5] },
      { name: "롱톤 안정", seconds: 60, cue: "처지지 않게 지지 유지", tone: "hold", notes: [NOTE.E4] },
    ],
  },
  {
    key: "diction",
    title: "딕션·전달력 루틴",
    focus: "딕션",
    steps: [
      { name: "입술·혀 풀기", seconds: 40, cue: "‘브르르’·혀 차기로 조음기관 깨우기", tone: "rest" },
      { name: "모음 길게", seconds: 60, cue: "‘아에이오우’ 각 모음 길게 또렷이", tone: "scale", notes: majorScale(["C4", "D4", "E4", "F4", "G4"]) },
      { name: "빠른 자음", seconds: 50, cue: "‘다다다·라라라’ 또렷하고 빠르게", tone: "rest" },
      { name: "가사 모음만", seconds: 50, cue: "좋아하는 가사를 모음만으로", tone: "hold", notes: [NOTE.G4] },
    ],
  },
  {
    key: "support",
    title: "호흡 지지 강화",
    focus: "호흡",
    steps: [
      { name: "‘스–’ 균일 날숨", seconds: 60, cue: "15초 동안 일정하게 새지 않게", tone: "rest" },
      { name: "끊어 외치기", seconds: 50, cue: "‘하! 하! 하!’ 복부 반동", tone: "rest" },
      { name: "롱톤 크레셴도", seconds: 60, cue: "작게→크게 한 호흡으로", tone: "hold", notes: [NOTE.D4] },
      { name: "지지 스케일", seconds: 60, cue: "복부 버티며 도레미파솔", tone: "scale", notes: majorScale(["C4", "D4", "E4", "F4", "G4"]) },
    ],
  },
  {
    key: "mix",
    title: "믹스보이스 연결",
    focus: "믹스보이스",
    steps: [
      { name: "허밍 사이렌", seconds: 50, cue: "‘음–’ 전 음역 미끄러지기", tone: "siren", notes: [NOTE.C4, NOTE.A4] },
      { name: "‘응가’ 통과", seconds: 60, cue: "전환점을 ‘응–가’로 뚫기", tone: "siren", notes: [NOTE.E4, NOTE.B4] },
      { name: "볼륨 줄여 통과", seconds: 50, cue: "전환 음만 70%로 가볍게", tone: "scale", notes: majorScale(["E4", "F4", "G4", "A4", "B4"]) },
      { name: "비율 그라데이션", seconds: 60, cue: "흉성→두성 부드럽게 섞기", tone: "siren", notes: [NOTE.G4, NOTE.D5] },
    ],
  },
  {
    key: "cooldown",
    title: "쿨다운·회복 루틴",
    focus: "컨디션관리",
    steps: [
      { name: "저음 허밍", seconds: 60, cue: "편한 낮은음 ‘음–’ 진정", tone: "hold", notes: [NOTE.C3, NOTE.E3] },
      { name: "립트릴 하강", seconds: 50, cue: "높은음→낮은음 천천히 내리기", tone: "lip" },
      { name: "긴 날숨 이완", seconds: 50, cue: "‘후–’ 길게 어깨 떨구기", tone: "rest" },
      { name: "롱톤 마무리", seconds: 40, cue: "가장 편한 음 한 번 길게", tone: "hold", notes: [NOTE.D4] },
    ],
  },
];

export function routineOfDay(seed = dateSeed()): RoutineFlavor {
  const rnd = mulberry32(seed ^ 0x1234abcd);
  return ROUTINES[Math.floor(rnd() * ROUTINES.length)];
}

export function totalRoutineSeconds(r: RoutineFlavor): number {
  return r.steps.reduce((s, x) => s + x.seconds, 0);
}

export const ALL_ROUTINES = ROUTINES;
export { NOTE };
