import { useState } from "react";
import Sidebar from "./components/Sidebar";
import CompetitorCard from "./components/CompetitorCard";
import JudgeSynthesis from "./components/JudgeSynthesis";
import Header from "./components/Header";
import PromptInput from "./components/PromptInput";
import { runSimulation } from "./utils/simulation";
import { AlertTriangle, Compass, Menu } from "lucide-react";

const App = () => {
  // State variables
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeClash, setActiveClash] = useState(null);
  const [status, setStatus] = useState("idle"); // 'idle' | 'generating' | 'completed' | 'error'
  const [promptInput, setPromptInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [clashes, setClashes] = useState(() => {
    try {
      const saved = localStorage.getItem("ai_battle_clashes");
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load clashes from localStorage", e);
      return [];
    }
  });


  // Handle New Clash button click
  const handleNewClash = () => {
    setActiveClash(null);
    setStatus("idle");
    setPromptInput("");
  };

  // Select clash from history
  const handleSelectClash = (clash) => {
    setActiveClash(clash);
    setStatus("completed");
    setPromptInput("");
  };

  // Delete clash from history
  const handleDeleteClash = (id, e) => {
    e?.stopPropagation();
    const updated = clashes.filter((c) => c.id !== id);
    setClashes(updated);
    try {
      localStorage.setItem("ai_battle_clashes", JSON.stringify(updated));
    } catch (err) {
      console.error("Failed to save clashes to localStorage", err);
    }
    if (activeClash && activeClash.id === id) {
      handleNewClash();
    }
  };

  // Submit Prompt
  const handleSubmitPrompt = async () => {
    const trimmedPrompt = promptInput.trim();
    if (!trimmedPrompt) return;

    setStatus("generating");
    setErrorMessage("");
    setPromptInput("");

    // Create temporary placeholder for competitor panels
    const tempClash = {
      id: "temp",
      prompt: trimmedPrompt,
      model_1: "Mistral AI",
      model_2: "Cohere",
      engine_1: "Mistral Medium",
      engine_2: "Cohere Command",
      solution_1: "",
      solution_2: "",
      judge: null,
    };
    setActiveClash(tempClash);

    try {
      const result = await runSimulation(trimmedPrompt);
      setActiveClash(result);
      setStatus("completed");

      // Update clashes list and save to localStorage
      setClashes((prevClashes) => {
        const updated = [result, ...prevClashes.filter((c) => c.id !== "temp")];
        try {
          localStorage.setItem("ai_battle_clashes", JSON.stringify(updated));
        } catch (err) {
          console.error("Failed to save clashes to localStorage", err);
        }
        return updated;
      });
    } catch (error) {
      console.error("Error generating clash:", error);
      setErrorMessage("Failed to run simulation. Please try again.");
      setStatus("error");
      setActiveClash(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#12100e] flex overflow-hidden text-[#d6c5ae] antialiased">
      {/* Sidebar Navigation */}
      <Sidebar
        clashes={clashes}
        activeClashId={activeClash?.id}
        onSelectClash={handleSelectClash}
        onDeleteClash={handleDeleteClash}
        onNewClash={() => {
          handleNewClash();
          setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Mobile Sidebar backdrop overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 lg:hidden transition-opacity duration-300"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Panel */}
      <main className="flex-1 relative flex flex-col overflow-hidden h-screen">
        {/* Mobile Sidebar Menu Button */}
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden p-3.5 text-[#6b5c4d] hover:text-[#fdf6e3] hover:bg-white/5 rounded-2xl absolute top-4 left-4 z-40 cursor-pointer transition-all duration-200 border border-transparent hover:border-white/5 active:scale-95"
          title="Open sidebar"
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Soft Golden Header Aura */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-gradient-to-b from-[#f59e0b]/5 to-transparent pointer-events-none -z-10"></div>

        {/* Scrollable Viewport Container */}
        <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col justify-between pb-40">
          <div className="w-full flex-1 flex flex-col">
            {/* Header branding info */}
            <Header status={status} />

            {/* Error Message */}
            {errorMessage && (
              <div className="max-w-4xl mx-auto px-4 sm:px-8 mb-8 mt-8">
                <div className="p-4.5 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-start gap-3.5 select-text animate-fade-in-up">
                  <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                  <p className="text-sm leading-relaxed">{errorMessage}</p>
                </div>
              </div>
            )}

            {/* Active Prompt Banner */}
            {status !== "idle" && activeClash && activeClash.prompt && (
              <div className="max-w-4xl mx-auto px-4 sm:px-8 mb-8 mt-12">
                <div className="p-4 rounded-2xl bg-white/2 border border-white/5 flex gap-3.5 items-center select-text">
                  <Compass className="w-5 h-5 text-[#f59e0b] flex-shrink-0" />
                  <p className="text-[#fdf6e3] text-sm font-medium italic">
                    "{activeClash.prompt}"
                  </p>
                </div>
              </div>
            )}

            {/* Competitor Panels Grid */}
            {status !== "idle" && (
              <div className="max-w-6xl mx-auto px-4 sm:px-8 grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12 flex-1 mt-6">
                <CompetitorCard
                  modelName="Mistral AI"
                  architecture="Sparse Mixture-of-Experts"
                  engineLabel={activeClash?.engine_1}
                  response={activeClash?.solution_1}
                  isWinner={
                    status === "completed" &&
                    activeClash?.judge?.solution_1_score > activeClash?.judge?.solution_2_score
                  }
                  status={status}
                  iconType="sun"
                />
                <CompetitorCard
                  modelName="Cohere"
                  architecture="Command R+ Architecture"
                  engineLabel={activeClash?.engine_2}
                  response={activeClash?.solution_2}
                  isWinner={
                    status === "completed" &&
                    activeClash?.judge?.solution_2_score > activeClash?.judge?.solution_1_score
                  }
                  status={status}
                  iconType="mountain"
                />
              </div>
            )}
          </div>

          {/* Judge verdict panel */}
          {status !== "idle" && (
            <JudgeSynthesis
              status={status}
              judgeData={activeClash?.judge}
              model1Name="Mistral AI"
              model2Name="Cohere"
            />
          )}
        </div>

        {/* Input Prompter Footer */}
        <PromptInput
          promptInput={promptInput}
          setPromptInput={setPromptInput}
          onSubmit={handleSubmitPrompt}
          status={status}
        />
      </main>
    </div>
  );
};

export default App;
