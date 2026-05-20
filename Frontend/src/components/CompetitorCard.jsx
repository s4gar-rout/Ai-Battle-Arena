/*
 * CompetitorCard.jsx
 *
 * This component displays a card for a competing AI model. It shows the model's
 * name, architecture, the engine used, and the response from the AI. It also
 * indicates whether the model is the winner of a battle.
 *
 * The code has been rewritten to be easy to read for beginners. Each block has
 * clear comments explaining its purpose.
 */

// CompetitorCard.jsx
// This component displays a card for an AI competitor, showing the model name,
// architecture, engine label, and the AI's response. It also indicates the winner.
// The code is written with clear comments to aid beginners.
import { useState } from "react";
import { Sun, Mountain, CheckCircle2, RefreshCw, Copy, Check } from "lucide-react";

/**
 * CodeBlock – a small component that renders a code snippet with a header that
 * displays the language and a button to copy the code to the clipboard.
 */
function CodeBlock({ code, language }) {
  const [copied, setCopied] = useState(false);

  // Copy the code to the clipboard and briefly show a "Copied" message.
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy code", err);
    }
  };

  return (
    <div className="border border-white/5 rounded-2xl overflow-hidden bg-black/30 my-4 shadow-xl">
      {/* Header – shows language name and copy button */}
      <div className="flex justify-between items-center px-4 py-2.5 bg-white/2 border-b border-white/5">
        <span className="text-[10px] font-bold text-[#6b5c4d] uppercase tracking-widest font-mono">
          {language || "code"}
        </span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider text-[#6b5c4d] hover:text-[#fdf6e3] hover:bg-white/5 transition-all cursor-pointer"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-500" />
              <span className="text-emerald-500">Copied</span>
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* The actual code content */}
      <pre className="p-5 overflow-x-auto font-mono text-xs leading-relaxed text-[#d6c5ae] bg-transparent">
        <code>{code}</code>
      </pre>
    </div>
  );
}

/**
 * renderTextWithInlineCode – converts back‑tick delimited inline code (e.g.
 * `example`) inside normal text into <code> elements so they are styled.
 */
function renderTextWithInlineCode(text) {
  if (!text) return "";
  const parts = text.split(/`([^`]+)`/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <code key={i} className="px-1.5 py-0.5 rounded bg-white/5 font-mono text-xs text-[#e2a265] border border-white/5">
        {part}
      </code>
    ) : (
      part
    )
  );
}

/**
 * parseContent – split a response string into an array of objects describing
 * plain text and code blocks. Code blocks are recognized by Markdown fences:
 * ```javascript\ncode\n```.
 */
function parseContent(text) {
  if (!text) return [];
  const parts = [];
  const regex = /```(\w*)\n([\s\S]*?)```/g;
  let lastIndex = 0;
  let match;
  while ((match = regex.exec(text)) !== null) {
    const before = text.slice(lastIndex, match.index);
    if (before) parts.push({ type: "text", content: before });
    parts.push({ type: "code", language: match[1] || "code", content: match[2] });
    lastIndex = regex.lastIndex;
  }
  const after = text.slice(lastIndex);
  if (after) parts.push({ type: "text", content: after });
  return parts;
}

/**
 * CompetitorCard – displays the information for a single AI model.
 *
 * Props:
 *   modelName   – Human‑readable name of the model (e.g. "Mistral AI").
 *   architecture – Short description of the model architecture.
 *   engineLabel – Text label for the inference engine (e.g. "Mistral Medium").
 *   response    – The raw response string returned from the backend.
 *   isWinner    – Boolean flag indicating if this model won the battle.
 *   status      – One of "idle", "generating", "completed", "error".
 *   iconType    – Either "sun" or "mountain" to choose an icon.
 */
function CompetitorCard({
  modelName,
  architecture,
  engineLabel,
  response,
  isWinner,
  status,
  iconType,
}) {
  // Determine border colour based on whether this card is the winner.
  const cardBorderClass = isWinner ? "border-[#f59e0b]/20 amber-glow" : "border-white/5 hover:border-white/10";

  return (
    <div className={`warm-glass rounded-[2rem] p-8 flex flex-col min-h-[460px] relative transition-all duration-300 hover:scale-[1.01] ${cardBorderClass}`}>
      {/* Winner badge – shown only when isWinner is true */}
      {isWinner && (
        <div className="absolute -top-3 right-6 px-4.5 py-1.5 rounded-full bg-[#f59e0b] text-[#12100e] text-[10px] font-extrabold uppercase tracking-widest shadow-xl">
          Winner
        </div>
      )}

      {/* Header – icon, model name and engine label */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconType === "sun" ? "bg-orange-500/10 text-[#f59e0b]" : "bg-emerald-500/10 text-emerald-400"}`}>
            {iconType === "sun" ? <Sun className="w-5 h-5" /> : <Mountain className="w-5 h-5" />}
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#fdf6e3] flex items-center gap-2">
              {modelName}
              {engineLabel && (
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-white/5 text-[#8b7a68] font-mono font-medium">
                  {engineLabel}
                </span>
              )}
            </h3>
            <p className="text-[10px] text-[#6b5c4d] uppercase tracking-widest font-bold">
              {architecture}
            </p>
          </div>
        </div>

        {/* Status indicator – shows a spinner while generating, a check when done, or a waiting label */}
        <div className="flex items-center gap-2">
          {status === "generating" ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 text-[#f59e0b] animate-spin" />
              <span className="text-[10px] font-bold text-[#f59e0b] uppercase tracking-widest">Reflecting</span>
            </>
          ) : response ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Grounded</span>
            </>
          ) : (
            <span className="text-[10px] font-bold text-[#6b5c4d] uppercase tracking-widest">Awaiting</span>
          )}
        </div>
      </div>

      {/* Main content – either a loading skeleton, the formatted response, or idle text */}
      <div className="flex-1 space-y-4 select-text">
        {status === "generating" && !response ? (
          // Simple loading skeleton – five grey bars.
          <div className="space-y-3 pt-2">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-3 w-full skeleton-warm rounded-full"></div>
            ))}
          </div>
        ) : response ? (
          // Render the response. It may contain Markdown code blocks.
          parseContent(response).map((part, idx) =>
            part.type === "code" ? (
              <CodeBlock key={idx} code={part.content} language={part.language} />
            ) : (
              part.content.split("\n\n").map((para, pIdx) => (
                <p key={`${idx}-${pIdx}`} className="text-[#d6c5ae] leading-relaxed text-sm antialiased font-normal">
                  {renderTextWithInlineCode(para)}
                </p>
              ))
            )
          )
        ) : (
          // Idle placeholder when there is no response yet.
          <div className="h-full flex items-center justify-center">
            <p className="text-sm text-[#6b5c4d] italic text-center px-4 py-8">
              "The silence of the arena awaits your inquiry..."
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default CompetitorCard;
