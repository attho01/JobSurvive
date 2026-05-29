import React, { useState } from 'react';
import { AnalysisResult, RoadmapPhase } from '../types';
import { 
  RadialBarChart, RadialBar, PolarAngleAxis, ResponsiveContainer
} from 'recharts';
import { 
  TrendingUp, ChevronRight, Star, ExternalLink, Youtube, Globe, Cpu, Layout, Target, BookOpen, AlertCircle, Sparkles, RefreshCw, Check, Download, Calendar, Layers, Clock, Award, Terminal, ChevronDown, ChevronUp
} from 'lucide-react';

interface Props {
  data: AnalysisResult;
  onReset: () => void;
}

const Dashboard: React.FC<Props> = ({ data, onReset }) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'roadmap' | 'tools'>('dashboard');
  const [activeRoadmapKey, setActiveRoadmapKey] = useState<'month3' | 'month6' | 'month12'>('month3');
  const [showAllRoadmap, setShowAllRoadmap] = useState<boolean>(false);
  const [expandedRow, setExpandedRow] = useState<number | null>(0);
  const [checkedActions, setCheckedActions] = useState<Record<string, boolean>>({});
  const [ratings, setRatings] = useState({ accuracy: 0, usefulness: 0 });
  const [isFeedbackSubmitted, setIsFeedbackSubmitted] = useState(false);

  const scoreValue = data.survivalScore?.score || 0;
  const scoreData = [
    { name: 'Survival', value: scoreValue, fill: 'url(#gradientScore)' }
  ];

  const getPhaseData = (key: string): RoadmapPhase | undefined => {
    return data.roadmap?.[key as keyof typeof data.roadmap];
  };

  const currentPhase = getPhaseData(activeRoadmapKey);

  const toggleAction = (key: string) => {
    setCheckedActions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full -mt-10 animate-fade-up">
      {/* CSS Styles for High-Fidelity PDF Printing */}
      <style>{`
        @media print {
          /* Hide non-printable components */
          .no-print, .print-hidden, nav, button, footer, .feedback-section {
            display: none !important;
          }
          
          /* Full width and reset background colors */
          body, html, #root {
            background: #ffffff !important;
            color: #0f172a !important;
            font-family: system-ui, -apple-system, sans-serif !important;
          }
          
          /* Page Margin setup */
          @page {
            margin: 1.8cm 1.5cm 1.8cm 1.5cm;
            size: A4 portrait;
          }
          
          /* Expand all tabs of the Dashboard into a unified chronological paper brief */
          .print-section {
            display: block !important;
            opacity: 1 !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
            margin-bottom: 2.5rem !important;
          }
          
          .print-break-before {
            page-break-before: always !important;
            break-before: page !important;
          }
          
          .print-full-view {
            display: block !important;
          }
          
          /* Convert interactive elements to static readable styles */
          .print-grid-tools {
            display: grid !important;
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
            gap: 1.5rem !important;
          }
          
          .print-grid-pivots {
            display: grid !important;
            grid-template-columns: repeat(3, minmax(0, 1fr)) !important;
            gap: 1.25rem !important;
          }
          
          .print-grid-roadmap {
            display: grid !important;
            grid-template-columns: repeat(1, minmax(0, 1fr)) !important;
            gap: 2rem !important;
          }
          
          /* Make colors high-contrast for physical ink or standard rendering */
          .text-slate-400, .text-slate-500 {
            color: #475569 !important;
          }
          
          .bg-slate-900, .bg-slate-950 {
            background-color: #0f172a !important;
            color: #ffffff !important;
          }
          
          .border-slate-100, .border-slate-205 {
            border-color: #cbd5e1 !important;
          }
        }
      `}</style>

      {/* 1. Platinum Hero Header */}
      <header className="bg-gradient-to-br from-slate-900 via-slate-950 to-[#1e1b4b] text-white py-16 px-6 rounded-[2.5rem] mb-10 shadow-[0_24px_48px_-12px_rgba(15,23,42,0.15)] relative overflow-hidden">
        {/* Glowing Ambient Drops */}
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#5144e5]/10 rounded-full -mr-48 -mt-48 blur-[80px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-[20%] w-[300px] h-[300px] bg-[#00c3ff]/10 rounded-full blur-[60px] pointer-events-none"></div>
        
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
          <div className="space-y-5 text-center md:text-left flex-1 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              <Sparkles size={11} className="text-[#00c3ff]" />
              <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-slate-300">AI Era Career Security Report</span>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-[#00c3ff] font-extrabold text-sm tracking-widest uppercase">Job Survival Assessment</h2>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-tight">선택 직무<br /><span className="bg-gradient-to-r from-white via-slate-200 to-[#00c3ff] bg-clip-text text-transparent">종합 직업 생존 리포트</span></h1>
            </div>
            <p className="text-slate-350 max-w-xl text-xs md:text-sm leading-relaxed font-medium break-keep">
              {data.survivalScore?.explanation || "매칭 데이터와 최신 AI 트렌드를 조합해 분석한 귀하의 직무 지속 가능성 스코어 및 맞춤 해설 정보가 로드되었습니다."}
            </p>

            <div className="pt-2 flex flex-wrap justify-center md:justify-start gap-3 no-print">
              <button 
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00c3ff] hover:bg-white text-slate-950 font-bold text-xs rounded-xl shadow-lg hover:shadow-xl hover:scale-102 active:scale-98 transition-all duration-200 cursor-pointer"
              >
                <Download size={14} />
                <span>PDF 리포트 다운로드</span>
              </button>
              <button 
                onClick={onReset}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl transition-all duration-200"
              >
                <RefreshCw size={13} />
                <span>다시 진단하기</span>
              </button>
            </div>
          </div>
          
          {/* Circular Score Gauge */}
          <div className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center bg-slate-950/30 rounded-full border border-white/5 backdrop-blur-sm shadow-2xl shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="72%" outerRadius="100%" barSize={10} data={scoreData} startAngle={90} endAngle={450}>
                <defs>
                  <linearGradient id="gradientScore" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#5144e5" />
                    <stop offset="100%" stopColor="#00c3ff" />
                  </linearGradient>
                </defs>
                <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
                <RadialBar background={{ fill: 'rgba(255,255,255,0.04)' }} dataKey="value" cornerRadius={10} />
              </RadialBarChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center select-none text-center">
              <span className="text-4xl md:text-6xl font-black bg-gradient-to-b from-white to-slate-200 bg-clip-text text-transparent leading-none tracking-tighter">
                {scoreValue}
              </span>
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#00c3ff] font-bold mt-2">Survival Rating</span>
            </div>
          </div>
        </div>
      </header>

      {/* 2. Floating Pill Tab Navigation (Hidden in PDF Print) */}
      <div className="max-w-md mx-auto px-4 mb-10 no-print">
        <nav className="flex bg-slate-900 border border-slate-800 p-1 rounded-2xl shadow-xl justify-between">
          {[
            { id: 'dashboard', label: '진단 결과' },
            { id: 'roadmap', label: '생존 로드맵' },
            { id: 'tools', label: '필수 도구' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-3 text-xs font-bold transition-all duration-300 rounded-xl relative text-center cursor-pointer
                ${activeTab === tab.id 
                  ? 'text-slate-950 bg-[#00c3ff] shadow-lg shadow-[#00c3ff]/10 font-bold' 
                  : 'text-slate-400 hover:text-white'}`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* ---------------------------------------------------- */}
      {/* SCREEN DISPLAY ONLY VIEW (RESPONSIVE INTERACTIVE TABBING) */}
      {/* ---------------------------------------------------- */}
      <main className="max-w-5xl mx-auto px-4 pb-16 min-h-[500px] print-hidden print:hidden">
        
        {/* DASHBOARD TAB (진단 결과) */}
        {activeTab === 'dashboard' && (
          <div className="space-y-12 animate-fade-up">
            
            {/* Table Section */}
            <section className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-l-4 border-[#5144e5] pl-3">
                <div className="flex items-center gap-3">
                  <TrendingUp className="text-[#5144e5]" size={20} />
                  <h3 className="text-lg md:text-xl font-bold tracking-tight text-slate-900">핵심 직무 과업별 자동화 위험도 진단</h3>
                </div>
                <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                  💡 행을 클릭하면 상세 AI 대체 위협 분석이 열립니다
                </span>
              </div>
              
              <div className="bg-white border border-slate-100 rounded-3xl shadow-xl shadow-slate-100/50 overflow-hidden">
                <div className="overflow-x-auto text-slate-800">
                  <table className="w-full text-left border-collapse min-w-[800px]">
                    <thead>
                      <tr className="bg-slate-900 text-white text-xs font-bold uppercase tracking-wider">
                        <th className="px-6 py-4.5 rounded-tl-3xl w-1/3">주요 과업 (Task)</th>
                        <th className="px-6 py-4.5 w-1/6">자동화 위험 수준</th>
                        <th className="px-6 py-4.5 w-1/6">AI 협업 시너지</th>
                        <th className="px-6 py-4.5 rounded-tr-3xl w-1/3">전략적 실행 제언</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {data.impactTable?.map((item, idx) => {
                        const scoreLower = item.automationRisk.toLowerCase();
                        const isHigh = scoreLower.includes('high') || scoreLower.includes('높음');
                        const isMed = scoreLower.includes('med') || scoreLower.includes('보통') || scoreLower.includes('medium');
                        
                        const riskText = isHigh ? "높음 (High)" : isMed ? "보통 (Medium)" : "낮음 (Low)";
                        const progressBg = isHigh ? 'bg-rose-500' : isMed ? 'bg-amber-500' : 'bg-emerald-500';
                        const progressWidth = isHigh ? 'w-11/12' : isMed ? 'w-1/2' : 'w-1/4';

                        const isRowExpanded = expandedRow === idx;

                        return (
                          <React.Fragment key={idx}>
                            <tr 
                              onClick={() => setExpandedRow(isRowExpanded ? null : idx)}
                              className={`cursor-pointer hover:bg-slate-50/70 transition-all border-slate-100
                                ${isRowExpanded ? 'bg-slate-50/50' : ''}`}
                            >
                              <td className="px-6 py-5 font-bold text-slate-900 text-sm max-w-xs break-keep">
                                <div className="flex items-center gap-2">
                                  {isRowExpanded ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
                                  <span>{item.task}</span>
                                </div>
                              </td>
                              <td className="px-6 py-5">
                                <div className="space-y-1.5 max-w-[140px]">
                                  <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded inline-block uppercase text-white
                                    ${isHigh ? 'bg-rose-500' : isMed ? 'bg-amber-500' : 'bg-emerald-500'}`}>
                                    {riskText}
                                  </span>
                                  <div className="w-24 h-1.5 bg-slate-100 overflow-hidden rounded-full block">
                                    <div className={`h-full ${progressBg} ${progressWidth}`} />
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-5">
                                <span className="text-[10px] font-bold text-[#5144e5] bg-[#5144e5]/10 px-2.5 py-1 rounded-full uppercase tracking-wider border border-[#5144e5]/15 whitespace-nowrap">
                                  Synergize {item.aiCollaboration}
                                </span>
                              </td>
                              <td className="px-6 py-5 text-xs text-slate-500 leading-relaxed font-medium max-w-sm break-keep">
                                {item.notes}
                              </td>
                            </tr>

                            {/* Collapsible Technology Impact Grid */}
                            {isRowExpanded && (
                              <tr className="bg-[#f8fafc]/60 border-t-0 border-b border-slate-100">
                                <td colSpan={4} className="px-8 py-5">
                                  <div className="grid grid-cols-1 md:grid-cols-12 gap-5 text-slate-700 animate-fade-in">
                                    <div className="space-y-1.5 md:col-span-3">
                                      <span className="font-extrabold text-slate-400 block uppercase tracking-wider text-[9px]">과업 성격 및 분류</span>
                                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900 text-white font-bold text-[10px] tracking-tight">
                                        <Layers size={11} className="text-[#00c3ff]" />
                                        <span>{item.type || '하이브리드 대응'}</span>
                                      </span>
                                    </div>
                                    <div className="space-y-1.5 md:col-span-4">
                                      <span className="font-extrabold text-slate-400 block uppercase tracking-wider text-[9px]">대표 연계 AI 도구</span>
                                      <div className="flex flex-wrap gap-1.5">
                                        {item.keyTools?.split(',').map((t, tIdx) => (
                                          <span key={tIdx} className="px-2 py-0.5 rounded border border-slate-200 bg-white text-slate-700 font-bold text-[10px]">
                                            {t.trim()}
                                          </span>
                                        )) || <span className="text-slate-400 text-xs">AI 추천 진행중</span>}
                                      </div>
                                    </div>
                                    <div className="space-y-1.5 md:col-span-5">
                                      <span className="font-extrabold text-slate-500 block uppercase tracking-wider text-[9px]">상세 기술적 영향 및 최신 트렌드</span>
                                      <p className="text-xs text-slate-600 leading-relaxed font-semibold break-keep italic">
                                        "{item.techImpact}"
                                      </p>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </React.Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Strategic Pivot Roadmap */}
            <section className="bg-slate-900 p-8 md:p-12 text-white rounded-[2.5rem] relative overflow-hidden shadow-2xl border border-slate-800 shadow-slate-950/20">
              <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none transform translate-x-12 -translate-y-12">
                <Layout size={240} />
              </div>
              
              <div className="space-y-2 mb-8 relative z-10 border-l-4 border-[#00c3ff] pl-3">
                <p className="text-[10px] uppercase font-bold tracking-widest text-[#00c3ff]">Surviving Strategy</p>
                <h3 className="text-lg md:text-xl font-bold tracking-tight">AI 시대, 최우선 커리어 피벗(Pivot) 경로</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 relative z-10">
                {data.pivots?.map((p, i) => (
                  <div 
                    key={i} 
                    className="border border-white/10 rounded-2xl p-6 bg-white/[0.03] hover:bg-white/[0.08] transition-all duration-300 flex flex-col justify-between h-64 shadow-sm group"
                  >
                    <div className="space-y-4">
                      <div className="flex justify-between items-start gap-1">
                        <h4 className="font-bold text-sm text-white break-keep group-hover:text-[#00c3ff] transition-colors leading-tight max-w-[150px]">{p.role}</h4>
                        <span className="text-[10px] font-bold text-[#00c3ff] bg-[#00c3ff]/10 border border-[#00c3ff]/25 px-2 py-0.5 rounded-full whitespace-nowrap shrink-0">{p.matchScore}% 일치</span>
                      </div>
                      <p className="text-[11px] text-slate-350 leading-relaxed overflow-hidden italic prose line-clamp-5 break-keep">
                        {p.reason}
                      </p>
                    </div>
                    
                    <div className="flex justify-end pt-4">
                      <ChevronRight size={16} className="text-slate-400 group-hover:text-[#00c3ff] transform group-hover:translate-x-1.5 transition-all duration-300" />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ROADMAP TAB (생존 로드맵) */}
        {activeTab === 'roadmap' && (
          <div className="space-y-8 animate-fade-up">
            
            {/* View Mode Toggle */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
              <div className="space-y-1">
                <h4 className="font-bold text-sm text-slate-900">로드맵 분석 뷰 스타일 변환</h4>
                <p className="text-xs text-slate-400">마일스톤을 하나씩 집중 점검하거나, 1년 통합 흐름을 볼 수 있습니다.</p>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setShowAllRoadmap(false)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${!showAllRoadmap ? 'bg-slate-900 text-white shadow' : 'bg-slate-100 text-slate-500 hover:text-slate-800'}`}
                >
                  단계별 분석
                </button>
                <button
                  onClick={() => setShowAllRoadmap(true)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all ${showAllRoadmap ? 'bg-slate-900 text-white shadow' : 'bg-slate-100 text-slate-500 hover:text-slate-800'}`}
                >
                  전체 타임라인 한눈에 보기
                </button>
              </div>
            </div>

            {/* Step-by-Step Period Selector */}
            {!showAllRoadmap && (
              <div className="flex flex-wrap md:flex-nowrap justify-center gap-3 bg-slate-150 p-1.5 rounded-2xl w-fit mx-auto border border-slate-200/55 shadow-inner">
                {[
                  { key: 'month3', label: '단기 과제 (3개월)' },
                  { key: 'month6', label: '중기 연계 (6개월)' },
                  { key: 'month12', label: '장기 비전 (12개월)' }
                ].map((phase) => (
                  <button 
                    key={phase.key} 
                    onClick={() => setActiveRoadmapKey(phase.key as any)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 cursor-pointer
                      ${activeRoadmapKey === phase.key 
                        ? 'bg-slate-900 text-white shadow-md' 
                        : 'text-slate-500 hover:text-slate-900'}`}
                  >
                    {phase.label}
                  </button>
                ))}
              </div>
            )}

            {/* ROADMAP CONTENTS */}
            {!showAllRoadmap ? (
              currentPhase ? (
                <div className="bg-white border border-slate-100 shadow-xl rounded-3xl p-6 md:p-12 space-y-10 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-2.5 h-full bg-[#5144e5]"></div>
                  
                  <div className="text-center space-y-2 max-w-xl mx-auto">
                    <span className="text-[10px] uppercase font-bold tracking-widest text-[#5144e5] block">Target Objective</span>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight break-keep leading-tight">{currentPhase.focus}</h2>
                    <div className="w-12 h-1 bg-gradient-to-r from-[#5144e5] to-[#00c3ff] mx-auto rounded-full"></div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Skill Focus Column */}
                    <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-100 flex flex-col justify-between space-y-5">
                      <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/60 pb-3">
                        <Target size={14} className="text-[#5144e5] shrink-0" /> Focus Skills
                      </h4>
                      <ul className="space-y-4 flex-1">
                        {currentPhase.skills.map((s, i) => (
                          <li key={i} className="flex flex-col gap-1.5">
                            <span className="text-xs font-semibold text-slate-800 uppercase tracking-tight">{s}</span>
                            <div className="w-full h-1.5 bg-slate-200/70 rounded-full overflow-hidden">
                              <div className="h-full bg-gradient-to-r from-[#5144e5] to-[#00c3ff] rounded-full" style={{ width: `${100 - (i * 12)}%` }}></div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Action Items Column with Interactivity Checkboxes */}
                    <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-100 flex flex-col justify-between space-y-5">
                      <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/60 pb-3">
                        <BookOpen size={14} className="text-[#5144e5] shrink-0" /> Execution Plan
                      </h4>
                      <ul className="space-y-4 flex-1">
                        {currentPhase.actions.map((a, i) => {
                          const itemKey = `${activeRoadmapKey}-${i}`;
                          const isDone = checkedActions[itemKey];
                          return (
                            <li 
                              key={i} 
                              onClick={() => toggleAction(itemKey)}
                              className="flex gap-2.5 items-start cursor-pointer group select-none"
                            >
                              <span className={`w-5 h-5 rounded-md flex items-center justify-center border font-bold text-[10px] shrink-0 mt-0.5 transition-all
                                ${isDone 
                                  ? 'bg-emerald-500 border-emerald-500 text-white' 
                                  : 'bg-white border-slate-300 text-[#5144e5] group-hover:border-[#5144e5]'}`}
                              >
                                {isDone ? <Check size={11} /> : i + 1}
                              </span>
                              <p className={`text-xs text-slate-700 leading-relaxed font-semibold break-keep transition-all
                                ${isDone ? 'line-through text-slate-400 opacity-60' : ''}`}
                              >
                                {a}
                              </p>
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    {/* Certifications Column */}
                    <div className="bg-slate-50/70 rounded-2xl p-6 border border-slate-100 flex flex-col justify-between space-y-5">
                      <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200/60 pb-3">
                        <Globe size={14} className="text-[#5144e5] shrink-0" /> Certifications
                      </h4>
                      <div className="space-y-2 flex-1">
                        {currentPhase.certifications.map((c, i) => (
                          <a 
                            key={i} 
                            href={c.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="flex items-center justify-between p-3 bg-white border border-slate-250 hover:border-[#00c3ff] hover:shadow-sm rounded-xl transition-all duration-200 group/cert"
                          >
                            <span className="text-xs font-bold text-slate-800 truncate mr-2 block flex-1">{c.name}</span>
                            <ExternalLink size={12} className="text-slate-400 group-hover/cert:text-[#00c3ff] transition-colors shrink-0" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white border border-slate-100 shadow-xl rounded-3xl p-20 flex flex-col items-center justify-center text-center">
                  <AlertCircle size={36} className="text-slate-400 animate-bounce" />
                  <p className="mt-3 text-xs font-bold text-slate-400">코스 로드맵 데이터를 불러올 수 없습니다.</p>
                </div>
              )
            ) : (
              // FULL CHRONOLOGICAL TIMELINE STACK
              <div className="space-y-12 relative before:absolute before:top-4 before:bottom-4 before:left-6 before:w-0.5 before:bg-slate-200">
                {['month3', 'month6', 'month12'].map((key) => {
                  const phase = getPhaseData(key);
                  if (!phase) return null;
                  const label = key === 'month3' ? '단기 과제 (3개월)' : key === 'month6' ? '중기 연계 (6개월)' : '장기 비전 (12개월)';
                  const tagColor = key === 'month3' ? 'bg-[#5144e5] text-white' : key === 'month6' ? 'bg-[#00c3ff] text-slate-950' : 'bg-slate-900 text-white';

                  return (
                    <div key={key} className="relative pl-14 animate-fade-in">
                      {/* Subway Circle Pin */}
                      <div className="absolute left-3.5 top-1.5 w-6 h-6 rounded-full bg-white border-4 border-slate-900 shadow flex items-center justify-center z-10">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#00c3ff]"></div>
                      </div>
                      
                      <div className="bg-white border border-slate-100 shadow-xl rounded-3xl p-6 md:p-8 space-y-6">
                        <div className="flex flex-wrap justify-between items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${tagColor}`}>
                            {label}
                          </span>
                          <span className="text-xs text-slate-400 font-bold flex items-center gap-1">
                            <Clock size={12} /> Target Milestone Period
                          </span>
                        </div>

                        <div className="space-y-1">
                          <h3 className="text-lg md:text-xl font-black text-slate-900 break-keep leading-tight">{phase.focus}</h3>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                          <div className="space-y-3">
                            <h4 className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-slate-500 border-l-2 border-indigo-500 pl-2">
                              Focus Skills
                            </h4>
                            <ul className="space-y-2">
                              {phase.skills.map((s, idx) => (
                                <li key={idx} className="text-xs font-semibold text-slate-700 bg-slate-50 px-2.5 py-1.5 rounded-md border border-slate-100 flex justify-between items-center">
                                  <span>{s}</span>
                                  <span className="w-1.5 h-1.5 rounded-full bg-[#5144e5]"></span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-3">
                            <h4 className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-slate-500 border-l-2 border-indigo-500 pl-2">
                              Action Items
                            </h4>
                            <ul className="space-y-2.5">
                              {phase.actions.map((a, idx) => (
                                <li key={idx} className="flex gap-2 items-start text-xs text-slate-600 leading-relaxed font-semibold break-keep">
                                  <span className="text-slate-400 text-[10px] mt-0.5 shrink-0 block">▪</span>
                                  <span>{a}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="space-y-3">
                            <h4 className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider text-slate-500 border-l-2 border-indigo-500 pl-2">
                              Education / Certificate
                            </h4>
                            <div className="space-y-1.5">
                              {phase.certifications.map((c, idx) => (
                                <a 
                                  key={idx} 
                                  href={c.url} 
                                  target="_blank" 
                                  rel="noopener noreferrer" 
                                  className="flex items-center justify-between p-2.5 bg-slate-50 border border-slate-150 rounded-xl hover:border-[#00c3ff] transition-all text-[11px] font-bold text-slate-700"
                                >
                                  <span className="truncate block max-w-[170px] font-semibold">{c.name}</span>
                                  <ExternalLink size={11} className="text-[#00c3ff]" />
                                </a>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TOOLS TAB (필수 도구) */}
        {activeTab === 'tools' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up">
            {data.tools?.map((tool, idx) => {
              const lev = tool.level?.toLowerCase();
              const badgeBg = lev.includes('adv') ? 'bg-rose-50 border-rose-200/50 text-rose-600' : lev.includes('inter') ? 'bg-amber-55 text-amber-900 border-amber-200/40' : 'bg-emerald-50 text-emerald-600 border-emerald-100';

              return (
                <div 
                  key={idx} 
                  className="bg-white border border-slate-100 shadow-lg rounded-3xl p-6 hover:border-[#00c3ff]/60 hover:shadow-xl transition-all duration-300 relative flex flex-col justify-between h-[380px] group"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-slate-900 text-white flex items-center justify-center rounded-2xl group-hover:bg-[#00c3ff] group-hover:text-slate-950 transition-all duration-300">
                        <Terminal size={18} />
                      </div>
                      <span className={`text-[10px] font-bold px-3 py-1 rounded-full tracking-wide uppercase border ${badgeBg}`}>
                        {tool.level}
                      </span>
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900 mb-2 group-hover:text-[#5144e5] transition-colors">{tool.name}</h3>
                    <p className="text-xs text-slate-500 leading-relaxed font-semibold block line-clamp-4 mb-6 break-keep">
                      {tool.description}
                    </p>
                  </div>
                  
                  <div className="space-y-2 mt-auto">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-wider block">학습 추천 리소스</p>
                    {tool.resources?.slice(0, 2).map((res, rid) => {
                      const isVideo = res.type?.toLowerCase().includes('video') || res.type?.toLowerCase().includes('youtube');
                      return (
                        <a 
                          key={rid} 
                          href={res.url} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center justify-between p-2 rounded-xl bg-slate-50 hover:bg-slate-900 hover:text-white transition-all text-[11px] font-bold text-slate-700 border border-transparent"
                        >
                          <div className="flex items-center gap-2 max-w-[200px] truncate">
                            {isVideo ? (
                              <Youtube size={14} className="text-rose-500 shrink-0" />
                            ) : (
                              <Globe size={14} className="text-[#00c3ff] shrink-0" />
                            )}
                            <span className="truncate block font-semibold">{res.title}</span>
                          </div>
                          <ExternalLink size={10} className="opacity-40" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* ---------------------------------------------------- */}
      {/* PDF PRINT LAYOUT TEMPLATE (COMPRESSED FULL VIEW) */}
      {/* ---------------------------------------------------- */}
      <div className="hidden print:block space-y-12 print-full-view">
        
        {/* SECTION 1: Diagnostic Table and Risk Assessment */}
        <section className="print-section print-break-before space-y-6">
          <div className="border-b-2 border-slate-900 pb-2">
            <h2 className="text-xl font-black tracking-tight text-slate-900 uppercase">1. 주요 과업 분석 및 자동화 위험도 진단</h2>
          </div>
          
          <div className="border border-slate-300 rounded-2xl overflow-hidden bg-white">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-white font-bold uppercase">
                  <th className="px-4 py-3 border-b border-slate-300 w-1/4">주요 직무 과업 (Task)</th>
                  <th className="px-4 py-3 border-b border-slate-300 w-1/6">위험 수준</th>
                  <th className="px-4 py-3 border-b border-slate-300 w-1/6">AI 협업 시너지</th>
                  <th className="px-4 py-3 border-b border-slate-300 w-5/12">핵심 실행 전략 제언</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {data.impactTable?.map((item, idx) => (
                  <tr key={idx} className="align-top">
                    <td className="px-4 py-3.5 font-bold text-slate-900 break-keep">
                      {item.task}
                      <span className="block text-[9px] font-semibold text-slate-400 uppercase mt-0.5 tracking-wider">
                        분류: {item.type || '하이브리드'} | 도구: {item.keyTools}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-bold text-slate-700">
                      {item.automationRisk}
                    </td>
                    <td className="px-4 py-3.5 font-bold text-slate-700">
                      {item.aiCollaboration}
                    </td>
                    <td className="px-4 py-3.5 text-slate-500 leading-normal font-semibold break-keep">
                      {item.notes}
                      <p className="text-[10px] text-slate-600 leading-relaxed font-semibold break-keep mt-1 italic">
                        * 상세 기술적 영향: {item.techImpact}
                      </p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* SECTION 2: Pivot Strategic Targets */}
        <section className="print-section space-y-6">
          <div className="border-b-2 border-slate-900 pb-2">
            <h2 className="text-xl font-black tracking-tight text-slate-900 uppercase">2. 최우선 커리어 추천 피벗(Pivot) 경로</h2>
          </div>
          
          <div className="print-grid-pivots">
            {data.pivots?.map((p, i) => (
              <div key={i} className="border border-slate-300 rounded-xl p-4 bg-slate-50">
                <div className="flex justify-between items-center gap-2 border-b border-slate-300 pb-2 mb-2">
                  <h4 className="font-extrabold text-sm text-slate-900">{p.role}</h4>
                  <span className="text-[10px] font-bold bg-[#00c3ff]/15 px-2 py-0.5 rounded-full">{p.matchScore}% 일치</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-relaxed font-semibold break-keep">
                  {p.reason}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: Detailed 1-Year chronological Survival Roadmap */}
        <section className="print-section print-break-before space-y-6">
          <div className="border-b-2 border-slate-900 pb-2">
            <h2 className="text-xl font-black tracking-tight text-slate-900 uppercase">3. 단계별 하이브리드 커리어 선순환 생존 로드맵</h2>
          </div>
          
          <div className="print-grid-roadmap">
            {['month3', 'month6', 'month12'].map((key) => {
              const phase = getPhaseData(key);
              if (!phase) return null;
              const label = key === 'month3' ? '단기 마일스톤 (3개월)' : key === 'month6' ? '중기 마일스톤 (6개월)' : '장기 마일스톤 (12개월)';

              return (
                <div key={key} className="border border-slate-300 rounded-2xl p-5 space-y-4">
                  <div className="border-b border-slate-200 pb-2">
                    <span className="text-[10px] font-black text-[#5144e5] tracking-wider block">{label}</span>
                    <h3 className="text-sm font-black text-slate-900 mt-1">{phase.focus}</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                    <div className="space-y-1.5">
                      <span className="font-extrabold text-slate-400 block tracking-wider uppercase text-[9px]">추천 학습 스킬 (Skills)</span>
                      <ul className="space-y-1">
                        {phase.skills.map((s, idx) => (
                          <li key={idx} className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-1 rounded">
                            ▪ {s}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="space-y-1.5">
                      <span className="font-extrabold text-slate-400 block tracking-wider uppercase text-[9px]">구체적 실행 전략 (Actions)</span>
                      <ul className="space-y-1">
                        {phase.actions.map((a, idx) => (
                          <li key={idx} className="text-[11px] font-semibold text-slate-600 leading-normal break-keep">
                            {idx+1}. {a}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="space-y-1.5">
                      <span className="font-extrabold text-slate-400 block tracking-wider uppercase text-[9px]">권장 공인 자격 / 교육 과정</span>
                      <ul className="space-y-1">
                        {phase.certifications.map((c, idx) => (
                          <li key={idx} className="text-[11px] font-semibold text-slate-700">
                            🏆 {c.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION 4: Professional Tool Suite */}
        <section className="print-section space-y-6">
          <div className="border-b-2 border-slate-900 pb-2">
            <h2 className="text-xl font-black tracking-tight text-slate-900 uppercase">4. AI 실무 필수 및 고도 생산성 도구 모음</h2>
          </div>
          
          <div className="print-grid-tools">
            {data.tools?.map((tool, idx) => (
              <div key={idx} className="border border-slate-305 rounded-xl p-4 bg-white space-y-2">
                <div className="flex justify-between items-center gap-2">
                  <h4 className="font-black text-sm text-slate-900">{tool.name}</h4>
                  <span className="text-[9px] font-bold border border-slate-400 px-2 py-0.5 rounded-full uppercase">{tool.level}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-semibold break-keep">
                  {tool.description}
                </p>
                <div className="pt-1.5 border-t border-slate-200">
                  <span className="text-[9px] font-bold text-slate-400 block">권장 학습 리소스:</span>
                  {tool.resources?.slice(0, 1).map((res, rid) => (
                    <span key={rid} className="text-[10px] font-semibold text-slate-700 block truncate leading-tight mt-0.5">
                      ▪ {res.title} ({res.url})
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 4. Feedback Footer */}
      <footer className="bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 text-white py-16 px-6 rounded-[2.5rem] mt-16 shadow-[0_-16px_32px_rgba(15,23,42,0.06)] relative overflow-hidden feedback-section no-print">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
          <div className="space-y-6">
            <h2 className="text-3xl font-black tracking-tight leading-none uppercase">Survival <br /><span className="text-[#00c3ff]">Feedback</span></h2>
            <p className="text-slate-400 text-xs md:text-sm leading-relaxed max-w-sm font-semibold break-keep">
              AI 트렌드 속에서 위기를 핵심 기회로 치환하기 위한 맞춤 커리어 리포트가 완성되었습니다. 본 진단 리포트가 귀하의 직업 생존 설계에 기여한 가치는 어떠했습니까?
            </p>
            <div className="pt-4 flex flex-wrap gap-2.5">
              <button 
                onClick={onReset} 
                className="px-6 py-3 bg-[#00c3ff] hover:bg-white text-slate-950 font-bold text-xs rounded-xl flex items-center gap-2 shadow-lg transition-all cursor-pointer"
              >
                <RefreshCw size={14} />
                <span>역할 도메인 다시 진단하기</span>
              </button>
            </div>
          </div>
          
          <div className="bg-white/[0.03] p-7 md:p-8 border border-white/10 rounded-2xl backdrop-blur-md space-y-6">
            {isFeedbackSubmitted ? (
              <div className="py-8 text-center space-y-3 animate-fade-in">
                <span className="w-12 h-12 bg-emerald-500/10 text-emerald-400 border border-emerald-500/25 rounded-2xl flex items-center justify-center mx-auto">
                  <Check size={24} />
                </span>
                <h4 className="text-sm font-bold text-white">피드백 제출 완료</h4>
                <p className="text-xs text-slate-400 leading-normal break-keep">소중한 의견 감사드립니다. 진단 시스템 정확도를 개선하는 기초 자산으로 귀하게 활용하겠습니다.</p>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 block font-bold">진단 결과 정합성 (Accuracy Diagnostic)</label>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map(s => (
                      <Star 
                        key={s} 
                        size={22} 
                        className={`cursor-pointer transition-all ${ratings.accuracy >= s ? "text-[#00c3ff] fill-[#00c3ff] scale-105" : "text-white/15 hover:text-white/30"}`} 
                        onClick={() => setRatings({...ratings, accuracy: s})}
                      />
                    ))}
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] uppercase tracking-wider text-slate-400 block font-bold">실행 전략적 가치 (Strategic Value)</label>
                  <div className="flex gap-2">
                    {[1,2,3,4,5].map(s => (
                      <Star 
                        key={s} 
                        size={22} 
                        className={`cursor-pointer transition-all ${ratings.usefulness >= s ? "text-[#00c3ff] fill-[#00c3ff] scale-105" : "text-white/15 hover:text-white/30"}`} 
                        onClick={() => setRatings({...ratings, usefulness: s})}
                      />
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={() => setIsFeedbackSubmitted(true)}
                  disabled={ratings.accuracy === 0 && ratings.usefulness === 0}
                  className={`w-full py-3.5 border border-white/10 text-xs font-bold uppercase tracking-wider transition-all rounded-xl block text-center cursor-pointer
                    ${(ratings.accuracy === 0 && ratings.usefulness === 0)
                      ? 'bg-white/5 text-slate-500 cursor-not-allowed' 
                      : 'bg-white/10 hover:bg-[#00c3ff] hover:text-slate-950 text-white'}`}
                >
                  피드백 제출하기
                </button>
              </>
            )}
          </div>
        </div>
        <div className="mt-16 pt-5 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center max-w-5xl mx-auto opacity-30 select-none">
          <p className="text-[9px] uppercase tracking-[0.4em] mb-3 md:mb-0">ⓒ 2026 JOBSURVIVE LAB. ALL RIGHTS RESERVED.</p>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;
