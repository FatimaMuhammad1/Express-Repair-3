# Contributing to Fixora

Thank you for your interest in contributing! This document provides guidelines and instructions.

---

## Code of Conduct

- Be respectful and inclusive
- Avoid harassment or discrimination
- Provide constructive feedback
- Assume good intent

---

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork:** `git clone https://github.com/YOUR_USERNAME/fixora.git`
3. **Create a branch:** `git checkout -b feature/my-feature`
4. **Make changes** and test locally
5. **Commit with descriptive messages**
6. **Push to your fork** and **open a Pull Request**

---

## Development Setup

### Frontend

```bash
npm install
npm run dev
npm run lint
npm run test:unit
```

### Backend

```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt -r requirements-dev.txt
uvicorn app.main:app --reload
pytest -q
```

---

## Commit Message Format

Use conventional commits:

```
feat: add new feature
fix: bug fix
docs: documentation
test: add/update tests
refactor: code refactor
style: formatting
chore: dependencies
```

Example:
```
feat: add dark mode toggle to footer
```

---

## Pull Request Process

1. **Update documentation** if you change features
2. **Add tests** for new functionality
3. **Ensure all tests pass:**
   ```bash
   npm run lint
   npm run test:unit
   cd backend && pytest
   ```
4. **Keep commits clean** (rebase if needed)
5. **Provide a clear PR description** with context

---

## Code Style

### Frontend (TypeScript/React)

```bash
npm run lint       # ESLint check
npm run format     # Prettier auto-format
```

### Backend (Python)

```bash
# Already auto-formatted with Black on commit
pytest -q          # Run tests
```

---

## Testing

### Add Frontend Tests

Create `src/components/__tests__/MyComponent.test.tsx`:

```typescript
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import MyComponent from "../MyComponent";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText(/expected text/)).toBeInTheDocument();
  });
});
```

### Add Backend Tests

Create `backend/tests/test_my_feature.py`:

```python
from fastapi.testclient import TestClient
from app.main import app

def test_my_endpoint():
    client = TestClient(app)
    res = client.get("/api/my-endpoint")
    assert res.status_code == 200
```

---

## Documentation

- Update `README.md` for major changes
- Add docstrings to functions and classes
- Include examples for new features
- Update `DEPLOYMENT_GUIDE.md` if deployment changes

---

## Reporting Bugs

1. **Check existing issues** to avoid duplicates
2. **Create a new issue** with:
   - **Title:** Clear, descriptive
   - **Description:** Steps to reproduce, expected vs actual behavior
   - **Environment:** OS, browser/Python version, etc.
   - **Logs/Screenshots:** If applicable

---

## Feature Requests

Describe:
- **Use case:** Why is this needed?
- **Proposed solution:** How should it work?
- **Alternatives:** Any other approaches?
- **Context:** Any related issues?

---

## Performance & Security

- **Performance:** Avoid N+1 queries, optimize images
- **Security:** Never commit secrets, validate user input, use prepared queries

---

## Review Process

- Maintainers review PRs within 5 business days
- Request changes or approve
- Address feedback and re-request review
- Once approved, your PR will be merged

---

## Release Process

Maintainers handle releases:

1. Update version in `package.json` (frontend) and `backend/app/main.py`
2. Tag commit: `git tag v1.0.0`
3. Push tag: `git push origin v1.0.0`
4. GitHub Actions deploy automatically

---

## Community

- **Discussions:** GitHub Discussions for ideas
- **Discord:** Join our community server (link TBD)
- **Email:** noreply@fixora.com for urgent matters

---

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for helping make Fixora better! 🚀
