
import React from 'react';
import { 
  Award, ChevronRight, Users, Compass, TrendingUp, 
  Cpu, Landmark, HeartPulse, Truck, GraduationCap, Code2 
} from 'lucide-react';

interface Props {
  onNext: (industry: string) => void;
}

const INDUSTRIES = [
  { name: "고용 및 인적자원 서비스", icon: Users, desc: "HR, 채용 및 커리어 컨설팅 도메인" },
  { name: "전문 경영 컨설팅", icon: Compass, desc: "경영 자문, 전략 기획 및 변화 관리" },
  { name: "금융 및 자산 관리", icon: TrendingUp, desc: "PB, 리스크 전술 및 핀테크 자산 관리" },
  { name: "고부가가치 제조업", icon: Cpu, desc: "스마트 공정, R&D 기획 및 기술 고도화" },
  { name: "공공 및 비영리 기관", icon: Landmark, desc: "행정 혁신, 대외 정부 협력 및 비영리 재단" },
  { name: "의료 및 시니어 케어", icon: HeartPulse, desc: "헬스케어 비즈니스 및 시니어 홈 테크" },
  { name: "전통 유통 및 공급망", icon: Truck, desc: "물류 풀필먼트, 리테일 및 글로벌 소싱" },
  { name: "교육 및 멘토링 서비스", icon: GraduationCap, desc: "에듀테크 매치메이킹, 사내 인재 육성 전략" },
  { name: "기술 및 엔지니어링", icon: Code2, desc: "CTO 오피스, 인프라 및 핵심 데이터 거버넌스" }
];

const StepIndustry: React.FC<Props> = ({ onNext }) => {
  const [customIndustry, setCustomIndustry] = React.useState('');

  return (
    <div className="space-y-12 animate-fade-up">
      <div className="text-center space-y-4">
        <div className="flex justify-center mb-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#2e3192] to-[#5144e5] p-0.5 shadow-lg select-none">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <Award size={26} className="text-[#5144e5]" />
            </div>
          </div>
        </div>
        <h2 className="text-[#5144e5] uppercase tracking-[0.3em] font-extrabold text-xs">Phase 01. Domain</h2>
        <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight break-keep">당신의 전문 분야는 어디입니까?</h3>
        <p className="text-slate-500 text-sm font-medium max-w-md mx-auto break-keep">
          귀하의 핵심 역량과 경험이 주로 축적되어 온 주요 비즈니스 도메인을 선택해 주십시오.
        </p>
        <div className="w-12 h-1 bg-gradient-to-r from-[#5144e5] to-[#00c3ff] mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
        {INDUSTRIES.map((ind) => {
          const IconComponent = ind.icon;
          return (
            <button
              key={ind.name}
              onClick={() => onNext(ind.name)}
              className="p-6 bg-white border border-slate-100 hover:border-[#00c3ff]/50 hover:shadow-[0_20px_40px_-16px_rgba(15,23,42,0.08)] rounded-2xl transition-all duration-300 text-left group flex flex-col justify-between h-44 shadow-sm"
            >
              <div className="space-y-3 w-full">
                <div className="p-3 bg-slate-50 text-slate-500 group-hover:bg-[#5144e5]/15 group-hover:text-[#5144e5] rounded-xl w-fit transition-colors duration-300">
                  <IconComponent size={20} />
                </div>
                <div className="space-y-1">
                  <span className="font-bold text-slate-900 text-base block break-keep leading-tight">{ind.name}</span>
                  <span className="text-[11px] text-slate-400 block line-clamp-2 leading-relaxed">{ind.desc}</span>
                </div>
              </div>
              <div className="flex justify-end w-full">
                <ChevronRight size={18} className="text-slate-300 group-hover:text-[#00c3ff] transform group-hover:translate-x-1.5 transition-all duration-300" />
              </div>
            </button>
          )
        })}
      </div>

      <div className="max-w-2xl mx-auto pt-10 border-t border-slate-200/50">
        <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-3 text-center">직접 입력 (Other Domain)</label>
        <div className="flex gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-md focus-within:border-[#5144e5]/60 focus-within:ring-2 focus-within:ring-[#5144e5]/5 transition-all duration-200">
          <input
            type="text"
            value={customIndustry}
            onChange={(e) => setCustomIndustry(e.target.value)}
            placeholder="제시된 도메인 외 직접 입력 (예: 법률 서비스, 문화 예술 등)"
            className="flex-1 px-5 py-3.5 bg-transparent outline-none text-sm font-semibold text-slate-800 placeholder:text-slate-400"
            onKeyDown={(e) => e.key === 'Enter' && customIndustry.trim() && onNext(customIndustry)}
          />
          <button
            disabled={!customIndustry.trim()}
            onClick={() => onNext(customIndustry)}
            className="px-8 py-3.5 bg-slate-950 text-white text-xs font-bold tracking-wider hover:bg-[#5144e5] hover:text-white transition-all disabled:opacity-30 disabled:bg-slate-100 disabled:text-slate-400 rounded-xl"
          >
            확인
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepIndustry;
