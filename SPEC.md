# **CAIA \- Central de Artefatos de IA**

## **1\. Visão Geral e Objetivo**

A **CAIA** (Central de Artefatos de IA) é uma aplicação local projetada para atuar como a "memória viva" e o orquestrador de contexto para desenvolvimento de software assistido por IA.

* **Objetivo:** Centralizar a gestão de especificações, decisões arquiteturais, e memória de projetos em um workspace multi-repositório, utilizando padrões modernos de IA Generativa.  
* **Metodologia:** O projeto segue estritamente o **Spec-Driven Development**. A especificação (este arquivo) é a fonte da verdade; nenhum código é escrito sem antes atualizar a especificação e planejar.  
* **Diferencial:** A arquitetura é baseada em **Agent Skills** modulares, permitindo que diferentes personas de IA (Planejador, QA, Dev) compartilhem habilidades técnicas (Python, React, TDD) e sigam workflows rigorosos.

## **2\. Escopo do MVP**

O Produto Mínimo Viável foca na infraestrutura de gestão de conhecimento e na execução do fluxo de TDD assistido.

| Módulo | Incluído no MVP | Excluído do MVP |
| :---- | :---- | :---- |
| **Core** | Backend API para indexação e busca de artefatos. | Integração via extensão de IDE (plugin nativo). |
| **AI Architecture** | Estrutura de **Agent Skills** (.github/skills) e Agentes (.github/agents). | Agentes autônomos de longa duração (background jobs). |
| **Frontend** | Visualização de documentação viva e status dos projetos. | Edição "Rich Text" (edição será via Markdown/Code). |
| **Workflow** | Definição rígida do ciclo TDD (Red-Green-Refactor). | CI/CD automatizado em nuvem. |

## **3\. Requisitos Funcionais (RF)**

### **3.1 Gestão de Workspace**

* **RF 3.1.1:** O sistema deve operar como um repositório local clonável, contendo backend e frontend.  
* **RF 3.1.2:** O sistema deve identificar diretórios de projetos vizinhos no mesmo workspace pai.  
* **RF 3.1.3:** O sistema deve indexar arquivos Markdown (.md) contendo Frontmatter YAML para categorizar o conteúdo (Spec, Plan, Task).

### **3.2 Arquitetura de Agentes e Skills \[NOVO\]**

* **RF 3.2.1:** A aplicação deve implementar o padrão **Agent Skills** (conforme documentação do VS Code).  
* **RF 3.2.2:** Devem existir Skills reutilizáveis para as tecnologias do projeto:  
  * skill-py-fastapi: Padrões de codificação Python/FastAPI.  
  * skill-js-next: Padrões de codificação Next.js/React.  
  * skill-spec-man: Habilidade de ler e atualizar este SPEC.md.  
* **RF 3.2.3:** A aplicação deve definir **Workflows** através de Skills de processo:  
  * skill-tdd-flow: Definição passo-a-passo do ciclo Red-Green-Refactor.

### **3.3 Personas de IA (Agentes)**

* **RF 3.3.1 \- @Planner:** Agente responsável por ler a Spec e quebrar em Planos Técnicos (Tasks). Não escreve código, apenas planos.  
* **RF 3.3.2 \- @Red (QA):** Agente especializado em criar testes que falham baseados nos Planos. Proibido de implementar lógica.  
* **RF 3.3.3 \- @Green (Dev):** Agente focado em implementação minimalista para aprovar testes.  
* **RF 3.3.4 \- @Refactor:** Agente de limpeza de código e otimização.

### **3.4 Visualização (Frontend)**

* **RF 3.4.1:** Aplicação Web local para navegação nos artefatos.  
* **RF 3.4.2:** Renderização otimizada de Markdown.  
* **RF 3.4.3:** Visualização segregada por Projeto \> Tipo de Artefato (Spec, Plan, Notes).

## **4\. Requisitos Não Funcionais (NFR)**

* **NFR 4.1 \- Performance:** O carregamento da árvore de arquivos e renderização de documentos deve ocorrer em \< 1s.  
* **NFR 4.2 \- Compatibilidade:** A estrutura de Skills deve ser compatível com o GitHub Copilot no VS Code e CLI.  
* **NFR 4.3 \- Versionamento:** Todo o conhecimento (artefatos, skills, agentes) deve ser versionável via Git (Plain Text/Markdown).

## **5\. Arquitetura Técnica**

### **5.1 Stack Definida**

* **Backend:** Python 3.12+ com **FastAPI**.  
  * *Motivo:* Robustez para manipulação de arquivos e natividade para integrações futuras de IA.  
* **Frontend:** **Next.js 14+** (App Router) com Tailwind CSS.  
  * *Motivo:* Melhor ecossistema para renderização de conteúdo estático/Markdown e performance.  
* **Dados:** Sistema de Arquivos (Flat-file).

### **5.2 Estrutura de Diretórios (Padrão VS Code Agents)**

Plaintext

caia/  
├── .github/  
│   ├── agents/              \# Definições das Personas (Planner, Red, Green)  
│   │   ├── planner.agent.md  
│   │   └── ...  
│   ├── skills/              \# Habilidades Compartilhadas e Workflows  
│   │   ├── tdd-workflow/    \# Regras do processo de desenvolvimento  
│   │   │   └── SKILL.md  
│   │   ├── py-fastapi/      \# Templates e padrões Python  
│   │   └── js-nextjs/       \# Templates e padrões Next.js  
│   └── instructions/        \# Regras globais de Linting/Formatting  
├── backend/                 \# Código Fonte Python  
├── frontend/                \# Código Fonte Next.js  
├── SPEC.md                  \# ESTE ARQUIVO (Fonte da Verdade)  
└── README.md                \# Manual de Operações

## **6\. Workflow de Desenvolvimento (Policy)**

O desenvolvimento segue um fluxo linear obrigatório suportado pelas Skills:

1. **Input:** Usuário atualiza o SPEC.md com um novo Requisito Funcional.  
2. **Plan:** Agente @planner lê o SPEC.md e gera/atualiza um arquivo PLAN.md com tarefas atômicas.  
3. **Red:** Agente @tdd-red lê uma tarefa do plano e cria um teste unitário falho.  
4. **Green:** Agente @tdd-green lê o erro do teste e implementa o código mínimo.  
5. **Refactor:** Agente @tdd-refactor melhora o código sem quebrar o teste.  
6. **Cycle:** Repete-se para a próxima tarefa.

---

*Documento atualizado em: Janeiro de 2026\.*

