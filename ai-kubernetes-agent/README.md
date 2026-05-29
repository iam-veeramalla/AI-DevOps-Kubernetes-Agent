# AI Kubernetes Troubleshooting Agent (Foundation)

Monorepo containing:

- `backend/`: FastAPI orchestrator (no Kubernetes/AI logic yet)
- `frontend/`: Next.js UI (minimal homepage + API connectivity scaffolding)

## Run locally with Docker

From this folder:

```bash
docker compose up --build
```

- Frontend: `http://localhost:3000`
- Backend health: `http://localhost:8000/health`

