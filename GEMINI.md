# GEMINI Project Context: CAIA (Central de Artefatos de IA)

This document provides a comprehensive overview of the CAIA project, its architecture, and development conventions to be used as a primary context source for AI-assisted development.

## 1. Project Overview

**CAIA (Central de Artefatos de IA)** is a local web application designed to act as a "living memory" and context orchestrator for software development. It centralizes project specifications, plans, and architectural decisions to streamline workflows involving AI agents.

The core methodology is **Spec-Driven Development**, where `SPEC.md` serves as the single source of truth. The project follows a strict, agent-driven Test-Driven Development (TDD) cycle.

- **Key Files:**
    - `SPEC.md`: The master specification document. All development work originates from here.
    - `PLAN.md`: A detailed technical plan broken down from the main specification.
    - `UI_UX.md`: Guidelines for the frontend design and user experience.
    - `.github/`: Contains the declarative structure for AI **Agents** (personas like `@Planner`, `@Red`) and **Skills** (technical knowledge like `py-fastapi`, `js-nextjs`).

## 2. Architecture

The project is a monorepo composed of a Python backend and a Next.js frontend.

- **Backend (`/backend`)**: A **Python/FastAPI** application responsible for serving files, parsing project artifacts (like Markdown frontmatter), and providing an API for the frontend.
- **Frontend (`/frontend`)**: A **Next.js 14+** application using the App Router and **Tailwind CSS**. It provides a rich, local web interface for visualizing project artifacts.
- **Data Store**: The project uses the local **flat-file system** as its database. All content is stored in version-controlled plain text and Markdown files.

## 3. Building and Running

### Backend (FastAPI)

The backend requires Python and dependencies from `requirements.txt`. It runs on port 8000.

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```

2.  **Activate the virtual environment:**
    *   On Windows:
        ```powershell
        .\venv\Scripts\Activate.ps1
        ```
    *   On macOS/Linux:
        ```bash
        source venv/bin/activate
        ```

3.  **Run the development server:**
    ```bash
    uvicorn main:app --reload
    ```

### Frontend (Next.js)

The frontend requires Node.js and dependencies from `package.json`. It runs on port 3000 and communicates with the backend.

1.  **Navigate to the frontend directory:**
    ```bash
    cd frontend
    ```

2.  **Install dependencies (if not already installed):**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

## 4. Development Conventions

- **Spec-Driven Development**: Any new feature or change must first be reflected in `SPEC.md`.
- **TDD Workflow**: The development follows a strict Red-Green-Refactor cycle, intended to be executed by AI agents:
    1.  **Red**: An agent reads a task from `PLAN.md` and writes a failing test.
    2.  **Green**: An agent writes the minimal code necessary to make the test pass.
    3.  **Refactor**: An agent improves the code's quality without changing its behavior.
- **Styling**: The frontend uses Tailwind CSS. Follow the design principles outlined in `UI_UX.md` (dark mode, minimalist "dev tool" aesthetic).
- **Code Style**:
    - **Frontend**: Follows Next.js and ESLint rules (`npm run lint` to check).
    - **Backend**: Follows standard Python (PEP 8) and FastAPI conventions.
- **Commits**: Commits should be atomic and reference the specific task or requirement they address.
