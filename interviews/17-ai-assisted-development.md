### AI-Assisted Developement

1. Github Copilot
  - code generation
  - autocomplete
  - refactoring
  - tests
  - documentation
  - debuggin
  - understanding unfamiliar code
  - copilot generates suggestions; the developer remains responsible for correctness

- Copilot Instructions
  - For a large project, we can give AI project-specific instructions

```
Use TypeScript strict mode.

Prefer functional React components.

Use existing API service abstractions.

Do not introduce new dependencies without justification.

Use React Testing Library for component tests.

Follow existing naming conventions.
```

  - this gives AI context about

```
Architecture
Coding standards
Technology choices
Project conventions
```

2. Project Context

- AI becomes more useful when it understands the project context

```
Framework: Django REST Framework
Authentication: JWT
Database: PostgreSQL
Existing User model
Existing serializer
Existing permission classes
Follow existing API conventions
```

3. Effective Prompting

```
Context
+
Goal
+
Constraints
+
Existing architecture
+
Expected output
```

4. AI Agents

- An AI agent can perform a sequence of actions rather than simple generating a code snippet

```
Goal
 ↓
Inspect repository
 ↓
Understand architecture
 ↓
Modify files
 ↓
Run tests
 ↓
Inspect failures
 ↓
Fix
 ↓
Run tests again

AI autocomplete
→ Suggests code

AI agent
→ Can reason across multiple steps/tools/files
```

5. Reviewing AI-Generated Code

- Never blindly accept generated code
- Review
  - Correctness
  - Security
  - Performance
  - Maintainability
  - Tests

6. AI Hallucination
  - LLMS can generate plausible but incorrect infromation

7. Context Limitations
  - Your entire repository
  - hidden business rules
  - undocumented infrastructure
  - production configuration
  - latest library behavior
  - assumptions made elsewhere in the system

```
Requirement
   ↓
Ask AI
   ↓
Review generated approach
   ↓
Generate implementation
   ↓
Review diff
   ↓
Run lint
   ↓
Run tests
   ↓
Run integration/E2E if needed
   ↓
Manual verification
   ↓
Code review
```