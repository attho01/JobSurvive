
import React, { useState, useEffect } from 'react';
import { 
  Lock, ArrowRight, ExternalLink, HelpCircle, Sparkles, 
  Globe, ListOrdered, ShieldCheck, CheckCircle2
} from 'lucide-react';

interface Props {
  onStart: (apiKey: string) => void;
}

const LandingPage: React.FC<Props> = ({ onStart }) => {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const cachedKey = localStorage.getItem('jobsurvive_api_key');
    if (cachedKey) {
      setApiKey(cachedKey);
    }
  }, []);

  /**
   * 사용자 요청 로직에 따른 API 키 검증 (handleVerify)
   */
  const handleVerify = async (key: string) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // 1. 표준 엔드포인트 사용 (시스템 지침에 따라 gemini-3-flash-preview로 모델명 최적화)
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${key}`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "ping" }] }],
          generationConfig: {
            // 구글 REST API 표준 필드명 사용
            maxOutputTokens: 1
          }
        })
      });

      // 2. 성공 조건 완화: response.ok 이면 즉시 통과
      if (response.ok) {
        setIsSuccess(true);
        localStorage.setItem('jobsurvive_api_key', key);
        
        // 0.5초 내외의 빠른 화면 전환 애니메이션
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            onStart(key);
          }, 200);
        }, 300);
        return;
      }

      // 3. 실패 시 에러 처리
      const errorData = await response.json().catch(() => ({}));
      console.error("Verification Failed:", response.status, errorData);
      throw new Error("유효하지 않은 API 키입니다.");

    } catch (err: any) {
      setError(err.message || "API 키 검증에 실패했습니다.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      handleVerify(apiKey.trim());
    }
  };

    return (
    <div className={`min-h-screen bg-slate-50 flex items-center justify-center p-4 md:p-12 font-sans text-slate-900 transition-opacity duration-300 relative overflow-hidden ${isExiting ? 'opacity-0' : 'opacity-100'}`}>
      
      {/* Background Decorative Gradients */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-[#5144e5]/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[#00c3ff]/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none"></div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch relative z-10">
        
        {/* Left Section: Main Hero Card */}
        <div className="lg:col-span-7 bg-white/90 backdrop-blur-md rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(15,23,42,0.06)] border border-slate-100 flex flex-col p-8 md:p-16 relative overflow-hidden transition-all duration-300 hover:shadow-[0_48px_80px_-24px_rgba(15,23,42,0.09)]">
          <div className="relative z-10 flex flex-col h-full justify-between">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-slate-950 text-white rounded-full text-[10px] font-bold tracking-[0.2em] mb-10 shadow-md">
                <Sparkles size={11} className="text-apex-cyan animate-pulse" /> PLATINUM CAREER LAB
              </div>
              
              <h1 className="text-[38px] md:text-[54px] font-black text-slate-950 mb-6 leading-[1.12] tracking-tight break-keep">
                AI 시대,<br />
                <span className="bg-gradient-to-r from-[#2e3192] via-[#5144e5] to-[#00c3ff] bg-clip-text text-transparent">당신의 직업은 안전하십니까?</span>
              </h1>
              
              <p className="text-base text-slate-500 mb-10 max-w-md break-keep font-medium leading-relaxed">
                JobSurvive.AI를 활용해 AI 시대 직업의 생존 위험도와 핵심 과업의 자동화 위협도를 심층 분석하고, 미래 직무 도구 및 최적화된 생존 로드맵을 설계받으세요.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-4 max-w-md w-full">
              <div className="space-y-1">
                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block px-1">Gemini API Key</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                    {isSuccess ? (
                      <CheckCircle2 className="text-emerald-500" size={18} />
                    ) : (
                      <Lock className={`transition-colors ${error ? 'text-red-500' : 'text-slate-400'}`} size={18} />
                    )}
                  </div>
                  <input
                    type="password"
                    value={apiKey}
                    onChange={(e) => { setApiKey(e.target.value); if(error) setError(null); }}
                    disabled={isLoading || isSuccess}
                    placeholder="AI Studio에서 발급받은 비밀키(AI_KEY)를 입력하세요"
                    className={`w-full pl-12 pr-5 py-4.5 bg-slate-50 border-2 rounded-2xl outline-none transition-all text-slate-800 font-bold text-sm tracking-wide ${
                      isSuccess 
                        ? 'border-emerald-500 bg-emerald-50/50 text-emerald-800' 
                        : error 
                        ? 'border-red-400 bg-red-50/50 text-red-900 focus:border-red-500' 
                        : 'border-slate-100 hover:border-slate-200 focus:border-[#5144e5] focus:bg-white focus:shadow-sm'
                    }`}
                  />
                </div>
              </div>
              
              {error && (
                <div className="bg-red-50/70 border border-red-100 rounded-xl p-3.5 flex items-start gap-2.5 animate-shake">
                  <ShieldCheck size={16} className="text-red-500 shrink-0 mt-0.5" />
                  <p className="text-red-600 text-xs font-semibold leading-normal break-keep">{error}</p>
                </div>
              )}

              <button 
                type="submit"
                disabled={isLoading || isSuccess || !apiKey}
                className={`w-full py-4 rounded-2xl font-bold text-base flex items-center justify-center gap-2.5 transition-all shadow-lg active:scale-98 ${
                  isSuccess 
                    ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200/50' 
                    : isLoading 
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none' 
                    : !apiKey 
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'
                    : 'bg-[#2e3192] hover:bg-[#5144e5] text-white hover:shadow-[#5144e5]/20'
                }`}
              >
                <span>{isSuccess ? "인증 성공! 분석 시작" : isLoading ? "보안 검증 중..." : "커리어 엔진 가동"}</span>
                {!isLoading && !isSuccess && <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />}
              </button>
            </form>
          </div>
        </div>

        {/* Right Section: API Key Instructions */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="bg-slate-900 p-8 md:p-12 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(15,23,42,0.2)] text-white border border-slate-800 relative overflow-hidden flex flex-col h-full justify-between">
            
            <div>
              <h2 className="text-xl font-bold mb-8 flex items-center gap-3">
                <div className="p-2 bg-slate-800/80 rounded-xl border border-slate-700/50">
                  <ListOrdered className="text-indigo-400" size={20} />
                </div>
                <span>API 키 발급 안내</span>
              </h2>
              
              <div className="space-y-8">
                {/* Step 1 */}
                <div className="flex gap-4 items-start relative group">
                  <div className="w-8 h-8 shrink-0 bg-slate-800 rounded-full flex items-center justify-center font-bold text-sm text-indigo-400 border border-slate-700/50 shadow-sm">1</div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold flex items-center gap-1.5 text-white">
                      <a 
                        href="https://aistudio.google.com/app/apikey" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-indigo-400 transition-colors flex items-center gap-1.5 group/link"
                      >
                        Google AI Studio 접속 
                        <ExternalLink size={12} className="opacity-40 group-hover/link:opacity-100 transition-opacity" />
                      </a>
                    </h3>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed break-keep">
                      구글 계정으로 로그인 후 API 키 발급 화면으로 이동합니다.
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-4 items-start relative group">
                  <div className="w-8 h-8 shrink-0 bg-slate-800 rounded-full flex items-center justify-center font-bold text-sm text-indigo-400 border border-slate-700/50 shadow-sm">2</div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white">API 키 생성 (무료)</h3>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed break-keep">
                      두 종류의 옵션 중 <code className="text-emerald-400 bg-slate-850 px-1 py-0.5 rounded text-[11px] font-mono font-normal">Create API Key in new project</code>를 선택하세요.
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-4 items-start relative group">
                  <div className="w-8 h-8 shrink-0 bg-slate-800 rounded-full flex items-center justify-center font-bold text-sm text-indigo-400 border border-slate-700/50 shadow-sm">3</div>
                  <div className="space-y-1">
                    <h3 className="text-sm font-bold text-white">키 복사 및 입력</h3>
                    <p className="text-xs text-slate-400 font-medium leading-relaxed break-keep">
                      생성된 키 값(AIzaSy...)을 복사하여 왼쪽 폼에 입력하면 커리어 전용 진단 도구를 무료로 가동할 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 p-5 bg-white/5 rounded-2xl border border-white/5 backdrop-blur-sm">
              <p className="text-[11px] text-slate-400 leading-relaxed font-medium break-keep">
                * 입력한 API 키는 어떠한 외부 서버에도 수집되거나 기록되지 않고, 전적으로 사용자 브라우저의 로컬에만 안전하게 보존됩니다.
              </p>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-4px); } 75% { transform: translateX(4px); } }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}</style>
    </div>
  );
};

export default LandingPage;
