import { Sparkles } from "lucide-react";

const Header = ({ status }) => {
  if (status !== "idle") return null;

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-4 sm:px-8 min-h-[55vh]">
      <header className="max-w-4xl mx-auto flex flex-col items-center text-center select-none animate-fade-in-up px-2">
        <h1 className="serif-title text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-[#fdf6e3]">
          The Arena of <span className="italic text-[#f59e0b]">Intellect</span>
        </h1>
        <p className="text-xs md:text-sm text-[#8d7d6b] max-w-xl mt-4 leading-relaxed">
          Engage in a balanced dialogue between two neural entities. Witness the synthesis of logic and creativity.
        </p>
        
        {/* Welcome Message Card */}
        <div className="mt-10 p-5 sm:p-6 max-w-lg rounded-2xl warm-glass border border-white/5 shadow-2xl text-left select-text relative overflow-hidden group animate-fade-in-up">
          <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-[#f59e0b]/10 to-transparent rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-110"></div>
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#f59e0b] mb-2.5 flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#f59e0b]" />
            Welcome to the Arena
          </h3>
          <p className="text-xs text-[#a39482] leading-relaxed">
            Enter any query in the input below. **Mistral AI** and **Cohere** will generate competing solutions, which are then evaluated and integrated by **Gemini's Synthesis** to deliver a single unified consensus.
          </p>
        </div>
      </header>
    </div>
  );
};

export default Header;
