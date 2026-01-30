"use client";

import React, { useState } from 'react';
import Sidebar from "@/components/layout/Sidebar";
import TopBar from "@/components/layout/TopBar";
import DocumentViewer from "@/components/layout/DocumentViewer";
import { FileNode } from '@/components/ui/TreeItem';

export default function Home() {
  const [selectedNode, setSelectedNode] = useState<FileNode | null>(null);

  const handleSelect = (node: FileNode) => {
    setSelectedNode(node);
  };

  return (
    <div className="flex h-screen w-full bg-background-dark text-slate-200 font-display overflow-hidden">
      <Sidebar
        selectedPath={selectedNode?.path}
        onSelectCallback={handleSelect}
      />
      <main className="flex-1 flex flex-col min-w-0">
        <TopBar />
        <DocumentViewer selectedNode={selectedNode} />
      </main>
    </div>
  );
}
