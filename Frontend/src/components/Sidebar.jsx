import { Leaf, Feather, X, Trash2 } from "lucide-react";

const Sidebar = ({
  clashes = [],
  activeClashId,
  onSelectClash,
  onDeleteClash,
  onNewClash,
  isOpen,
  onClose,
}) => {
  return (
    <aside
      className={`fixed inset-y-0 left-0 w-72 h-screen bg-[#0e0c0a] border-r border-[#2a2621] flex flex-col z-50 select-none transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      {/* Brand Header */}
      <div className="p-8 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#2a241d] flex items-center justify-center border border-[#443a2d] shadow-inner">
            <Leaf className="text-[#f59e0b] w-5 h-5" />
          </div>
          <div>
            <h1 className="serif-title text-2xl font-medium tracking-tight text-[#fdf6e3]">Earthen</h1>
            <p className="text-[9px] text-[#6b5c4d] tracking-widest uppercase -mt-1 font-bold">Arena AI Battle</p>
          </div>
        </div>
        
        {/* Mobile close button */}
        <button
          onClick={onClose}
          className="lg:hidden p-1.5 text-[#6b5c4d] hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
          title="Close sidebar"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Action Button */}
      <div className="px-6 mb-4">
        <button
          onClick={onNewClash}
          className="flex items-center justify-center gap-2.5 w-full py-3 rounded-2xl bg-[#2a241d] hover:bg-[#3d3329] border border-[#443a2d] text-[#f59e0b] font-medium transition-all shadow-lg active:scale-95 cursor-pointer hover:shadow-orange-950/20"
        >
          <Feather className="w-4 h-4" />
          New Sequence
        </button>
      </div>

      {/* Scrollable History List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-6 pb-6 mt-4">
        <h2 className="text-[10px] text-[#6b5c4d] tracking-widest uppercase font-bold mb-4">
          Battle Sequences
        </h2>
        {clashes.length === 0 ? (
          <div className="text-center py-8 border border-dashed border-[#2a2621]/40 rounded-2xl">
            <p className="text-xs text-[#6b5c4d] italic">No historical runs</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {clashes.map((clash) => {
              const isActive = clash.id === activeClashId;
              return (
                <div
                  key={clash.id}
                  onClick={() => onSelectClash(clash)}
                  className={`group relative p-4 rounded-2xl cursor-pointer transition-all duration-300 border flex justify-between items-center gap-3 ${
                    isActive
                      ? "bg-[#2a241d] border-[#f59e0b]/30 text-[#f59e0b] shadow-md shadow-orange-950/10"
                      : "bg-[#12100e]/50 border-[#2a2621]/40 text-[#8d7d6b] hover:text-[#d6c5ae] hover:bg-[#2a241d]/30 hover:border-[#443a2d]"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-semibold truncate ${isActive ? "text-[#fdf6e3]" : "text-[#d6c5ae]"}`}>
                      {clash.title || clash.prompt}
                    </p>
                    <p className="text-[9px] text-[#6b5c4d] truncate mt-0.5 font-medium">
                      {clash.prompt}
                    </p>
                  </div>
                  <button
                    onClick={(e) => onDeleteClash(clash.id, e)}
                    className="p-1.5 text-[#6b5c4d] hover:text-red-400 hover:bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-200 cursor-pointer flex-shrink-0"
                    title="Delete sequence"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
