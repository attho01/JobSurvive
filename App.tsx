
import React, { useState } from 'react';
import { UserProfile, AnalysisResult, AppStep } from './types';
import { analyzeCareerPath, generateTasksForRole } from './services/geminiService';
import StepIndustry from './components/StepIndustry';
import StepRoleInput from './components/StepRoleInput';
import StepTaskSelection from './components/StepTaskSelection';
import StepResume from './components/StepResume';
import LoadingScreen from './components/LoadingScreen';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
  const [step, setStep] = useState<AppStep>(AppStep.LANDING);
  const [apiKey, setApiKey] = useState<string>('');
  const [profile, setProfile] = useState<UserProfile>({
    industry: '',
    primaryRole: '',
    selectedTasks: [],
    jobDescription: '',
    resumeText: '',
  });
  const [generatedTasks, setGeneratedTasks] = useState<string[]>([]);
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleStart = (key: string) => {
    setApiKey(key);
    setStep(AppStep.INDUSTRY);
  };

  const handleIndustry = (industry: string) => {
    setProfile(prev => ({ ...prev, industry }));
    setStep(AppStep.ROLE_INPUT);
  };

  const handleRoleInput = async (role: string) => {
    setProfile(prev => ({ ...prev, primaryRole: role }));
    setStep(AppStep.TASK_GENERATION);
    try {
        const tasks = await generateTasksForRole(profile.industry, role, apiKey);
        setGeneratedTasks(tasks);
        setStep(AppStep.TASK_SELECTION);
    } catch (e) {
        setGeneratedTasks(["전략적 의사결정", "팀 리더십 및 관리", "고객 관계 구축", "데이터 기반 분석", "프로젝트 기획"]);
        setStep(AppStep.TASK_SELECTION);
    }
  };

  const handleTaskSelection = (selectedTasks: string[]) => {
      setProfile(prev => ({ ...prev, selectedTasks }));
      setStep(AppStep.RESUME_UPLOAD);
  };

  const handleAnalyze = async (text: string, file?: { data: string, mimeType: string }) => {
    const fullProfile = { ...profile, resumeText: text, resumeFile: file };
    setProfile(fullProfile);
    setStep(AppStep.ANALYZING);
    try {
      const result = await analyzeCareerPath(fullProfile, apiKey);
      setAnalysis(result);
      setStep(AppStep.RESULTS);
    } catch (err: any) {
      setError(err.message || "AI 분석에 실패했습니다. 다시 시도해주세요.");
      setStep(AppStep.RESUME_UPLOAD);
    }
  };

  const handleReset = () => {
    setProfile({ industry: '', primaryRole: '', selectedTasks: [], jobDescription: '', resumeText: '' });
    setAnalysis(null);
    setError(null);
    setStep(AppStep.LANDING);
  };

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-800 font-sans selection:bg-[#00c3ff] selection:text-slate-950">
      <main className="w-full">
        {step === AppStep.LANDING && <LandingPage onStart={handleStart} />}
        
        <div className="max-w-5xl mx-auto px-4 py-12">
          {step === AppStep.INDUSTRY && <StepIndustry onNext={handleIndustry} />}
          {step === AppStep.ROLE_INPUT && (
              <StepRoleInput selectedIndustry={profile.industry} onNext={handleRoleInput} onBack={() => setStep(AppStep.INDUSTRY)} />
          )}
          {step === AppStep.TASK_GENERATION && (
              <div className="flex flex-col items-center justify-center py-32 space-y-8 animate-fade-up">
                <div className="relative">
                  <div className="w-20 h-20 border border-slate-100 rounded-2xl bg-white shadow-xl flex items-center justify-center">
                    <div className="w-10 h-10 border-2 border-t-[#5144e5] border-r-transparent border-b-[#00c3ff] border-l-transparent rounded-full animate-spin"></div>
                  </div>
                </div>
                <div className="text-center space-y-3">
                  <span className="text-[#5144e5] uppercase tracking-[0.3em] font-extrabold text-xs block">AI Sourcing</span>
                  <p className="text-base font-bold text-slate-900">도메인 연계 핵심 직무 요구사항 추출 중...</p>
                  <p className="text-xs font-semibold text-slate-400 max-w-sm mx-auto leading-relaxed break-keep">
                    귀하의 도메인 특성에 따른 30대 기업의 대표 채용 가이드를 분석하여 대표 전문 과업 리스크 요소를 선별하고 있습니다.
                  </p>
                </div>
              </div>
          )}
          {step === AppStep.TASK_SELECTION && (
              <StepTaskSelection role={profile.primaryRole} generatedTasks={generatedTasks} onNext={handleTaskSelection} onBack={() => setStep(AppStep.ROLE_INPUT)} />
          )}
          {step === AppStep.RESUME_UPLOAD && (
            <div className="space-y-4">
               {error && <div className="bg-red-50 text-red-600 p-6 rounded-2xl text-center font-bold text-sm tracking-tight border border-red-100 animate-fade-in">⚠️ {error}</div>}
               <StepResume onAnalyze={handleAnalyze} onBack={() => setStep(AppStep.TASK_SELECTION)} />
            </div>
          )}
        </div>

        {step === AppStep.ANALYZING && <LoadingScreen />}
        {step === AppStep.RESULTS && analysis && <Dashboard data={analysis} onReset={handleReset} />}
      </main>
    </div>
  );
};

export default App;
