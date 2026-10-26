import { cn } from "@/lib/utils";

type View = "billing" | "popup";

const tabs: { id: View; label: string }[] = [
  { id: "billing", label: "/billing" },
  { id: "popup", label: "popup" },
];

type ViewSwitcherProps = {
  active: View;
  onBilling: () => void;
  onPopup: () => void;
};

export function ViewSwitcher({ active, onBilling, onPopup }: ViewSwitcherProps) {
  const onSelect: Record<View, () => void> = { billing: onBilling, popup: onPopup };
  return (
    <div role="tablist" aria-label="Workspace view" className="fixed bottom-6 right-6 z-50 inline-flex gap-1 rounded-full bg-muted p-1 shadow-card">
      {tabs.map((t) => (
        <button
          key={t.id}
          type="button"
          role="tab"
          aria-selected={active === t.id}
          onClick={onSelect[t.id]}
          className={cn(
            "rounded-full px-4 py-1.5 text-sm font-medium transition-colors motion-reduce:transition-none",
            active === t.id ? "bg-card text-foreground shadow-card" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}
