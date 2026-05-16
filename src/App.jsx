import React, { useState, useEffect, useRef } from "react";
import {
  FileText,
  BookOpen,
  Type,
  FunctionSquare,
  Image as ImageIcon,
  Lightbulb,
  Database,
  CheckCircle2,
  Search,
  RotateCcw,
  ChevronRight,
} from "lucide-react";

const CHECKLIST_DATA = [
  {
    id: "cover",
    title: "CHAPTER COVER PAGE",
    color: "text-yellow-500",
    icon: <FileText className="w-4 h-4" />,
    items: [
      { id: "C1", text: "Chapter number & title on cover page" },
      { id: "C2", text: "No. of PYQs clearly stated (e.g. 4 Questions)" },
      { id: "C3", text: "Weightage & Difficulty shown with ★ stars" },
      { id: "C4", text: "IAT Strategy bullet points included" },
      { id: "C5", text: "Topic mind-map / flowchart on cover page" },
      { id: "C6", text: "Subtopic hierarchy correct & complete" },
    ],
  },
  {
    id: "theory",
    title: "CONTENT & THEORY",
    color: "text-blue-400",
    icon: <BookOpen className="w-4 h-4" />,
    items: [
      { id: "T1", text: "All concepts & definitions written clearly" },
      { id: "T2", text: "Key formulas / laws highlighted or boxed" },
      { id: "T3", text: "All required derivations included" },
      { id: "T4", text: "Remember This & Quick Tip boxes present" },
      { id: "T5", text: "Common Mistakes section added per topic" },
    ],
  },
  {
    id: "formatting",
    title: "FORMATTING",
    color: "text-purple-400",
    icon: <Type className="w-4 h-4" />,
    items: [
      { id: "F1", text: "Headings & sub-headings as per template" },
      { id: "F2", text: "Font family & size consistent throughout" },
      { id: "F3", text: "Spacing, margins & two-column layout clean" },
      { id: "F4", text: "Page numbers & chapter index updated" },
      { id: "F5", text: "Colour coding of boxes matches template" },
    ],
  },
  {
    id: "equations",
    title: "EQUATIONS & RENDERING",
    color: "text-orange-500",
    icon: <FunctionSquare className="w-4 h-4" />,
    items: [
      {
        id: "Q1",
        text: "All equations rendered as proper fractions — not inline text like M/a²",
      },
      {
        id: "Q2",
        text: "Boxed formulas use equation box style (not plain text)",
      },
      {
        id: "Q3",
        text: "Superscripts, subscripts & Greek symbols display correctly",
      },
      {
        id: "Q4",
        text: "Vector notation (arrows/hats) rendered, not typed as r-hat",
      },
    ],
  },
  {
    id: "diagrams",
    title: "DIAGRAMS",
    color: "text-orange-400",
    icon: <ImageIcon className="w-4 h-4" />,
    items: [
      { id: "D1", text: "All required diagrams drawn & labelled" },
      { id: "D2", text: "Neat, proportionate & clearly readable" },
      { id: "D3", text: "Figure captions match italic template style" },
    ],
  },
  {
    id: "examples",
    title: "EXAMPLES",
    color: "text-green-500",
    icon: <Lightbulb className="w-4 h-4" />,
    items: [
      { id: "E1", text: "Solved examples cover all concept types" },
      { id: "E2", text: "Step-by-step working shown clearly" },
    ],
  },
  {
    id: "pyqs",
    title: "PYQS",
    color: "text-yellow-600",
    icon: <Database className="w-4 h-4" />,
    items: [
      { id: "P1", text: "All past year questions sourced & added" },
      { id: "P2", text: "Questions tagged by year (e.g. [IAT 2023])" },
      { id: "P3", text: "PYQ count on cover matches actual questions" },
    ],
  },
  {
    id: "solutions",
    title: "SOLUTIONS",
    color: "text-green-400",
    icon: <CheckCircle2 className="w-4 h-4" />,
    items: [
      { id: "S1", text: "Every PYQ has a complete, accurate solution" },
      { id: "S2", text: "Answer verified against official IAT answer key" },
      { id: "S3", text: "Exercise questions include full solutions section" },
      { id: "S4", text: "Answer key table present at chapter end" },
    ],
  },
  {
    id: "review",
    title: "FINAL REVIEW",
    color: "text-red-500",
    icon: <Search className="w-4 h-4" />,
    items: [
      { id: "R1", text: "Proofread for spelling & factual errors" },
      { id: "R2", text: "Cross-checked with NCERT / official syllabus" },
      { id: "R3", text: "Formula Flashcard page included at end of theory" },
      { id: "R4", text: "Final sign-off done ✓" },
    ],
  },
];

const SUBJECT_CONFIG = {
  PHYSICS: [
    "Current Electricity",
    "Electric Charges and Fields",
    "Electrostatic Potential and Capacitance",
    "EM Waves",
    "Ray Optics and Optical Instruments",
    "Thermal Properties of Matter",
    "Work, Energy and Power",
  ],
  MATHS: ["3D Geometry", "Conic Sections", "Straight Lines"],
};

const App = () => {
  const [selectedSubject, setSelectedSubject] = useState("PHYSICS");
  const [selectedChapter, setSelectedChapter] = useState(
    SUBJECT_CONFIG["PHYSICS"][0],
  );
  const [checkedItems, setCheckedItems] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  const storageKey = `crispr_v3_${selectedSubject}_${selectedChapter.replace(/\s/g, "_")}`;
  const lastKeyRef = useRef(storageKey);

  // 1. Initial Load when StorageKey changes
  useEffect(() => {
    setIsLoaded(false); // Pause saving during transition
    const saved = localStorage.getItem(storageKey);
    const parsed = saved ? JSON.parse(saved) : {};
    setCheckedItems(parsed);
    lastKeyRef.current = storageKey;
    setIsLoaded(true); // Resume saving for the new key
  }, [storageKey]);

  // 2. Save only when checkedItems changes AND we are fully loaded for the current key
  useEffect(() => {
    if (isLoaded && lastKeyRef.current === storageKey) {
      localStorage.setItem(storageKey, JSON.stringify(checkedItems));
    }
  }, [checkedItems, isLoaded, storageKey]);

  const toggleItem = (itemId) => {
    if (!isLoaded) return;
    setCheckedItems((prev) => ({
      ...prev,
      [itemId]: !prev[itemId],
    }));
  };

  const handleSubjectChange = (subject) => {
    setSelectedSubject(subject);
    setSelectedChapter(SUBJECT_CONFIG[subject][0]);
  };

  const totalCount = 30;
  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const progressPercentage = (completedCount / totalCount) * 100;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-gray-300 font-sans selection:bg-yellow-500/30">
      {/* Desktop Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-[#0d0d0d] border-r border-white/5 p-6 hidden lg:block overflow-y-auto">
        <div className="mb-10">
          <h4 className="text-yellow-600 font-bold tracking-widest text-[20px] mb-1">
            CRISPR LEARNING
          </h4>
          <h1 className="text-xl font-black text-white tracking-tight">
            Textbook checklist Dashboard
          </h1>
        </div>

        <div className="space-y-8">
          {Object.keys(SUBJECT_CONFIG).map((subject) => (
            <div key={subject} className="space-y-3">
              <button
                onClick={() => handleSubjectChange(subject)}
                className={`text-[11px] font-black tracking-[0.2em] transition-colors ${selectedSubject === subject ? "text-blue-400" : "text-gray-600 hover:text-gray-400"}`}
              >
                {subject}
              </button>
              <div className="space-y-1">
                {SUBJECT_CONFIG[subject].map((chapter) => (
                  <button
                    key={chapter}
                    onClick={() => setSelectedChapter(chapter)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center justify-between group ${
                      selectedSubject === subject && selectedChapter === chapter
                        ? "bg-white/5 text-white"
                        : "text-gray-500 hover:text-gray-300 hover:bg-white/[0.02]"
                    }`}
                  >
                    <span className="truncate pr-2">{chapter}</span>
                    {selectedSubject === subject &&
                      selectedChapter === chapter && (
                        <ChevronRight className="w-3 h-3 text-blue-500" />
                      )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-4 md:p-8 pb-72 lg:pb-40">
        <div className="max-w-5xl mx-auto">
          {/* Mobile Navigation */}
          <div className="lg:hidden mb-8 space-y-4">
            <div className="flex gap-2 bg-[#141414] p-1 rounded-xl border border-white/5">
              {Object.keys(SUBJECT_CONFIG).map((s) => (
                <button
                  key={s}
                  onClick={() => handleSubjectChange(s)}
                  className={`flex-1 py-2 rounded-lg text-[10px] font-bold tracking-widest ${selectedSubject === s ? "bg-blue-600 text-white" : "text-gray-500"}`}
                >
                  {s}
                </button>
              ))}
            </div>
            <select
              value={selectedChapter}
              onChange={(e) => setSelectedChapter(e.target.value)}
              className="w-full bg-[#141414] border border-white/5 rounded-xl px-4 py-3 text-sm font-medium text-white appearance-none outline-none"
            >
              {SUBJECT_CONFIG[selectedSubject].map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <header className="mb-10">
            <div className="flex items-center gap-3 mb-2">
              <div className="px-2 py-1 bg-blue-500/10 border border-blue-500/20 rounded text-[10px] font-bold text-blue-400 tracking-widest uppercase">
                {selectedSubject}
              </div>
              {!isLoaded && (
                <span className="text-[10px] text-gray-600 font-bold animate-pulse">
                  LOADING...
                </span>
              )}
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
              {selectedChapter}
            </h2>
            <p className="text-gray-500 text-sm mt-2">
              Quality audit & content verification checklist
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {CHECKLIST_DATA.map((section) => (
              <div key={section.id} className="space-y-4">
                <div
                  className={`flex items-center gap-2 border-b border-white/10 pb-3 ${section.color}`}
                >
                  {section.icon}
                  <h3 className="text-[10px] font-black tracking-[0.15em] uppercase">
                    {section.title}
                  </h3>
                </div>
                <div className="space-y-2">
                  {section.items.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => toggleItem(item.id)}
                      className={`group flex items-start gap-3 cursor-pointer select-none p-2 -mx-2 rounded-xl transition-all ${
                        checkedItems[item.id]
                          ? "bg-white/[0.03]"
                          : "hover:bg-white/[0.03]"
                      }`}
                    >
                      <div
                        className={`mt-0.5 flex-shrink-0 w-4 h-4 rounded-md border-2 transition-all flex items-center justify-center ${
                          checkedItems[item.id]
                            ? sectionColorToBorder(section.color) +
                              " " +
                              sectionColorToBg(section.color)
                            : "border-white/10 group-hover:border-white/20"
                        }`}
                      >
                        {checkedItems[item.id] && (
                          <div className="w-1.5 h-1.5 bg-black rounded-full" />
                        )}
                      </div>
                      <div className="flex flex-col">
                        <span
                          className={`text-xs leading-relaxed transition-colors ${
                            checkedItems[item.id]
                              ? "text-gray-200"
                              : "text-gray-500 group-hover:text-gray-400"
                          }`}
                        >
                          <span
                            className={`font-black mr-2 opacity-40 text-[9px] ${section.color}`}
                          >
                            {item.id}
                          </span>
                          {item.text}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Persistence Indicator HUD */}
      <footer className="fixed bottom-6 right-6 left-6 lg:left-[calc(16rem+1.5rem)] max-w-5xl mx-auto z-50">
        <div className="bg-[#111]/90 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl p-4 md:p-5">
          <div className="flex items-center gap-6">
            <div className="relative w-14 h-14 flex-shrink-0">
              <svg className="w-full h-full -rotate-90">
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  fill="none"
                  stroke="#1a1a1a"
                  strokeWidth="4"
                />
                <circle
                  cx="28"
                  cy="28"
                  r="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeDasharray={2 * Math.PI * 24}
                  strokeDashoffset={
                    2 * Math.PI * 24 * (1 - progressPercentage / 100)
                  }
                  strokeLinecap="round"
                  className="text-yellow-500 transition-all duration-700 ease-out"
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-xs font-black text-white">
                {Math.round(progressPercentage)}%
              </span>
            </div>

            <div className="flex-grow">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <h5 className="text-[10px] font-black text-gray-500 tracking-widest uppercase">
                    Saved to Local Storage
                  </h5>
                  <p className="text-white text-xs font-bold">
                    {completedCount} of 30 checkpoints verified
                  </p>
                </div>
                <button
                  onClick={() =>
                    window.confirm("Clear progress for this chapter?") &&
                    setCheckedItems({})
                  }
                  className="text-[9px] font-black text-gray-600 hover:text-red-400 flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" /> RESET CHAPTER
                </button>
              </div>
              <div className="h-1 bg-[#1a1a1a] rounded-full overflow-hidden flex gap-0.5">
                {CHECKLIST_DATA.map((sec) => {
                  const secCount = sec.items.length;
                  const secChecked =
                    (checkedItems &&
                      sec.items.filter((i) => checkedItems[i.id]).length) ||
                    0;
                  return (
                    <div
                      key={sec.id}
                      style={{ width: `${(secCount / 36) * 100}%` }}
                      className={`h-full transition-all duration-500 ${secChecked === secCount ? sectionColorToBg(sec.color) : secChecked > 0 ? sectionColorToBg(sec.color) + " opacity-40" : "bg-white/5"}`}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </footer>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
      `,
        }}
      />
    </div>
  );
};

function sectionColorToBg(textColorClass) {
  const map = {
    "text-yellow-500": "bg-yellow-500",
    "text-blue-400": "bg-blue-400",
    "text-purple-400": "bg-purple-400",
    "text-orange-500": "bg-orange-500",
    "text-orange-400": "bg-orange-400",
    "text-green-500": "bg-green-500",
    "text-yellow-600": "bg-yellow-600",
    "text-green-400": "bg-green-400",
    "text-red-500": "bg-red-500",
  };
  return map[textColorClass] || "bg-gray-500";
}

function sectionColorToBorder(textColorClass) {
  const map = {
    "text-yellow-500": "border-yellow-500",
    "text-blue-400": "border-blue-400",
    "text-purple-400": "border-purple-400",
    "text-orange-500": "border-orange-500",
    "text-orange-400": "border-orange-400",
    "text-green-500": "border-green-500",
    "text-yellow-600": "border-yellow-600",
    "text-green-400": "border-green-400",
    "text-red-500": "border-red-500",
  };
  return map[textColorClass] || "border-gray-500";
}

export default App;
