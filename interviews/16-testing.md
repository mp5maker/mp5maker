## Testing

- it is about verifying behaviour, while code-quality tooling helps prevent common problems before code reaches production


1. Unit Testing

- A unit test a small isolated piece of logice

```python
def add(a, b):
    return a + b

assert add(2, 3) == 5
```

- Test should be
  - fast
  - isolated
  - deterministice


2. Integration Testing

- Check whether multiple components work together

```
API
 ↓
Service
 ↓
Database
```

```
POST /users
 ↓
Django
 ↓
PostgreSQL
 ↓
User created
```

3. End-to-End Testing

- Cypress, Detox

```
Open browser
 ↓
Login
 ↓
Open dashboard
 ↓
Create appointment
 ↓
Verify appointment


Browser
 ↓
Frontend
 ↓
API
 ↓
Database
```

4. Testing Pyramid

```
             E2E
            /   \
           /     \
      Integration
        /       \
       /         \
     Unit Tests
```

5. Pytest

- It is a popular python testing framework
- It supports
  - fixtures
  - parameterization
  - mocking integrations
  - plugins
  - readable asserts

6. Unittest

- It is a python's built-in testing framework

```
unittest
→ standard library

pytest
→ third-party framework with a simpler syntax and rich ecosystem
```

7. Jest

- It is a javascript/typescript testing framework
- provides
  - assertions
  - mocking
  - test discovery
  - coverage
  - setup/teardown

8. React Testing Library

- It focuses on testing react components from the user's perspective

```tsx
render(<Login />);

await user.click(
    screen.getByRole("button", { name: /login/i })
);

expect(screen.getByText("Dashboard")).toBeInTheDocument();
```

9. Mocking

- It replaces dependency with a controlled fake


10. Test Isocaltion

- A test should ideally not depend on another test

```
Test A
  ↓
Own setup
  ↓
Test
  ↓
Cleanup

Test B
  ↓
Own setup
  ↓
Test
  ↓
Cleanup
```

11. ESList

- It identifies javascript/typescript code-quality problems

```
unused variables
incorrect patterns
potential bugs
style rules
React-specific issues
```


12. Prettier

- It is primarily a code fromatter

```
indentation
quotes
line breaks
spacing

ESLint
→ Code quality / rules

Prettier
→ Formatting
```

13. Husky

- It allows use to run scripts when Git events occcur

```
git commit
   ↓
Husky
   ↓
lint
   ↓
test
   ↓
commit
```

14. lint-staged

- It runs lint only against the files that are staged to commit

```
Developer
   ↓
git commit
   ↓
Husky
   ↓
lint-staged
   ↓
ESLint
   ↓
Prettier
   ↓
Commit

Push
 ↓
CI
 ↓
Lint
 ↓
Unit tests
 ↓
Integration tests
 ↓
Build
```