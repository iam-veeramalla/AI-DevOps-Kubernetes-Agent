# 03-prompt-ai-reasoning-engine.md

## Context

The Kubernetes Investigation Layer is complete.

We can now collect Kubernetes troubleshooting evidence.

Example:

```text
Pods
Logs
Events
Deployments
Networking
```

Architecture:

```text
Frontend
    ↓
FastAPI Backend
    ↓
Kubernetes Investigation Layer
    ↓
AI Kubernetes Agent
        ↓
LLM Reasoning
(OpenRouter via InsForge Key)
        ↓
Root Cause Analysis
        ↓
Suggested Fix
```

Goal:

We now want to make the system intelligent.

The AI agent should behave like a **Senior Kubernetes SRE**.

It should:

1. Understand Kubernetes failures
2. Correlate logs + events + deployment state
3. Find root cause
4. Suggest fixes
5. Generate confidence score

Important:

Use **OpenRouter API Key provided via InsForge**.

Do not hardcode secrets.

---

## Goal

Build the **AI Kubernetes Agent**.

Implement:

```text
Prompt Builder
LLM Client
Root Cause Analyzer
Fix Recommendation Engine
Confidence Engine
```

The AI layer should consume the investigation payload generated in Prompt 02.

---

## Requirements

### 1. Prompt Builder

Create a structured Kubernetes troubleshooting prompt.

The system prompt should make the LLM behave like:

```text
Senior Kubernetes SRE
```

The prompt must include:

```text
Pod Status
Logs
Events
Deployment Health
Networking Findings
```

The AI must return:

```text
1. Root Cause
2. Explanation
3. Suggested Fix
4. kubectl Commands
5. Prevention Recommendation
6. Confidence Score
```

Prompt should be structured and deterministic.

Avoid vague answers.

---

### 2. LLM Client

Use:

```text
OpenRouter
```

Authentication:

```text
OpenRouter API Key from InsForge
```

Read from:

```env
OPENROUTER_API_KEY=
OPENROUTER_MODEL=
```

Requirements:

- Use HTTPX
- Add timeout handling
- Handle API failures gracefully
- Add retries
- Log errors cleanly

Do not expose secrets.

Keep implementation simple and explainable.

---

### 3. Root Cause Analyzer

Consume investigation payload.

Example input:

```json
{
  "pods": {
    "status": "CrashLoopBackOff"
  },
  "logs": {
    "error": "DATABASE_URL missing"
  }
}
```

Expected reasoning:

```text
Root Cause:
Application failed because DATABASE_URL environment variable is missing.
```

The system should correlate evidence instead of blindly summarizing logs.

---

### 4. Fix Recommendation Engine

Generate actionable fixes.

Example:

```text
Suggested Fix:
Add DATABASE_URL environment variable.

kubectl command:
kubectl edit deployment payment-service
```

Recommendations must be:

- practical
- beginner friendly
- Kubernetes-specific

Avoid generic advice.

---

### 5. Confidence Engine

Generate confidence score.

Example:

```text
Confidence: 92%
```

Reasoning example:

```text
High confidence because:
- Pod state = CrashLoopBackOff
- Logs clearly show missing env var
- Restart count confirms startup failure
```

---

## FastAPI Integration

Update:

```text
POST /investigate
```

New flow:

```text
Collect Kubernetes Evidence
        ↓
Send to AI Agent
        ↓
LLM Reasoning
        ↓
Root Cause Analysis
        ↓
Suggested Fix
        ↓
Return Diagnosis
```

Example API response:

```json
{
  "status": "success",
  "diagnosis": {
    "root_cause": "DATABASE_URL missing",
    "explanation": "Application cannot connect to DB.",
    "fix": "Add missing environment variable.",
    "kubectl_command": "kubectl edit deployment payment-service",
    "confidence": 92
  }
}
```

---

## Constraints

DO NOT implement:

- Authentication
- Investigation history
- Realtime updates
- Frontend changes
- Deployment

Only build the AI reasoning layer.

Keep implementation beginner friendly.

Do not overengineer.

DO NOT BREAK EXISTING CODE.

Only extend existing functionality.

---

## Expected Result

When I call:

```http
POST /investigate
```

The system should:

```text
Investigate Kubernetes
        ↓
Reason about failures
        ↓
Find root cause
        ↓
Suggest fix
        ↓
Return diagnosis
```

The backend should now behave like:

> A Senior Kubernetes SRE helping troubleshoot incidents.
