# UI/UX - CAIA (Central de Artefatos de IA)

Este documento define as diretrizes de Interface e Experiência do Usuário para o projeto CAIA.

## 1. Layout & Estrutura

A interface deve seguir um layout de **Dashboard de Ferramenta de Desenvolvimento** (similar a VS Code, Linear, ou Vercel Dashboard), otimizado para leitura e gestão de densidade de informação.

### Grid Principal
O layout é dividido em 3 áreas principais:

1.  **Sidebar Lateral (Esquerda)**:
    *   **Navegação Primária**: Ícones para alternar contextos (Projetos, Busca Global, Configurações).
    *   **Árvore de Artefatos**: Estrutura de pastas e arquivos do workspace atual. Deve suportar aninhamento e ícones distintos por tipo de artefato (.md, .py, .agent).
    *   **Status de Agentes**: Indicadores visuais de agentes ativos (@Planner, @Red, @Green).

2.  **Top Bar (Superior)**:
    *   **Breadcrumbs**: Caminho do artefato atual (ex: `caia / backend / PLAN.md`).
    *   **Command Palette**: Barra de busca centralizada (Ctrl+K) para pular rapidamente entre arquivos.
    *   **Ações de Contexto**: Botões de ação rápida para o arquivo aberto (ex: "Editar", "Gerar Plano", "Rodar Testes").

3.  **Main Content (Centro)**:
    *   **Viewer/Editor**: Área de renderização de Markdown com suporte a *syntax highlighting*, diagramas Mermaid e tabelas.
    *   **Split View**: Capacidade de abrir dois artefatos lado a lado (ex: SPEC.md à esquerda, PLAN.md à direita).

## 2. Estética & Design System

O visual deve ser "Premium Developer Tool". Minimalista, alto contraste, focado em tipografia e legibilidade.

### Tipografia
*   **Fonte Principal**: `Inter` ou `Geist Sans` (Sans-serif moderna, excelente para UI).
*   **Fonte de Código**: `JetBrains Mono` ou `Fira Code` (com ligaduras).

### Paleta de Cores
*   **Tema**: Dark Mode first (padrão para dev tools).
*   **Fundo**: Tons de cinza muito escuros (Zinc/Slate 900+), evitando preto absoluto (#000) para reduzir fadiga ocular.
*   **Acentos**:
    *   **Azul/Violeta**: Elementos de foco, botões primários e links.
    *   **Verde/Vermelho/Amarelo**: Semântica de testes (TDD - Red/Green/Refactor).
    *   **Bordas**: Linhas sutis (1px) sem sombras pesadas. Uso de "glassmorphism" apenas em overlays (modais, command palette).

### Componentes Chave
*   **Cards**: Planos e Tasks devem ser exibidos em cards com bordas sutis.
*   **Badges**: Tags coloridas para status de tarefas (Todo, Doing, Done).
*   **Terminal Output**: Componente para exibir logs de execução dos agentes.

---

## 3. Exemplo de Prompt para IA (Google Stitch / v0)

Utilize o prompt abaixo para gerar o protótipo inicial da interface. Este prompt foi otimizado para fornecer contexto rico sobre a natureza "DevTool" da aplicação.

```markdown
**Role:**
You are a Lead Product Designer specializing in "Developer Tools" and complex SaaS interfaces (like Vercel, Linear, VS Code). Your aesthetic is "High-Performance Dark Mode": minimalist, crisp borders, subtle transparency, and perfect typography.

**Goal:**
Create a high-fidelity UI prototype for "CAIA" (AI Artifact Center), a local web app that manages software documentation and AI agents.

**Core Layout Specification:**
1.  **Sidebar (Left, Fixed, ~280px width):**
    *   Top: Project selector dropdown (minimalist).
    *   Middle: "File Explorer" tree view. Use distinct icons for folders, Markdown files, and Code. Highlight "SPEC.md" and "PLAN.md" with special accent colors/icons.
    *   Bottom: User profile and "Agent Status" widget (3 dots: Red, Green, Blue pulsing slowly).
    *   Style: Darker background than main content (e.g., slate-950), 1px right border (slate-800).

2.  **Top Bar (Top, Fixed, ~48px height):**
    *   Left: Breadcrumbs (Home > Project > SPEC.md).
    *   Center: "Command Palette" trigger input (Search artifacts...). Looks like a sleek search bar.
    *   Right: Context Actions (Button "Edit", Button "Run Agent").
    *   Style: Glassmorphism effect (backdrop-blur), bottom border.

3.  **Main Content Area (Fluid):**
    *   Render a rich "Document Viewer" showing a Markdown file.
    *   Include: A large title "Specification.md", a metadata block (Author, Date), and stylized body content (headers, bullet points, and a code block).
    *   Aesthetics: White text on dark gray background (slate-900). Use "Inter" font.

**Visual Style & Design System:**
*   **Theme:** Dark Mode Only.
*   **Colors:** Backgrounds in Zinc/Slate (950 to 800). Accents in Indigo (primary) and Emerald (success).
*   **Surfaces:** Low elevation. Use 1px borders (slate-800) instead of heavy drop shadows to define separation.
*   **Typography:** Headings in Inter (Bold), Body in Inter (Regular), Code snippets in JetBrains Mono.

**Constraint:**
*   Do NOT create a generic "Admin Dashboard" with charts and graphs. This is a text-heavy, code-centric productivity tool.
*   Focus on the "File Tree" and "Document Reading" experience.

**Deliverable:**
*   HTML/Tailwind CSS code or a high-fidelity mockup image demonstrating this layout.
```
