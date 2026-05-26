# 01-prompt-project-setup.md

## Context

We are building an **AI Kubernetes Troubleshooting Agent**.

Architecture:

```text
Frontend
    ↓
FastAPI Backend (Orchestrator)
    ↓
Kubernetes Investigation Layer
    ↓
AI Kubernetes Agent
    ↓
LLM Reasoning (OpenRouter via InsForge)
    ↓
Root Cause + Suggested Fix
    ↓
Frontend Diagnosis
```

This is an **on-demand troubleshooting system**.

Example flow:

```text
User clicks "Investigate Cluster"
        ↓
API call
        ↓
Kubernetes investigation
        ↓
AI reasoning
        ↓
Diagnosis shown to user
```

We are **NOT building a Kubernetes controller/operator**.

---

## Goal

Set up the project foundation.

Create:

- FastAPI backend
- Next.js frontend
- Docker setup
- Environment variables
- Basic folder structure
- Health endpoint

Do NOT implement Kubernetes logic or AI yet.

---

## Tech Stack

Backend:

- FastAPI
- Python 3.12+
- Uvicorn
- Pydantic
- Loguru
- HTTPX

Frontend:

- Next.js
- TypeScript
- Tailwind CSS
- Axios
- React Query

Infrastructure:

- Docker
- Docker Compose

---

## Project Structure

Create a monorepo:

```text
ai-kubernetes-agent/

├── backend/
├── frontend/
├── docs/
├── prompts/
├── docker-compose.yml
└── README.md
```

Backend should include placeholders for:

```text
api/
core/
kubernetes/
ai/
services/
models/
```

Frontend should include placeholders for:

```text
components/
services/
hooks/
types/
```

Use placeholder implementations only.

Example:

```python
def inspect_pods():
    pass
```

---

## Backend Requirements

Create FastAPI app.

Add:

```text
GET /health
```

Response:

```json
{
  "status": "healthy",
  "service": "ai-kubernetes-agent"
}
```

Enable:

- CORS
- logging
- env loading

Keep code simple and modular.

---

## Frontend Requirements

Create a minimal homepage.

UI:

```text
AI Kubernetes Agent

Troubleshoot Kubernetes with AI

[ Investigate Cluster ]

System Status: Ready
```

Simple professional styling only.

---

## Environment Variables

Backend:

```env
OPENROUTER_API_KEY=
OPENROUTER_MODEL=
KUBECONFIG_PATH=
```

Frontend:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

---

## Docker Requirements

Create Dockerfiles for:

- backend
- frontend

Create docker-compose:

```text
backend → port 8000
frontend → port 3000
```

---

## Constraints

DO NOT implement:

- kubectl logic
- AI reasoning
- OpenRouter
- InsForge
- Authentication
- Realtime updates

Only setup the foundation.

DO NOT BREAK EXISTING CODE in future implementations.

Keep everything beginner friendly and production-style.

---

## Expected Result

I should be able to run:

```bash
docker compose up --build
```

Access:

```text
http://localhost:3000
http://localhost:8000/health
```
