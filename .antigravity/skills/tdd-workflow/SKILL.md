---
name: tdd-workflow
description: O fluxo estrito de TDD (Red-Green-Refactor).
---
# TDD Workflow Skill

Siga este ciclo estritamente para qualquer nova feature:

1. **RED:** Crie um arquivo de teste (ex: `test_feature.py`) que falhe.
   - Verifique se falha com `pytest` ou `npm test`.
2. **GREEN:** Escreva a implementação mínima para o teste passar.
   - Não se preocupe com "clean code" perfeito aqui, apenas funcionalidade.
3. **REFACTOR:** Melhore a estrutura sem quebrar o teste.