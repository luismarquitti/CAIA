"use client";

import React, { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { FileNode } from '@/components/ui/TreeItem';

interface DocumentViewerProps {
    selectedNode: FileNode | null;
}

type FileContent = {
    path: string;
    content: string;
    metadata?: any;
    error?: string;
    type: 'markdown' | 'text';
};

export default function DocumentViewer({ selectedNode }: DocumentViewerProps) {
    const [data, setData] = useState<FileContent[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!selectedNode) return;

        const fetchData = async () => {
            setLoading(true);
            setData([]);

            try {
                if (selectedNode.is_dir) {
                    // 1. Fetch contents of folder to get list of files
                    const treeRes = await fetch(`http://localhost:8000/api/tree?path=${selectedNode.path}`);
                    if (!treeRes.ok) throw new Error("Failed to list directory");
                    const files: FileNode[] = await treeRes.json();

                    // 2. Fetch content for each file (parallel)
                    // Filter to only text-like files we can display
                    const readableFiles = files.filter(f => !f.is_dir); // Only files only for now

                    const contentPromises = readableFiles.map(file =>
                        fetch(`http://localhost:8000/api/file/${file.path}`).then(r => r.json())
                    );

                    const contents = await Promise.all(contentPromises);
                    setData(contents);

                } else {
                    // Single file fetch
                    const res = await fetch(`http://localhost:8000/api/file/${selectedNode.path}`);
                    if (res.ok) {
                        const content = await res.json();
                        setData([content]);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch content", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedNode]);

    if (!selectedNode) {
        return (
            <div className="flex-1 flex items-center justify-center text-slate-500">
                <div className="flex flex-col items-center gap-2">
                    <span className="material-symbols-outlined text-4xl opacity-50">toc</span>
                    <p>Select an item from AI Settings to view details</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="flex-1 flex items-center justify-center text-primary">
                <span className="material-symbols-outlined text-4xl animate-spin">progress_activity</span>
            </div>
        );
    }

    return (
        <div className="flex-1 overflow-y-auto bg-background-dark">
            <div className="max-w-[850px] mx-auto py-12 px-8">

                {/* Header */}
                <div className="mb-10 pb-4 border-b border-slate-border">
                    <h1 className="text-2xl font-bold text-white flex items-center gap-3">
                        <span className="material-symbols-outlined text-slate-500">folder_open</span>
                        {selectedNode.path}
                    </h1>
                </div>

                {/* Content List */}
                <div className="flex flex-col gap-12">
                    {data.map((item, index) => (
                        <div key={item.path} className="flex flex-col gap-6">
                            {/* File Context Header */}
                            {data.length > 1 && (
                                <div className="flex items-center gap-2 text-sm text-primary font-mono bg-primary/10 px-3 py-1 rounded w-fit self-start">
                                    <span className="material-symbols-outlined text-xs">description</span>
                                    {item.path.split('/').pop()}
                                </div>
                            )}

                            {/* Metadata Block (if exists) */}
                            {item.metadata && Object.keys(item.metadata).length > 0 && (
                                <div className="bg-slate-panel border border-slate-border rounded-lg p-4 mb-4">
                                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-2">
                                        <span className="material-symbols-outlined text-base">info</span>
                                        Metadata
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                                        {Object.entries(item.metadata).map(([key, value]) => (
                                            <div key={key} className="flex flex-col">
                                                <span className="text-[10px] text-slate-500 uppercase">{key}</span>
                                                <span className="text-sm text-slate-300 font-mono break-all">
                                                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Markdown Renderer */}
                            <div className="prose prose-invert prose-slate max-w-none 
                                prose-headings:font-bold prose-headings:tracking-tight prose-h1:text-3xl prose-h2:text-2xl 
                                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                                prose-pre:bg-slate-950 prose-pre:border prose-pre:border-slate-800
                                prose-img:rounded-xl prose-img:border prose-img:border-slate-800">
                                {item.type === 'markdown' ? (
                                    <ReactMarkdown
                                        remarkPlugins={[remarkGfm]}
                                        rehypePlugins={[rehypeHighlight]}
                                    >
                                        {item.content}
                                    </ReactMarkdown>
                                ) : (
                                    <pre className="bg-slate-950 p-4 rounded-lg overflow-x-auto text-sm font-mono text-slate-300 border border-slate-800">
                                        <code>{item.content}</code>
                                    </pre>
                                )}
                            </div>

                            {/* Separator */}
                            {index < data.length - 1 && <hr className="border-slate-800 my-8" />}
                        </div>
                    ))}

                    {data.length === 0 && (
                        <p className="text-slate-500 italic">No viewable files in this directory.</p>
                    )}
                </div>

            </div>
        </div>
    );
}
