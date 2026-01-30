"use client";

import React, { useState } from 'react';

export type FileNode = {
    name: string;
    path: string;
    is_dir: boolean;
    size?: number;
    children?: FileNode[];
};

interface TreeItemProps {
    node: FileNode;
    level?: number;
    selectedPath?: string;
    onSelect: (node: FileNode) => void;
}

export default function TreeItem({ node, level = 0, selectedPath, onSelect }: TreeItemProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [children, setChildren] = useState<FileNode[]>([]);
    const [loading, setLoading] = useState(false);

    const isSelected = selectedPath === node.path;
    const paddingLeft = `${level * 1.25}rem`;

    const handleToggle = async (e: React.MouseEvent) => {
        e.stopPropagation();

        if (node.is_dir) {
            if (!isOpen && children.length === 0) {
                setLoading(true);
                try {
                    const res = await fetch(`http://localhost:8000/api/tree?path=${node.path}`);
                    if (res.ok) {
                        const data = await res.json();
                        setChildren(data);
                    }
                } catch (error) {
                    console.error("Failed to fetch children", error);
                } finally {
                    setLoading(false);
                }
            }
            setIsOpen(!isOpen);
        }

        // Always select on click, even if toggling
        onSelect(node);
    };

    const Icon = () => {
        if (loading) return <span className="material-symbols-outlined text-[18px] animate-spin">progress_activity</span>;
        if (node.is_dir) return <span className="material-symbols-outlined text-[18px] text-slate-400">{isOpen ? 'folder_open' : 'folder'}</span>;

        // File icons based on extension
        if (node.name.endsWith('.md')) return <span className="material-symbols-outlined text-[18px] text-indigo-400">description</span>;
        if (node.name.endsWith('.py')) return <span className="material-symbols-outlined text-[18px] text-yellow-400">code</span>;
        if (node.name.endsWith('.ts') || node.name.endsWith('.tsx')) return <span className="material-symbols-outlined text-[18px] text-blue-400">code</span>;

        return <span className="material-symbols-outlined text-[18px] text-slate-500">draft</span>;
    };

    return (
        <div className="flex flex-col select-none">
            <div
                className={`flex items-center gap-2 py-1.5 pr-2 text-sm cursor-pointer transition-colors border-l-2 ${isSelected
                        ? 'bg-primary/20 text-white border-primary'
                        : 'text-slate-400 hover:text-white hover:bg-white/5 border-transparent'
                    }`}
                style={{ paddingLeft: level === 0 ? '0.75rem' : `calc(${paddingLeft} + 0.75rem)` }}
                onClick={handleToggle}
            >
                <Icon />
                <span className={`truncate ${isSelected ? 'font-medium' : ''}`}>{node.name}</span>
            </div>

            {isOpen && node.is_dir && (
                <div className="flex flex-col">
                    {children.map((child) => (
                        <TreeItem
                            key={child.path}
                            node={child}
                            level={level + 1}
                            selectedPath={selectedPath}
                            onSelect={onSelect}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
