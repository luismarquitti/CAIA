import React from 'react';

export default function TopBar() {
    return (
        <header className="glass-effect border-b border-slate-border px-6 h-16 flex items-center justify-between sticky top-0 z-50">
            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-500 hover:text-slate-300 cursor-pointer">Home</span>
                <span className="material-symbols-outlined text-xs text-slate-700">chevron_right</span>
                <span className="text-slate-500 hover:text-slate-300 cursor-pointer">Project</span>
                <span className="material-symbols-outlined text-xs text-slate-700">chevron_right</span>
                <span className="text-white font-medium">SPEC.md</span>
            </div>

            {/* Command Palette Search */}
            <div className="flex-1 max-w-xl px-12">
                <div className="relative">
                    <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500">
                        <span className="material-symbols-outlined text-[20px]">search</span>
                    </div>
                    <input
                        className="w-full bg-background-dark/50 border border-slate-border rounded-lg py-2 pl-10 pr-12 text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
                        placeholder="Search artifacts... (Ctrl + K)"
                        type="text"
                    />
                    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                        <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-semibold text-slate-500 bg-slate-800 border border-slate-700 rounded-md">⌘ K</kbd>
                    </div>
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold rounded-lg transition-all border border-slate-700 cursor-pointer">
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                    Edit
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/90 text-white text-sm font-semibold rounded-lg shadow-lg shadow-primary/20 transition-all cursor-pointer">
                    <span className="material-symbols-outlined text-[18px]">play_arrow</span>
                    Run Agent
                </button>
            </div>
        </header>
    );
}
