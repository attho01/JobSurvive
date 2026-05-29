
import React, { useRef, useState } from 'react';
import { FileText, Upload, ArrowLeft, X, AlertCircle, FileSpreadsheet, Check } from 'lucide-react';

interface Props {
  onAnalyze: (text: string, file?: { data: string, mimeType: string }) => void;
  onBack: () => void;
}

const StepResume: React.FC<Props> = ({ onAnalyze, onBack }) => {
  const [text, setText] = useState('');
  const [file, setFile] = useState<{ name: string; data: string; mimeType: string } | null>(null);
  const [isDragActive, setIsDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    processFile(selectedFile);
  };

  const processFile = (selectedFile: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setFile({ 
        name: selectedFile.name, 
        data: (reader.result as string).split(',')[1], 
        mimeType: selectedFile.type 
      });
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setIsDragActive(true);
    } else if (e.type === "dragleave") {
      setIsDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-10 animate-fade-up">
      <button 
        onClick={onBack} 
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-slate-900 transition-colors duration-200 group"
      >
        <ArrowLeft size={14} className="transform group-hover:-translate-x-0.5 transition-transform" />
        <span>이전 단계 (전문 과업 선택)</span>
      </button>

      <div className="text-center space-y-4">
        <h2 className="text-[#5144e5] uppercase tracking-[0.3em] font-extrabold text-xs">Final Step. Profile</h2>
        <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight break-keep">당신의 이력을 연동하세요</h3>
        <p className="text-sm text-slate-500 font-medium max-w-xl mx-auto break-keep">
          이력서 문서를 업로드하거나 경력 요약을 붙여넣어 주시면, 위에서 선택하신 전문 역할 및 과업과 매칭하여 AI 분석 결과 보고서를 최종 컴파일합니다.
        </p>
        <div className="w-12 h-1 bg-gradient-to-r from-[#5144e5] to-[#00c3ff] mx-auto rounded-full"></div>
      </div>

      <div className="max-w-2xl mx-auto space-y-8">
        {/* Upload Container */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-3xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 group shadow-sm text-center relative overflow-hidden
            ${file 
              ? 'bg-slate-900 border-[#00c3ff] text-white shadow-lg shadow-[#00c3ff]/5' 
              : isDragActive
              ? 'bg-[#5144e5]/5 border-[#5144e5] scale-[1.01]'
              : 'bg-white border-slate-200 hover:border-[#5144e5] hover:shadow-md'}`}
        >
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />
          
          {file ? (
            <div className="space-y-4 animate-scale-in">
              <div className="w-16 h-16 rounded-2xl bg-[#00c3ff]/15 flex items-center justify-center mx-auto text-[#00c3ff]">
                <FileText size={32} />
              </div>
              <div className="space-y-1">
                <p className="font-bold text-sm text-white block max-w-md truncate">{file.name}</p>
                <p className="text-[10px] uppercase font-bold text-[#00c3ff] tracking-widest flex items-center justify-center gap-1">
                  <Check size={11} /> FILE ATTACHED SUCCESSFULLY
                </p>
              </div>
              <button 
                onClick={(e) => {e.stopPropagation(); setFile(null);}} 
                className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white hover:text-white rounded-xl text-xs font-bold tracking-wide transition-all uppercase inline-flex items-center gap-1"
              >
                <span>파일 변경</span>
              </button>
            </div>
          ) : (
            <div className="space-y-4 py-4">
              <div className="w-16 h-16 rounded-2xl bg-slate-50 group-hover:bg-[#5144e5]/10 flex items-center justify-center mx-auto text-slate-400 group-hover:text-[#5144e5] transition-colors duration-300 border border-slate-100">
                <Upload size={28} />
              </div>
              <div className="space-y-1">
                <p className="text-slate-800 font-bold text-sm">드래그하여 이력서 파일 업로드</p>
                <p className="text-slate-400 text-xs font-medium">PDF, JPG, TXT, DOCX 등 지원 (또는 클릭하여 파일 브라우저 열기)</p>
              </div>
            </div>
          )}
        </div>

        {/* OR Divider */}
        <div className="relative py-2 flex items-center">
          <div className="flex-grow border-t border-slate-200/60"></div>
          <span className="flex-shrink-0 mx-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest bg-slate-50/50 px-2 select-none">또는 텍스트 직접 입력</span>
          <div className="flex-grow border-t border-slate-200/60"></div>
        </div>

        {/* Textarea */}
        <div className="space-y-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="여기에 귀하의 핵심 이력 정보 또는 자기소개서, 주요 진행 프로젝트 등을 간략히 기입해 주셔도 완벽한 맞춤 진단서가 생성됩니다."
            className="w-full h-44 p-5 bg-white border border-slate-200 rounded-2xl outline-none focus:border-[#5144e5] focus:ring-2 focus:ring-[#5144e5]/5 text-sm font-semibold text-slate-800 placeholder:text-slate-400 resize-none transition-all shadow-inner"
          />
        </div>

        {/* Submit */}
        <button
          onClick={() => onAnalyze(text, file || undefined)}
          disabled={!text.trim() && !file}
          className={`w-full py-4.5 font-bold text-sm shadow-xl hover:shadow-2xl transition-all duration-300 rounded-2xl flex items-center justify-center gap-2
            ${(!text.trim() && !file)
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' 
              : 'bg-[#5144e5] hover:bg-[#2e3192] text-white active:scale-99'}`}
        >
          <span>내 커리어에 특화된 AI 리포트 컴파일 시작</span>
        </button>
      </div>
    </div>
  );
};

export default StepResume;
