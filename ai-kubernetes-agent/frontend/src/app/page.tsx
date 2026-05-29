export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center px-6 text-center">
      <h1 className="text-3xl font-bold text-slate-900">AI Kubernetes Agent</h1>
      <p className="mt-3 text-base text-slate-600">Troubleshoot Kubernetes with AI</p>

      <button
        type="button"
        className="mt-8 rounded-md bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
      >
        Investigate Cluster
      </button>

      <p className="mt-6 text-sm text-slate-500">System Status: Ready</p>
    </main>
  );
}

