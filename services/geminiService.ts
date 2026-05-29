
import { GoogleGenAI, Type } from "@google/genai";
import { UserProfile, AnalysisResult } from "../types";

const parseJSON = (text: string) => {
    try {
        const jsonMatch = text.match(/```json\n([\s\S]*?)\n```/);
        if (jsonMatch && jsonMatch[1]) {
            return JSON.parse(jsonMatch[1]);
        }
        const cleaner = text.replace(/^```json/i, '').replace(/```$/i, '').trim();
        return JSON.parse(cleaner);
    } catch (e) {
        console.error("Failed to parse JSON", e);
        try {
            const jsonPart = text.substring(text.indexOf('{'), text.lastIndexOf('}') + 1);
            return JSON.parse(jsonPart);
        } catch (e2) {
             throw new Error("AI 응답 데이터 형식이 올바르지 않습니다.");
        }
    }
}

export const generateTasksForRole = async (industry: string, role: string, apiKey?: string): Promise<string[]> => {
    const activeKey = apiKey || process.env.API_KEY;
    const ai = new GoogleGenAI({ apiKey: activeKey as string });
    const prompt = `
      Role: Senior Career Transition & Survival Strategist.
      Context: Industry: '${industry}', Role: '${role}'.
      
      Instructions: 
      1. 웹페이지, SNS, 채용 포털(LinkedIn, Wanted, Indeed 등)의 최신 채용 공고 30개 이상을 가상으로 검색하고 분석하십시오.
      2. 해당 직무에서 공통적으로 요구하는 '핵심 전략 과업(Core Strategic Tasks)'을 9개 추출하십시오.
      3. 특히 AI 시대에 중요도가 높아지는 과업을 포함하십시오.
      
      Output: A simple JSON array of 9 strings in Korean.
    `;
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
             type: Type.ARRAY,
             items: { type: Type.STRING }
          }
        }
      });
      return parseJSON(response.text) as string[];
    } catch (e) {
      console.error("Task Gen Error", e);
      return ["전략적 기획", "팀 리딩", "성과 관리", "고객 상담", "데이터 분석", "프로세스 혁신", "AI 도구 활용", "리스크 관리", "파트너십 구축"];
    }
};

export const analyzeCareerPath = async (profile: UserProfile, apiKey?: string): Promise<AnalysisResult> => {
  const activeKey = apiKey || process.env.API_KEY;
  const ai = new GoogleGenAI({ apiKey: activeKey as string });
  const prompt = `
    귀하는 전 세계 대기업의 채용 분석 데이터, 핵심 과업 위협 지표, 그리고 생성형 AI 응용 트렌드를 완벽히 꿰뚫고 있는 초일류 "AI 커리어 생존 및 직무 하이브리드 피벗 전략 최고 책임자(Chief Career Survival Architect)"입니다.

    사용자의 프로필 및 배경 정보는 다음과 같습니다:
    - 소속 산업군(Industry): ${profile.industry}
    - 현재 주임무 및 역할(Role): ${profile.primaryRole}
    - 집중적으로 성과를 내고 있는 특정 관심 과업(Tasks): ${profile.selectedTasks.join(', ')}
    - 사용자의 이력 및 경력 배경(Background/Resume): ${profile.resumeText || "이력서 정보가 업로드되지 않았습니다."}

    제공된 모든 궤적 데이터를 인공지능 위협 트렌드와 융합 분석하여, 사용자가 AI 시대의 혁신을 선도할 수 있도록 고도로 정교하고 입체적이며 학술지에 준하는 전문성이 가미된 "종합 직무 생존 & 스마트 로드맵 레포트"를 완벽한 한국어로 출력하십시오.

    [상세 작성 가이드라인 (내용을 풍성하고 구체화하기 위한 절대 수칙)]:
    1. impactTable의 과업별 진단:
       - 각 과업이 인공지능(RAG, LLM Agent, 코드 생성, 멀티모달 디자인 등)에 의해 구체적으로 어떻게 위협받고 변화하게 될지 고도화된 'techImpact'(최소 2~3문장)를 작성하세요.
       - 'notes'에는 단순히 "공부하세요" 같은 소극적인 내용이 아니라, 실제 대응 시나리오, 업무 프로세화 자동화 방침, 그리고 AI를 활용해 생산성을 10배 확대하는 일류 전략(최소 3~4문장의 긴 실전 전술)을 제시해 주십시오.
       - 'keyTools' 부문에는 이 과업을 지배하는 실질적인 AI 도구 명칭을 실명으로 최소 2~3개씩 반드시 포함하십시오.
    
    2. survivalScore의 종합 스코어 진단:
       - 'score'는 종합 생존율(0~100)을 기술적 대체 위험과의 상대 균형을 감안하여 정확히 연산하십시오.
       - 'explanation'은 이 결과가 도출된 거시적 원인, AI 위협의 한계(인간 고유의 도메인 지배력, 다중 맥락 연계 비즈니스 조정, 도덕적 의사결정 등), 그리고 이를 혁신으로 치환해 살아남기 위한 인재상 전략을 최소 5~6문장 분량의 명품 해설집 스타일로 길고 풍성하게 서술하십시오.

    3. roadmap (3개월 / 6개월 / 12개월 생존 로드맵):
       - 'focus': 단순히 '자격증 공부' 같은 수준이 아니라, 본 기간 동안 반드시 확보해야 할 명확하고 전술적인 성취 이정표 제목을 풍성하게 정의하십시오. (예: "멀티모달 AI 연동 실무 프로세싱 융합 및 업무 효율 250% 달성 계획")
       - 'skills': 각 기간별 구체적이고 융합적인 실전 역량을 최소 4~5개 기재하십시오. (예: "Prompt Engineering & LangChain 연계 커스텀 챗봇 설계", "BI 도구 및 AI 자동화 연계 의사결정 모니터링")
       - 'certifications': 해당 이정표의 성격에 부합하는 실제 글로벌 공인 자격증 혹은 권장 글로벌 강의(Google Cloud Certification, AWS Certified, DeepLearning.AI, Coursera, Azure 등) 명칭을 기재하고, 실제 대표 URL 도메인 링크를 반드시 함께 연결하십시오.
       - 'actions': 단답식 문장은 절대 금지합니다. 단계당 최소 4개씩, "어떤 전문 AI 도구와 사내 워크플로우를 연동하여 기획/제작 업무의 효율을 실질적으로 극대화할 수 있는지"에 대한 실천 프로젝트성 시나리오를 최소 2문장 이상의 단단한 설명으로 장문 구성해 주십시오.

    4. pivots (커리어 피벗 대안 경로):
       - AI의 영향력이 상대적으로 적거나, AI를 완벽히 도구화하여 최상위 가치를 창출할 수 있는 차세대 하이브리드 직무 3가지를 도출하십시오.
       - 'role'은 매력적이고 구체적인 유망 직무명으로 작명하고, 'matchScore'를 합리적으로 명시하십시오.
       - 'reason'에는 이 방향성이 왜 사용자에게 완벽한 블루오션이 될 수 있는지 이력서 강점의 계승성 및 AI 시너지를 들어 최소 4~5문장 이상으로 자세하게 설명하십시오.

    5. tools (직무 필수의 AI 시대 스마트 도구):
       - 직무 가치와 직무 생존에 엄청난 힘을 실어줄 현존 최고급 실무 필수 도구들(예: Cursor IDE, Make.com, Claude 3.5 Sonnet, Julius AI, Zapier, v0.dev, GitHub Copilot 등)을 3개 이상 추출하십시오.
       - 'description'에는 이 도구가 제공하는 비즈니스 임팩트, 워크플로우 생산 전술 및 상세 활용 노하우를 최소 3~4문장의 장문으로 구체적으로 가이드 하십시오.
       - 'resources'에는 초보자나 숙련자가 반드시 시청 혹은 독주해야 할 세계적 공식 문서, 튜토리얼 강의명 및 실제 대표 도메인 URL 리소스를 풍부하게 링크해 제시하십시오.
  `;

  const schema = {
    type: Type.OBJECT,
    properties: {
      impactTable: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            task: { type: Type.STRING },
            automationRisk: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
            aiCollaboration: { type: Type.STRING, enum: ["High", "Medium", "Low"] },
            type: { type: Type.STRING },
            keyTools: { type: Type.STRING },
            techImpact: { type: Type.STRING },
            notes: { type: Type.STRING }
          },
          required: ["task", "automationRisk", "aiCollaboration", "type", "keyTools", "techImpact", "notes"]
        }
      },
      survivalScore: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.INTEGER },
          explanation: { type: Type.STRING }
        },
        required: ["score", "explanation"]
      },
      roadmap: {
        type: Type.OBJECT,
        properties: {
          month3: {
            type: Type.OBJECT,
            properties: {
              focus: { type: Type.STRING },
              skills: { type: Type.ARRAY, items: { type: Type.STRING } },
              certifications: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, url: { type: Type.STRING } } } },
              actions: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["focus", "skills", "certifications", "actions"]
          },
          month6: { type: Type.OBJECT, properties: { focus: { type: Type.STRING }, skills: { type: Type.ARRAY, items: { type: Type.STRING } }, certifications: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, url: { type: Type.STRING } } } }, actions: { type: Type.ARRAY, items: { type: Type.STRING } } }, required: ["focus", "skills", "certifications", "actions"] },
          month12: { type: Type.OBJECT, properties: { focus: { type: Type.STRING }, skills: { type: Type.ARRAY, items: { type: Type.STRING } }, certifications: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, url: { type: Type.STRING } } } }, actions: { type: Type.ARRAY, items: { type: Type.STRING } } }, required: ["focus", "skills", "certifications", "actions"] }
        },
        required: ["month3", "month6", "month12"]
      },
      pivots: {
        type: Type.ARRAY,
        items: { type: Type.OBJECT, properties: { role: { type: Type.STRING }, matchScore: { type: Type.INTEGER }, reason: { type: Type.STRING } } }
      },
      tools: {
        type: Type.ARRAY,
        items: { type: Type.OBJECT, properties: { name: { type: Type.STRING }, level: { type: Type.STRING }, description: { type: Type.STRING }, resources: { type: Type.ARRAY, items: { type: Type.OBJECT, properties: { title: { type: Type.STRING }, url: { type: Type.STRING }, type: { type: Type.STRING } } } } } }
      }
    },
    required: ["impactTable", "survivalScore", "roadmap", "pivots", "tools"]
  };

  try {
    const parts: any[] = [{ text: prompt }];
    if (profile.resumeFile) {
        parts.push({ inlineData: { mimeType: profile.resumeFile.mimeType, data: profile.resumeFile.data } });
    }

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: { parts },
      config: {
        responseMimeType: "application/json",
        responseSchema: schema,
        temperature: 0.1
      }
    });

    return parseJSON(response.text) as AnalysisResult;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
