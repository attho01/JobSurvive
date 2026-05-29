import React from 'react';
import { Briefcase, ChevronRight } from 'lucide-react';

interface Props {
  onNext: (role: string) => void;
}

const COMMON_ROLES = [
  "마케팅 (Marketing)", "개발 (Development)", "디자인 (Design)", 
  "영업 (Sales)", "인사 (HR)", "전략/기획 (Strategy)", 
  "사업개발 (Business Dev)", "데이터 분석 (Data Analysis)", 
  "재무/회계 (Finance)"
];

const StepJobFunction: React.FC<Props> = ({ onNext }) => {
  const [customRole, setCustomRole] = React.useState('');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
          <Briefcase size={24} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">현재 어떤 직무를 맡고 계신가요?</h2>
        <p className="text-slate-500">가장 핵심적인 직무 분야를 선택하거나 직접 입력해주세요.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
        {COMMON_ROLES.map((role) => (
          <button
            key={role}
            onClick={() => onNext(role)}
            className="p-4 bg-white border border-slate-200 rounded-xl hover:border-indigo-500 hover:bg-indigo-50 hover:shadow-md transition-all text-left flex items-center justify-between group"
          >
            <span className="font-medium text-slate-700 group-hover:text-indigo-700">{role}</span>
            <ChevronRight size={18} className="text-slate-300 group-hover:text-indigo-500" />
          </button>
        ))}
      </div>

      <div className="max-w-2xl mx-auto pt-4 border-t border-slate-100">
        <label className="block text-sm font-medium text-slate-700 mb-2">직접 입력하기</label>
        <div className="flex gap-2">
          <input
            type="text"
            value={customRole}
            onChange={(e) => setCustomRole(e.target.value)}
            placeholder="예: 프로덕트 매니저, 법무, 교육 등"
            className="flex-1 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            onKeyDown={(e) => e.key === 'Enter' && customRole && onNext(customRole)}
          />
          <button
            disabled={!customRole.trim()}
            onClick={() => onNext(customRole)}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            다음
          </button>
        </div>
      </div>
    </div>
  );
};

export default StepJobFunction;
