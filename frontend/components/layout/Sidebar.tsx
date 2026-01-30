"use client";

import React from 'react';
import TreeItem, { FileNode } from '@/components/ui/TreeItem';

interface SidebarProps {
    selectedPath?: string;
    onSelectCallback: (node: FileNode) => void;
}

export default function Sidebar({ selectedPath, onSelectCallback }: SidebarProps) {
    // Define static root nodes - "AI Settings" points to .github
    const rootNodes: FileNode[] = [
        {
            name: "AI Settings",
            path: ".github",
            is_dir: true,
            children: []
        }
    ];

    return (
        <aside className="w-[280px] bg-slate-panel border-r border-slate-border flex flex-col shrink-0 h-full">
            {/* Project Header */}
            <div className="p-4 flex items-center gap-3 border-b border-slate-border">
                <div className="size-10 rounded-lg bg-primary flex items-center justify-center text-white shadow-lg">
                    <span className="material-symbols-outlined">dataset</span>
                </div>
                <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                        <h1 className="text-white text-sm font-semibold">CAIA Project</h1>
                        <span className="material-symbols-outlined text-xs text-slate-500">expand_more</span>
                    </div>
                    <p className="text-slate-500 text-xs">v1.2.0-stable</p>
                </div>
            </div>

            {/* Navigation Tree */}
            <div className="flex-1 overflow-y-auto py-4 px-2">
                <div className="flex flex-col gap-1">
                    <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Workspace
                    </div>

                    {rootNodes.map((node) => (
                        <TreeItem
                            key={node.path}
                            node={node}
                            selectedPath={selectedPath}
                            onSelect={onSelectCallback}
                        />
                    ))}

                    {/* Static placeholders for visual parity with design until verified */}
                    <div className="mt-4 px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        Shortcuts
                    </div>
                    <div className="flex items-center gap-2 px-3 py-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg cursor-pointer transition-colors">
                        <span className="material-symbols-outlined text-[20px]">settings</span>
                        <span className="text-sm font-medium">Config Setup</span>
                    </div>
                </div>
            </div>

            {/* Sidebar Bottom (User & Agent Status) */}
            <div className="p-4 border-t border-slate-border flex flex-col gap-4 mt-auto">
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <div className="size-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></div>
                        </div>
                        <span className="text-xs font-medium text-slate-400 uppercase tracking-wider">Agent Status</span>
                    </div>
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-500 px-1.5 py-0.5 rounded border border-emerald-500/20">Active</span>
                </div>

                <div className="flex items-center gap-3 p-2 bg-white/5 rounded-xl border border-white/5">
                    <div
                        className="size-9 rounded-full bg-cover bg-center ring-2 ring-primary/20"
                        style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDFX7NOfsNjMSQ-Jz-gqzvcLrlamHhLLAZZLf3P03wMPd1fFcOlKwLCmaULFV1FJfHapwAnVB-GXesOZVw0FvZW7mNOyNQVon-yLap0SP1vyoGVdAGEbd_4Lhiev1KQ2yqR0DV2_xofEU1COPDqKFpY_RS7pcZiA8tOPio3tlHzUTkcwOjbot14AJX3nAU6hng1SLEQGa51D3g-FOXKxOyJnkIT28km-nQnAdOhEYHZp1W-tL41cIye2x5DNlyUKmSipA1jAE4zhd0')" }}
                    />
                    <div className="flex flex-col">
                        <p className="text-sm font-medium text-white">Alex Dev</p>
                        <p className="text-[10px] text-slate-500">Pro Developer</p>
                    </div>
                    <span className="material-symbols-outlined text-slate-500 ml-auto cursor-pointer hover:text-white transition-colors">logout</span>
                </div>
            </div>
        </aside>
    );
}
