
import React, { useEffect, useState } from 'react';
import { Activity, ShieldAlert, Library, Cpu, FileCheck } from 'lucide-react';

const MESSAGES = [
  "전체 커리어 로그 검색 및 구조적 특징 스캐닝 중...",
  "각 단위 직무 핵심 과업별 AI 자동화 치환율 산정 중...",
  "채용 데이터셋 기반 생존 도구 매니페스트 검색 중...",
  "연차별 중장기 독보적 성장 액션 로드맵 컴파일 중...",
  "개인 맞춤형 최적 생존 전략 리포트 최종 완성 중..."
];

const LoadingScreen: React.FC = () => {
  const [msgIndex, setMsgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => setMsgIndex((prev) => (prev + 1) % MESSAGES.length), 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 bg-slate-950 z-50 flex flex-col items-center justify-center text-white px-6">
      
      {/* Visual Scanning Effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(81,68,229,0.08)_0%,transparent_65%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:3rem_3rem]"></div>
      
      <div className="relative mb-12">
        {/* Outer Rotating Gear */}
        <div className="w-28 h-28 border-2 border-dashed border-[#00c3ff]/30 rounded-full animate-spin [animation-duration:15s] flex items-center justify-center"></div>
        {/* Inner Spinning Ring */}
        <div className="absolute inset-2 border-2 border-t-[#5144e5] border-r-transparent border-b-[#00c3ff] border-l-transparent rounded-full animate-spin"></div>
        
        {/* Core Icon */}
        <div className="absolute inset-4 bg-slate-900 rounded-full flex items-center justify-center border border-white/5 shadow-inner">
          <Activity size={28} className="text-[#00c3ff] animate-pulse" />
        </div>
      </div>
      
      <div className="text-center space-y-4 max-w-lg z-10 relative">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00c3ff] animate-ping"></span>
          <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Platinum Career Engine</span>
        </div>
        <div className="space-y-1.5">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest">실시간 경력 분석 자율 설계 중</h3>
          <p className="text-base md:text-lg font-bold text-white transition-all duration-500 h-10 break-keep leading-relaxed">{MESSAGES[msgIndex]}</p>
        </div>
      </div>
      
      <div className="w-56 h-1 bg-white/5 border border-white/5 rounded-full relative overflow-hidden mt-6">
        <div className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#5144e5] to-[#00c3ff] w-1/3 rounded-full animate-progress-indeterminate"></div>
      </div>

      <style>{`
        @keyframes progress-indet {
          0% { transform: translateX(-150%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(250%); }
        }
        .animate-progress-indeterminate {
          animation: progress-indet 1.8s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
