
import React, { useState } from 'react';
import { Star, ArrowLeft, Check, X, Search, Sparkles } from 'lucide-react';

interface Props {
  selectedIndustry: string;
  onNext: (role: string) => void;
  onBack: () => void;
}

const ROLE_SUGGESTIONS: Record<string, string[]> = {
  "고용 및 인적자원 서비스": [
    "재취업 지원 전문가", "생애설계 상담사", "커리어 멘토", "시니어 인력 매칭 매니저",
    "인재 영입 전략가", "조직문화 컨설턴트", "직업 전환 코치", "HR Tech 도입 전문가"
  ],
  "전문 경영 컨설팅": [
    "전략 기획 고문", "조직 관리 컨설턴트", "변화 관리 전문가", "사외이사",
    "ESG 경영 자문", "디지털 전환(DX) 리더", "M&A 통합 전문가", "리스크 관리 파트너"
  ],
  "금융 및 자산 관리": [
    "PB 센터장", "투자 심사역", "자산 승계 컨설턴트", "리스크 관리 책임자",
    "연금 설계 전문가", "핀테크 도입 전략가", "기업 금융 고문", "패밀리 오피스 매니저"
  ],
  "고부가가치 제조업": [
    "공장 운영 총괄", "기술 고문/마이스터", "글로벌 공급망 관리자", "품질 혁신 리더",
    "스마트 팩토리 설계자", "R&D 전략 본부장", "기술 가치 평가사", "안전 관리 총괄"
  ],
  "공공 및 비영리 기관": [
    "정책 자문 위원", "비영리 단체 사무총장", "공공 프로젝트 리더", "거버넌스 전문가",
    "사회적 가치 측정가", "지역 소생 전략가", "공공 행정 혁신가", "대외 협력 본부장"
  ],
  "의료 및 시니어 케어": [
    "헬스케어 기획자", "실버 타운 운영 원장", "디지털 헬스 어드바이저", "요양 서비스 혁신가",
    "의료 경영 고문", "바이오 테크 커넥터", "시니어 라이프 케어 설계사", "커뮤니티 케어 리더"
  ],
  "전통 유통 및 공급망": [
    "물류 혁신 본부장", "온라인 커머스 전략가", "글로벌 소싱 디렉터", "리테일 테크 고문",
    "공급망 리스크 분석가", "라스트 마일 운영 리더", "VMD 및 브랜드 전문가", "유통 채널 최적화 매니저"
  ],
  "교육 및 멘토링 서비스": [
    "대학 교수/강사", "평생 교육 기획자", "지식 플랫폼 크리에이터", "에듀테크 도입 자문",
    "기업 교육 설계자", "커리어 로드맵 컨설턴트", "글로벌 인재 육성 전문가", "교육 행정 전문가"
  ],
  "기술 및 엔지니어링": [
    "기술 이사 (CTO)", "시스템 아키텍트", "R&D 센터장", "기술 가치 전도사 (Evangelist)",
    "보안 전략 책임자", "인프라 고도화 고문", "기술 특허 전략가", "데이터 거버넌스 리더"
  ]
};

const DEFAULT_ROLES = ["총괄 본부장", "수석 고문", "전문직 리더", "대표이사", "기술 이사", "프로젝트 총괄", "변화 관리자", "분야별 전문가"];

const StepRoleInput: React.FC<Props> = ({ selectedIndustry, onNext, onBack }) => {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');
  
  const suggestions = ROLE_SUGGESTIONS[selectedIndustry] || DEFAULT_ROLES;

  const getRoleMeta = (roleName: string) => {
    const defaultMeta = { tag: "전문가 포지션", desc: "AI 기술을 접목해 10배의 생산성을 폭발시킬 수 있는 유망 하이브리드 역할군" };
    
    const metaMap: Record<string, { tag: string; desc: string }> = {
      // 고용 및 인적자원 서비스
      "재취업 지원 전문가": { tag: "경력 하이브리드", desc: "AI 이력서 보정 및 퇴직자 맞춤 전직 연계" },
      "생애설계 상담사": { tag: "라이프 어드바이스", desc: "AI 자산/경력 도구를 결합한 생애 2막 정밀 설계" },
      "커리어 멘토": { tag: "성장 파트너", desc: "빅데이터 전직 추천 모델 및 가이드 제공" },
      "시니어 인력 매칭 매니저": { text: "인적 매칭", name: "시니어 매칭", tag: "인적 매칭", desc: "고숙련 시니어와 중소기업 기술 자문 스마트 연결" },
      "인재 영입 전략가": { tag: "채용 오퍼레이션", desc: "AI 역량 면접 및 최신 예측 전형 최적화 구축" },
      "조직문화 컨설턴트": { tag: "피플 디자인", desc: "AI 워크플레이스 구성원의 온보딩 및 협업 조율" },
      "직업 전환 코치": { tag: "커리어 빌더", desc: "생성형 AI 시대 부상하는 직무 업스킬링 가이드" },
      "HR Tech 도입 전문가": { tag: "시스템 빌더", desc: "인사 평가, 채용 자동화 SaaS 플랫폼 기획 및 이식" },
      
      // 전문 경영 컨설팅
      "전략 기획 고문": { tag: "비즈니스 거시", desc: "시장 예측 AI 및 글로벌 동향 지표 융합 컨설팅" },
      "조직 관리 컨설턴트": { tag: "애자일 혁신", desc: "데이터 대시보드 기반 원격 근무 성과 프레임워크" },
      "변화 관리 전문가": { tag: "체인지 리더십", desc: "신사업 이식 및 구성원의 기술 적응 심리 워크숍 마스터" },
      "사외이사": { tag: "감독 및 회무", desc: "환경/규제 모니터링 시스템 기반 고도 의사결정 배석" },
      "ESG 경영 자문": { tag: "지속가능성", desc: "전력량 및 사회적 성과 빅데이터 정량 지표 감정" },
      "디지털 전환(DX) 리더": { tag: "DX 임팩트", desc: "사내 기간계 시스템과 클라우드/AI 파이프라인 연계 기획" },
      "M&A 통합 전문가": { tag: "M&A 시너지", desc: "재무 가치 및 실사 실적 데이터 시뮬레이션 기반 통합" },
      "리스크 관리 파트너": { tag: "선제 방어", desc: "내부 통제 및 알고리즘 투명성 가우징 예방 시스템" },
      
      // 금융 및 자산 관리
      "PB 센터장": { tag: "고액 자산", desc: "알고리즘 포트폴리오 다각화 및 초개인화 자문 진단" },
      "투자 심사역": { tag: "벤처 투자", desc: "비정형 데이터 분석 및 특허 가치 원천 예측" },
      "자산 승계 컨설턴트": { tag: "헤리티지", desc: "상속/세무 시뮬레이터 적용 차세대 패밀리 승계 가이드" },
      "리스크 관리 책임자": { tag: "금융 안정", desc: "시장 유동성 변화 및 거시 마진 마진콜 조기 경보" },
      "연금 설계 전문가": { tag: "노후 플래닝", desc: "동적 자산 부채 관리 알고리즘을 사용한 은퇴 소득 솔루션" },
      "핀테크 도입 전략가": { tag: "오픈 뱅킹", desc: "인공지능 상담 에이전트 및 연계 결제 플랫폼 통합 기획" },
      "기업 금융 고문": { tag: "자본 유치", desc: "데이터 대시보드 구조의 크레딧 모델 분석 적용" },
      "패밀리 오피스 매니저": { tag: "통합 가문 관리", desc: "장기 보존 글로벌 자산 연계 및 포괄 세제 지원" },
      
      // 고부가가치 제조업
      "공장 운영 총괄": { tag: "스마트 팩토리", desc: "고장을 예견하는 예지보전 시스템 및 MES 통합 마스터" },
      "기술 고문/마이스터": { tag: "노하우 계승", desc: "장인 공정 데이터를 AI 모션 마스킹으로 시스템화" },
      "글로벌 공급망 관리자": { tag: "SCM 보틀넥", desc: "실시간 글로벌 원자재 및 경로 최적화 시뮬레이션 제어" },
      "품질 혁신 리더": { tag: "품질 관리", desc: "비전 AI 불량 검출율 및 Six-Sigma 고품격 검정 리드" },
      "스마트 팩토리 설계자": { tag: "공장 지능화", desc: "자동 로봇 공정 및 디지털 트윈 설계 총괄 기획" },
      "R&D 전략 본부장": { tag: "신물질/특허", desc: "AI 스크리닝 시냅스를 통한 독점 특허 경쟁력 연계" },
      "기술 가치 평가사": { tag: "무형 자산", desc: "원천 특허 빅데이터 통계를 통한 정밀 자산 실사 분석" },
      "안전 관리 총괄": { tag: "재해 예방", desc: "중대재해 예방 센서 및 이상 기원 조기 경보 시스템 운영" },
      
      // 공공 및 비영리 기관
      "정책 자문 위원": { tag: "입법 및 거버넌스", desc: "빅데이터 여론 수집 및 세금 효율 시뮬레이션 정책 입안" },
      "비영리 단체 사무총장": { tag: "기부 고도화", desc: "기부 고객 예측 타겟팅 AI 및 투명한 분산 장부 추적" },
      "공공 프로젝트 리더": { tag: "인프라 기획", desc: "지방 소생 및 도심 유동인구 맵 분석 스마트 의사결정" },
      "거버넌스 전문가": { tag: "행정 신뢰", desc: "공공 알고리즘의 편향을 교정하는 거버넌스 프레임워크 수립" },
      "사회적 가치 측정가": { tag: "ESG 검증", desc: "소셜 임팩트를 정량화하는 고도 계량 분석 가이드" },
      "지역 소생 전략가": { tag: "로컬 혁신", desc: "공공 주택 및 거점 데이터 연계 지속가능형 도시 기획" },
      "공공 행정 혁신가": { tag: "행정 자동화", desc: "민원 챗봇 품질 향상 및 종이 없는 지능형 청사 기획" },
      "대외 협력 본부장": { tag: "글로벌 네트워크", desc: "민관 파트너십 채널 분석 및 데이터 기반 로비 방어 정책" },
      
      // 의료 및 시니어 케어
      "헬스케어 기획자": { tag: "디지털 건강", desc: "웨어러블 센싱 데이터 및 만성 질환 예방 프로그램 빌딩" },
      "실버 타운 운영 원장": { tag: "케어 인프라", desc: "IoT 위급 모니터링 시스템이 융합된 실버 라이프 허브 운영" },
      "디지털 헬스 어드바이저": { tag: "개인 맞춤 건강", desc: "AI 식단 처방 및 개인 수면 모니터링 정합성 고도 진단" },
      "요양 서비스 혁신가": { tag: "실버 테크", desc: "간병 보조 로봇 및 투약 알림 지능화 에이전트 도입" },
      "의료 경영 고문": { tag: "병원 오퍼레이션", desc: "대기 지연 최소화 예약 시뮬레이션 배정 인프라 개선" },
      "바이오 테크 커넥터": { tag: "임상 파이프라인", desc: "신약 플랫폼과 해외 거점 메이저 제약사 파트너링 기획" },
      "시니어 라이프 케어 설계사": { tag: "은퇴 복지", desc: "상조, 재정, 여가를 단일 플랫폼으로 조율하는 개인 맞춤 코칭" },
      "커뮤니티 케어 리더": { tag: "돌봄 네트워크", desc: "소외 계층의 이상 생체 신호를 스마트 연계 치료하는 주거 돌봄" },
      
      // 전통 유통 및 공급망
      "물류 혁신 본부장": { tag: "스마트 유통", desc: "AGV 자율 주행 및 배차 예측 인텔리전트 허브 전술 수립" },
      "온라인 커머스 전략가": { tag: "이커머스 그로스", desc: "개인화 구매 예측 연동 타겟 캠페인 및 장바구니 분석" },
      "글로벌 소싱 디렉터": { tag: "소싱 예측", desc: "국제 해상 물동량 빅데이터 기반 위험 관리 구매 기획" },
      "리테일 테크 고문": { tag: "매장 디지털화", desc: "무인 결제, 스마트 키오스크 및 내부 동선 열지도 진단" },
      "공급망 리스크 분석가": { tag: "회복탄력성", desc: "지정학적 리스크 모델링을 사용한 대체 소싱 체인 분석" },
      "라스트 마일 운영 리더": { tag: "배송 리더십", desc: "드론/퀵커머스 지상 최단 경로 배정 관제 시스템 운영" },
      "VMD 및 브랜드 전문가": { tag: "비주얼 그레이팅", desc: "생성 AI 렌더링 기반 매장 기획 및 시즌 컨셉 시안 초고속 제작" },
      "유통 채널 최적화 매니저": { tag: "채널 성장", desc: "옴니채널 매출 시뮬레이터를 기반으로 한 직영/가맹 마진 배분" },
      
      // 교육 및 멘토링 서비스
      "대학 교수/강사": { tag: "고등 교육", desc: "전공 학문에 커스텀 AI 프롬프트 분석론을 결합한 융합 강의" },
      "평생 교육 기획자": { tag: "직무 리스킬링", desc: "중장년 전직 희망자를 위한 온라인 테크 아카데미 로드맵" },
      "지식 플랫폼 크리에이터": { tag: "콘텐츠 지휘", desc: "AI 기반 멀티미디어 교정 도구로 전문 교육 콘텐츠 빌딩" },
      "에듀테크 도입 자문": { tag: "스마트 러닝", desc: "LMS 기반 기계학습 학습 패턴 분석 결과 학생별 난이도 설계" },
      "기업 교육 설계자": { tag: "임직원 업스킬", desc: "차세대 트렌드 맞춤 직제 진화 연계 사내 프롬프트 해커톤 총괄" },
      "커리어 로드맵 컨설턴트": { tag: "진로 코칭", desc: "AI 포지션 분석 엔진 연동 맞춤 이력서 합격율 시뮬레이팅" },
      "글로벌 인재 육성 전문가": { tag: "글로벌 리버티", desc: "다언어 현지화 세팅 및 멘토 교류 원격 플랫폼 총괄 운영" },
      "교육 행정 전문가": { tag: "스마트 어드민", desc: "학생 등록 및 수납 등 반복 트랜잭션의 RPA 자동화 컨트롤" },
      
      // 기술 및 엔지니어링
      "기술 이사 (CTO)": { tag: "기술 로드맵", desc: "노코드/로우코드 AI 혁신과 개발 아웃소싱 리스크 거버넌스" },
      "시스템 아키텍트": { tag: "시스템 빌더", desc: "대규모 마이크로서비스 및 안정적인 다차원 분산 데이터 최적화" },
      "R&D 센터장": { tag: "신기술 탐색", desc: "차세대 지식 인벤토리 검색 및 원천 IP 보호 특허 관리 리더십" },
      "기술 가치 전도사 (Evangelist)": { tag: "기술 대외 전파", desc: "오픈소스 에코시스템의 성장성 데이터화 및 기술 세미나 런칭" },
      "보안 전략 책임자": { tag: "화이트 해킹", desc: "AI 기반 사이버 피싱 탐지 및 지능형 위협 조기 탐지 차단" },
      "인프라 고도화 고문": { tag: "클라우드 구축", desc: "FinOps 지표 분석을 통한 멀티 클라우드 유연 마이그레이션 도출" },
      "기술 특허 전략가": { tag: "지식 레버리지", desc: "국제 특허 소송 판례 빅데이터 검색 연계 승율 정밀 시뮬레이팅" },
      "데이터 거버넌스 리더": { tag: "데이터 관리", desc: "사내 데이터 레이크의 규범 준수 가이드라인 제정 및 편향 세척" },
      
      // 기본값
      "총괄 본부장": { tag: "조직 관리", desc: "전문화된 조직의 협업 동학을 조율하고 기획 총괄" },
      "수석 고문": { tag: "의사 결정", desc: "풍부한 실무 경험을 기반으로 비즈니스 법률/리스크 대응" },
      "전문직 리더": { tag: "트렌드 지배", desc: "핵심 기술 전문성을 축으로 독점 경쟁 우위 선점" },
      "대표이사": { tag: "거시 전술", desc: "조직 전체의 성장 기회를 규정 및 전사 시너지 기획" },
      "기술 이사": { tag: "엔지니어링", desc: "인텔리전트 빌딩 기술과 차세대 제품 비전 전폭 책임" },
      "프로젝트 총괄": { tag: "딜리버리", desc: "일정과 자원 배분을 스마트 도구를 사용해 원격 통합 제어" },
      "변화 관리자": { tag: "사내 트레이닝", desc: "기술 도입으로 인한 거부감을 심리 케어 워크숍으로 보강" },
      "분야별 전문가": { tag: "융합 수행", desc: "풍부한 도메인 고유 지식으로 AI가 부가적인 가치를 배가" }
    };
    
    return metaMap[roleName] || defaultMeta;
  };

  const toggleRole = (role: string) => {
    setSelectedRoles(prev => prev.includes(role) ? prev.filter(r => r !== role) : [...prev, role]);
  };

  const addCustomRole = () => {
    if (inputValue.trim() && !selectedRoles.includes(inputValue.trim())) {
      setSelectedRoles([...selectedRoles, inputValue.trim()]);
      setInputValue('');
    }
  };

  const removeRole = (role: string) => {
    setSelectedRoles(prev => prev.filter(r => r !== role));
  };

  return (
    <div className="space-y-10 animate-fade-up">
      <button 
        onClick={onBack} 
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-900 transition-colors duration-200 group"
      >
        <ArrowLeft size={14} className="transform group-hover:-translate-x-0.5 transition-transform" />
        <span>이전 단계 (도메인 선택)</span>
      </button>

      <div className="text-center space-y-4">
        <h2 className="text-[#5144e5] uppercase tracking-[0.3em] font-extrabold text-xs">Phase 02. Identity</h2>
        <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight break-keep">당신의 전문 구체 역할은 무엇인가요?</h3>
        <p className="text-sm text-slate-500 font-medium tracking-tight max-w-xl mx-auto break-keep">
          선택한 <span className="text-slate-900 font-bold underline decoration-[#00c3ff] decoration-2 underline-offset-4">{selectedIndustry}</span> 도메인 내에서 기술과 인력의 협업을 이끌어 갈 핵심 직무 역할을 선택해 주십시오. (복수 선택 가능)
        </p>
        <div className="w-12 h-1 bg-gradient-to-r from-[#5144e5] to-[#00c3ff] mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
        {suggestions.map((role) => {
          const isSelected = selectedRoles.includes(role);
          const meta = getRoleMeta(role);
          return (
            <button
              key={role}
              onClick={() => toggleRole(role)}
              className={`p-5 border text-left flex flex-col justify-between group min-h-[175px] transition-all duration-300 rounded-[1.5rem] relative
                ${isSelected 
                  ? 'bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 border-slate-900 shadow-xl ring-2 ring-[#00c3ff]/40 -translate-y-1' 
                  : 'bg-white hover:bg-slate-50/50 border-slate-200/60 hover:border-slate-300 shadow-sm hover:shadow-md hover:-translate-y-0.5'}`}
            >
              <div className="space-y-3.5 w-full">
                <div className="flex justify-between items-center w-full">
                  <span className={`px-2.5 py-0.5 text-[9px] font-bold tracking-tight rounded-full uppercase border transition-all duration-300
                    ${isSelected 
                      ? 'bg-[#00c3ff]/15 text-[#00c3ff] border-[#00c3ff]/30' 
                      : 'bg-slate-100 text-slate-500 border-slate-200/40 group-hover:bg-indigo-50 group-hover:text-[#5144e5] group-hover:border-indigo-150'}`}
                  >
                    {meta.tag}
                  </span>
                  
                  {isSelected ? (
                    <span className="w-5 h-5 rounded-full bg-[#00c3ff] flex items-center justify-center animate-scale-in shadow-[0_0_12px_rgba(0,195,255,0.4)]">
                      <Check size={11} className="text-slate-950 font-black" />
                    </span>
                  ) : (
                    <Star 
                      size={14} 
                      className="text-slate-200 group-hover:text-amber-400 group-hover:fill-amber-350 transition-all duration-200 shrink-0" 
                    />
                  )}
                </div>
                
                <div className="space-y-1.5">
                  <span className={`text-sm font-extrabold break-keep leading-snug block transition-colors duration-300
                    ${isSelected ? 'text-white' : 'text-slate-900 group-hover:text-[#5144e5]'}`}>
                    {role}
                  </span>
                  <p className={`text-[10px] font-semibold leading-relaxed break-keep line-clamp-3 transition-colors duration-300
                    ${isSelected ? 'text-slate-400' : 'text-slate-400 group-hover:text-slate-500'}`}>
                    {meta.desc}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="max-w-2xl mx-auto space-y-8 pt-8 border-t border-slate-200/50">
        {/* Selected Identities Display Section */}
        {selectedRoles.length > 0 && (
          <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 space-y-3 animate-fade-in text-center">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">선택된 역할 ({selectedRoles.length})</h4>
            <div className="flex flex-wrap justify-center gap-1.5">
              {selectedRoles.map((role) => (
                <div 
                  key={role} 
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-slate-900 text-white rounded-xl border border-slate-800 shadow-sm hover:bg-slate-800 transition-colors animate-scale-in"
                >
                  <span className="text-[11px] font-bold">{role}</span>
                  <button 
                    onClick={() => removeRole(role)}
                    className="hover:text-[#00c3ff] text-slate-400 transition-colors shrink-0"
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
            제시된 역할 외 직접 입력 (기타 직함 추가)
          </label>
          <div className="flex gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-md focus-within:border-[#5144e5]/60 focus-within:ring-2 focus-within:ring-[#5144e5]/5 transition-all">
            <div className="pl-4 flex items-center text-slate-300 shrink-0">
              <Search size={16} />
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="직접 입력 시 기입 (예: 시니어 테크 사업 기획 이사)"
              className="flex-1 px-3 py-3 bg-transparent outline-none text-sm font-semibold text-slate-800 placeholder:text-slate-400"
              onKeyDown={(e) => e.key === 'Enter' && addCustomRole()}
            />
            <button
              onClick={addCustomRole}
              className="px-5 py-3 bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-all rounded-xl"
            >
              추가
            </button>
          </div>
        </div>
        
        <div className="pt-4">
          <button
            disabled={selectedRoles.length === 0}
            onClick={() => onNext(selectedRoles.join(', '))}
            className={`w-full py-4.5 font-bold text-sm shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl flex items-center justify-center gap-2
              ${selectedRoles.length === 0 
                ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' 
                : 'bg-[#5144e5] hover:bg-[#2e3192] text-white active:scale-99'}`}
          >
            <span>다음 단계: 핵심 전문 과업 선택 ({selectedRoles.length})</span>
            <Sparkles size={14} className="text-amber-300 animate-pulse" />
          </button>
        </div>
      </div>
      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.85); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scaleIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.1) forwards;
        }
        .animate-fade-in {
          animation: fadeUp 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default StepRoleInput;
