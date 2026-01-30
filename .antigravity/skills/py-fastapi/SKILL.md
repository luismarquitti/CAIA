---
name: py-fastapi
description: Padrões de código para o Backend Python FastAPI.
---
# Python FastAPI Skill

Use estes padrões ao gerar código backend:

1. **Estrutura:**
   - Entry point: `backend/main.py`
   - Routers: `backend/app/routers/`
   - Services: `backend/app/services/`
2. **Testes:** Use `pytest`. Arquivos devem começar com `test_`.
3. **Typing:** Use type hints estritos (Pydantic models).