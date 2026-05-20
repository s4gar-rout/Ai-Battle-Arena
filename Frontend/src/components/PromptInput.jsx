import { useRef, useEffect } from "react";
import { Globe, RefreshCw, Send } from "lucide-react";

const PromptInput = ({ promptInput, setPromptInput, onSubmit, status }) => {
  const textareaRef = useRef(null);

  // Handle keyboard submission (Ctrl+Enter or Enter without Shift)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit();
    }
  };

  // Auto-resize prompt textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [promptInput]);

  return (
    <footer className="absolute bottom-0 left-0 w-full p-4 sm:p-8 bg-gradient-to-t from-[#12100e] via-[#12100e] to-transparent z-40">
      <div className="max-w-5xl mx-auto">
        {/* Input Bar */}
        <div className="warm-glass rounded-3xl p-3 flex items-center gap-4 shadow-2xl relative border-white/10 hover:border-[#f59e0b]/20 transition-all duration-300">
          <div className="pl-4 py-1 text-[#f59e0b] flex items-center justify-center">
            <Globe className="w-5 h-5 text-[#f59e0b]" />
          </div>

          <textarea
            ref={textareaRef}
            rows={1}
            value={promptInput}
            onChange={(e) => setPromptInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 text-[#fdf6e3] placeholder-[#6b5c4d] py-3 text-[15px] sm:text-base resize-none custom-scrollbar outline-none max-h-32"
            placeholder="Craft your inquiry with intent..."
          />

          <div className="flex items-center gap-2.5 pr-2">
            <button
              id="btn-send-prompt"
              onClick={onSubmit}
              disabled={status === "generating" || !promptInput.trim()}
              className={`h-11 px-5 rounded-2xl flex items-center justify-center gap-2 font-semibold text-xs tracking-wider uppercase transition-all shadow-xl ${status === "generating" || !promptInput.trim()
                  ? "bg-white/5 text-[#6b5c4d] cursor-not-allowed border border-transparent"
                  : "bg-gradient-to-r from-[#f59e0b] to-[#d97706] text-[#12100e] cursor-pointer hover:scale-[1.03] active:scale-[0.97] hover:shadow-[#f59e0b]/15 border border-[#f59e0b]/20"
                }`}
              title="Engage clash"
            >
              {status === "generating" ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Reflecting</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Engage</span>
                </>
              )}
            </button>
          </div>
        </div>
        <p className="text-center mt-4 text-[9px] text-[#6b5c4d] uppercase tracking-[0.3em] opacity-60">
          Trained on the collective wisdom of Earth's digital heritage
        </p>
      </div>
    </footer>
  );
};

export default PromptInput;
