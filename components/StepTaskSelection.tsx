
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Check, Search, Cpu, X, TrendingUp, Sparkles } from 'lucide-react';

interface Props {
  role: string;
  generatedTasks: string[];
  onNext: (selectedTasks: string[]) => void;
  onBack: () => void;
}

const StepTaskSelection: React.FC<Props> = ({ role, generatedTasks, onNext, onBack }) => {
  const [allTasks, setAllTasks] = useState<string[]>([]);
  const [selected, setSelected] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    setAllTasks(generatedTasks);
  }, [generatedTasks]);

  const toggleTask = (task: string) => {
    setSelected(prev => prev.includes(task) ? prev.filter(t => t !== task) : [...prev, task]);
  };

  const addCustomTask = () => {
    const trimmed = inputValue.trim();
    if (trimmed) {
      if (!allTasks.includes(trimmed)) {
        setAllTasks(prev => [...prev, trimmed]);
      }
      if (!selected.includes(trimmed)) {
        setSelected(prev => [...prev, trimmed]);
      }
      setInputValue('');
    }
  };

  const removeTask = (task: string) => {
    setSelected(prev => prev.filter(t => t !== task));
  };

  return (
    <div className="space-y-10 animate-fade-up">
      <button 
        onClick={onBack} 
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-900 transition-colors duration-200 group"
      >
        <ArrowLeft size={14} className="transform group-hover:-translate-x-0.5 transition-transform" />
        <span>이전 단계 (역할 선택)</span>
      </button>

      <div className="text-center space-y-4">
        <h2 className="text-[#5144e5] uppercase tracking-[0.3em] font-extrabold text-xs">Phase 03. Competency</h2>
        <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight break-keep">당신의 핵심 전문 과업은 무엇입니까?</h3>
        <div className="flex items-center justify-center gap-2 text-slate-500 max-w-xl mx-auto break-keep">
          <TrendingUp size={16} className="text-[#00c3ff] shrink-0" />
          <p className="text-sm font-medium leading-relaxed">
            채용 가이드 분석에 기반해, <span className="text-slate-900 font-bold">{role}</span> 직위에서 직면하게 될 대표 핵심 과업 리스트입니다. 귀하가 현재 주력하여 강점을 발휘하고 계신 역량을 선택해 주십시오.
          </p>
        </div>
        <div className="w-12 h-1 bg-gradient-to-r from-[#5144e5] to-[#00c3ff] mx-auto rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
        {allTasks.length > 0 ? (
          allTasks.map((task, idx) => {
            const isSelected = selected.includes(task);
            const isCustom = !generatedTasks.includes(task);
            return (
              <button
                key={idx}
                onClick={() => toggleTask(task)}
                className={`p-5.5 border rounded-2xl text-left flex gap-3.5 items-start transition-all duration-300 relative group
                  ${isSelected 
                    ? 'bg-gradient-to-b from-slate-900 to-slate-950 border-slate-900 shadow-xl ring-2 ring-[#00c3ff]/20 -translate-y-0.5' 
                    : 'bg-white border-slate-100 hover:border-slate-300 shadow-sm hover:shadow-md'}`}
              >
                <div className={`mt-0.5 w-5 h-5 border flex items-center justify-center flex-shrink-0 transition-all duration-300 rounded-md
                  ${isSelected ? 'bg-[#00c3ff] border-[#00c3ff]' : 'bg-slate-50 border-slate-200 group-hover:border-slate-450'}`}>
                  {isSelected && <Check size={12} className="text-slate-950 font-black" />}
                </div>
                <div className="space-y-1 flex-1">
                  <span className={`text-sm font-bold leading-snug tracking-tight block break-keep ${isSelected ? 'text-white' : 'text-slate-800'}`}>
                    {task}
                  </span>
                  {isCustom && (
                    <span className="inline-block text-[9px] font-bold uppercase text-[#00c3ff] bg-white/10 px-1.5 py-0.5 rounded tracking-wider">User Added</span>
                  )}
                </div>
              </button>
            );
          })
        ) : (
          <div className="col-span-full py-20 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col items-center gap-4 text-slate-400">
            <Cpu size={36} className="animate-pulse text-indigo-400" />
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">핵심 과업 데이터를 선별 분석하고 있습니다...</p>
          </div>
        )}
      </div>

      <div className="max-w-3xl mx-auto space-y-8 pt-8 border-t border-slate-200/50">
        {/* Selected Tasks Badges */}
        {selected.length > 0 && (
          <div className="bg-slate-50/50 p-5 rounded-2xl border border-slate-100 space-y-3 animate-fade-in text-center">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">선택된 역량/과업 ({selected.length})</h4>
            <div className="flex flex-wrap justify-center gap-1.5">
              {selected.map((task) => (
                <div key={task} className="flex items-center gap-1.5 px-3.5 py-1.5 bg-white border border-slate-200 rounded-xl shadow-sm hover:bg-slate-50 transition-colors animate-scale-in">
                  <span className="text-[11px] font-semibold text-slate-800">{task}</span>
                  <button onClick={(e) => {e.stopPropagation(); removeTask(task);}} className="text-slate-400 hover:text-red-500 transition-colors shrink-0">
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-3">
          <label className="block text-[11px] font-bold text-slate-400 uppercase tracking-wider text-center">
            목록 외 기타 전문 과업 직접 추가
          </label>
          <div className="flex gap-2 p-1.5 bg-white border border-slate-200 rounded-2xl shadow-md focus-within:border-[#5144e5]/60 focus-within:ring-2 focus-within:ring-[#5144e5]/5 transition-all">
            <div className="pl-4 flex items-center text-slate-300 shrink-0">
              <Search size={16} />
            </div>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="예: 실시간 AI 모델링 결과 검증 및 수동 보정 가이드라인 수립"
              className="flex-1 px-3 py-3 bg-transparent outline-none text-sm font-semibold text-slate-800 placeholder:text-slate-400"
              onKeyDown={(e) => e.key === 'Enter' && addCustomTask()}
            />
            <button 
              onClick={addCustomTask} 
              className="px-5 py-3 bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 rounded-xl transition-all"
            >
              추가
            </button>
          </div>
        </div>
        
        <button
          onClick={() => onNext(selected)}
          disabled={selected.length < 1}
          className={`w-full py-4.5 font-bold text-sm shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl flex items-center justify-center gap-2
            ${selected.length < 1 
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' 
              : 'bg-[#5144e5] hover:bg-[#2e3192] text-white active:scale-99'}`}
        >
          <span>AI 생존 분석 및 맞춤형 레포트 생성하기 ({selected.length}개 과업 기반)</span>
          <Sparkles size={14} className="text-amber-300 animate-pulse animate-bounce" />
        </button>
      </div>
      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-scale-in {
          animation: scaleIn 0.25s cubic-bezier(0.175, 0.885, 0.32, 1.1) forwards;
        }
      `}</style>
    </div>
  );
};

export default StepTaskSelection;
