# Plano de Trabalho - CAIA (Central de Artefatos de IA)

Este documento descreve o roteiro detalhado para transformar o scaffold inicial no MVP funcional descrito em `SPEC.md`.

## Fases de Implementação

### Fase 1: Fundação & Frontend <!-- id: phase-1 -->
**Objetivo:** Estabelecer a interface do usuário e garantir que todos os componentes arquiteturais existam.

- [ ] **Inicialização do Frontend**
    - Criar projeto Next.js em `frontend/` (App Router, Tailwind CSS).
    - Configurar layout base (Sidebar para navegação, Área principal para conteúdo).
    - Instalar dependências para renderização de Markdown (`react-markdown`, etc).

- [ ] **Configuração do Ambiente de Desenvolvimento**
    - Criar script unificado (ex: Makefile ou script Python) para rodar Backend e Frontend simultaneamente.
    - Validar comunicação básica (CORS) entre Frontend (Porta 3000) e Backend (Porta 8000).

### Fase 2: Backend Core (Gestão de Artefatos) <!-- id: phase-2 -->
**Objetivo:** Permitir que o sistema leia e indexe a si mesmo.

- [ ] **API de Sistema de Arquivos**
    - Implementar endpoint `GET /api/tree` para listar a estrutura de diretórios do workspace.
    - Implementar endpoint `GET /api/file/{path}` para ler o conteúdo bruto de arquivos.

- [ ] **Parser de Metadados**
    - Implementar leitura de Frontmatter (YAML) em arquivos `.md`.
    - Endpoint para listar artefatos por tipo (ex: todos os `PLAN.md` ou `SPEC.md`).

### Fase 3: Experiência do Usuário (Frontend) <!-- id: phase-3 -->
**Objetivo:** Visualização rica para o desenvolvedor.

- [ ] **Navegador de Projetos**
    - Componente de árvore de arquivos (sidebar).
    - Identificação visual de tipos de arquivo (ícones para Agents, Skills, Docs).

- [ ] **Visualizador de Artefatos**
    - Renderização de Markdown com suporte a *syntax highlighting*.
    - Renderização especial para tabelas de tarefas (`task.md` / `PLAN.md`).

### Fase 4: Infraestrutura de Agentes <!-- id: phase-4 -->
**Objetivo:** Preparar o terreno para a automação TDD.

- [ ] **Validação de Skills**
    - Verificar se os templates em `.github/skills` são funcionais.
    - Criar testes simples para garantir que os agentes conseguem ler o contexto.

---
*Plano gerado base na análise de `SPEC.md` e estado atual do repositório.*
