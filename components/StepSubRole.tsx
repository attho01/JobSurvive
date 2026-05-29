import React from 'react';
import { Target, ChevronRight, ArrowLeft } from 'lucide-react';

interface Props {
  primaryRole: string;
  onNext: (subRole: string, description: string) => void;
  onBack: () => void;
}

const SUGGESTIONS: Record<string, string[]> = {
  "마케팅 (Marketing)": ["퍼포먼스 마케팅", "콘텐츠 마케팅", "브랜드 마케팅", "CRM/Retention", "SEO/ASO"],
  "개발 (Development)": ["프론트엔드 (FE)", "백엔드 (BE)", "풀스택", "DevOps/SRE", "임베디드", "모바일 앱"],
  "디자인 (Design)": ["UI/UX 디자인", "BX/브랜드 디자인", "그래픽 디자인", "영상/모션 그래픽", "제품 디자인"],
  "데이터 분석 (Data Analysis)": ["비즈니스 인텔리전스 (BI)", "그로스 해킹", "데이터 엔지니어링", "데이터 사이언스"],
};

const StepSubRole: React.FC<Props> = ({ primaryRole, onNext, onBack }) => {
  const [subRole, setSubRole] = React.useState('');
  const [description, setDescription] = React.useState('');
  
  // Find suggestions roughly based on primary role string match
  const suggestions = Object.entries(SUGGESTIONS).find(([key]) => primaryRole.includes(key.split(' ')[0]))?.[1] || [];

  return (
    <div className="space-y-6 animate-fade-in">
      <button onClick={onBack} className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-sm mb-4">
        <ArrowLeft size={16} /> 뒤로가기
      </button>

      <div className="text-center space-y-2">
        <div className="mx-auto w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 mb-4">
          <Target size={24} />
        </div>
        <h2 className="text-2xl font-bold text-slate-800">구체적인 세부 직무는 무엇인가요?</h2>
        <p className="text-slate-500">
          <span className="font-semibold text-indigo-600">{primaryRole}</span> 내에서 주로 담당하는 역할을 알려주세요.
        </p>
      </div>

      {suggestions.length > 0 && (
        <div className="max-w-2xl mx-auto">
          <p className="text-sm text-slate-500 mb-3 ml-1">추천 세부 직무</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {suggestions.map((role) => (
              <button
                key={role}
                onClick={() => setSubRole(role)}
                className={`p-3 border rounded-xl transition-all text-left flex items-center justify-between group
                  ${subRole === role 
                    ? 'bg-indigo-50 border-indigo-500 ring-1 ring-indigo-500' 
                    : 'bg-white border-slate-200 hover:border-indigo-500 hover:bg-indigo-50'}`}
              >
                <span className={`font-medium group-hover:text-indigo-700 ${subRole === role ? 'text-indigo-700' : 'text-slate-700'}`}>
                  {role}
                </span>
                <ChevronRight size={16} className={`group-hover:text-indigo-500 ${subRole === role ? 'text-indigo-500' : 'text-slate-300'}`} />
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="max-w-2xl mx-auto space-y-4 pt-4">
        <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">세부 직무 입력</label>
            <input
                type="text"
                value={subRole}
                onChange={(e) => setSubRole(e.target.value)}
                placeholder="예: 퍼포먼스 마케터, Java 백엔드 개발자 등"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
        </div>

        <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
                주요 업무 요약 <span className="text-slate-400 font-normal">(선택사항)</span>
            </label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="현재 담당하고 있는 주요 업무나 책임을 간단히 적어주세요. (예: 주 2회 뉴스레터 발행, 신규 고객 유치 캠페인 기획)"
                className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none h-24 resize-none"
            />
        </div>

        <button
          disabled={!subRole.trim()}
          onClick={() => onNext(subRole, description)}
          className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold text-lg hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all mt-4"
        >
          다음 단계로
        </button>
      </div>
    </div>
  );
};

export default StepSubRole;