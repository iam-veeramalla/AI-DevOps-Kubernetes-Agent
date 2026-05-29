type InvestigateButtonProps = {
  onClick?: () => void;
};

export function InvestigateButton({ onClick }: InvestigateButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
    >
      Investigate Cluster
    </button>
  );
}

