# 02-prompt-kubernetes-investigation-engine.md

## Context

Project setup is already complete.

We now want to build the **Kubernetes Investigation Layer**.

Architecture:

```text
Frontend
    ↓
FastAPI Backend (Orchestrator)
    ↓
Kubernetes Investigation Layer
        ├── Check Pods
        ├── Read Logs
        ├── Analyze Events
        ├── Inspect Deployments
        └── Check Networking
    ↓
AI Kubernetes Agent
```

Goal:

This layer should behave like a **junior DevOps engineer collecting evidence** before AI reasoning starts.

Important:

We are still **NOT implementing AI reasoning**.

We are only collecting Kubernetes troubleshooting data.

Use **kubectl commands internally** (not Kubernetes Python SDK).

---

## Goal

Build the Kubernetes Investigation Layer.

Implement:

```text
Pod Inspector
Logs Collector
Events Analyzer
Deployment Inspector
Network Inspector
Kubectl Executor
Investigation Service
```

The FastAPI backend should orchestrate these components.

---

## Requirements

### 1. Kubectl Executor

Create a reusable utility to safely execute kubectl commands.

Requirements:

- Use Python subprocess
- Capture stdout/stderr
- Handle failures gracefully
- Return structured output
- Add logging

Example supported commands:

```bash
kubectl get pods -A
kubectl get events -A
kubectl logs <pod-name>
kubectl describe deployment <deployment-name>
kubectl get svc -A
```

Keep implementation clean and beginner friendly.

---

### 2. Pod Inspector

Responsibilities:

- Get pod status
- Detect unhealthy pods

Detect:

```text
CrashLoopBackOff
ImagePullBackOff
Pending
Error
OOMKilled
ContainerCreating (stuck)
```

Return structured JSON.

Example:

```json
{
  "healthy": false,
  "problematic_pods": [
    {
      "name": "payment-service",
      "namespace": "default",
      "status": "CrashLoopBackOff"
    }
  ]
}
```

---

### 3. Logs Collector

Responsibilities:

- Fetch logs for failed pods
- Capture relevant failures

Focus on:

```text
Exceptions
Connection failures
Missing env vars
Image failures
Startup errors
```

Keep logs concise.

Do not return thousands of lines.

---

### 4. Events Analyzer

Responsibilities:

Read Kubernetes events.

Detect:

```text
FailedScheduling
BackOff
FailedMount
FailedPull
ErrImagePull
Unhealthy
```

Return summarized findings.

---

### 5. Deployment Inspector

Responsibilities:

Inspect deployments.

Check:

```text
Available replicas
Unavailable replicas
Rollout failures
Deployment conditions
```

Detect unhealthy deployments.

---

### 6. Network Inspector

Responsibilities:

Inspect services and networking.

Check:

```text
Service existence
Selector mismatch
Missing endpoints
DNS-related issues
```

---

### 7. Investigation Service

Create a service that orchestrates everything.

Flow:

```text
Check Pods
    ↓
Collect Logs
    ↓
Analyze Events
    ↓
Inspect Deployments
    ↓
Check Networking
```

Return a single structured investigation payload.

Example:

```json
{
  "pods": {},
  "logs": {},
  "events": {},
  "deployments": {},
  "network": {}
}
```

---

## FastAPI API

Create endpoint:

```text
POST /investigate
```

When called:

1. Run investigation
2. Return structured Kubernetes evidence

Example response:

```json
{
  "status": "success",
  "investigation": {
    "pods": {},
    "logs": {},
    "events": {},
    "deployments": {},
    "network": {}
  }
}
```

No AI yet.

No root cause analysis yet.

This step is only evidence gathering.

---

## Constraints

DO NOT implement:

- OpenRouter
- LLM reasoning
- Root cause analysis
- Fix recommendation
- InsForge integration
- Authentication
- Realtime updates

Do NOT use Kubernetes SDK.

Use **kubectl internally only**.

Keep code modular and beginner friendly.

DO NOT BREAK EXISTING CODE.

Only extend the project incrementally.

---

## Expected Result

I should be able to call:

```http
POST /investigate
```

And receive structured Kubernetes troubleshooting evidence.

The backend should now behave like:

> A junior DevOps engineer collecting debugging evidence.
