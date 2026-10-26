import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AiPlanDialog } from "@/components/ai-plan-dialog";
import { ViewSwitcher } from "@/components/view-switcher";
import { Home, Mail, Phone, Sparkles, ChevronDown, ArrowRight, Check, Users } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Billing & Invoices — ReferralHero" },
      { name: "description", content: "Your AI Insights plan, credit usage, and add-on options." },
      { property: "og:title", content: "Billing & Invoices — ReferralHero" },
      { property: "og:description", content: "Your AI Insights plan, credit usage, and add-on options." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Billing,
});

const aiPlans = [
  { name: "AI Plus", price: 20, mult: "2×" },
  { name: "AI Boost", price: 50, mult: "5×" },
  { name: "AI Max", price: 100, mult: "10×" },
];

function Billing() {
  const used = 0;
  const [showAiPlans, setShowAiPlans] = useState(false);
  const [tab, setTab] = useState<"admin" | "designer">("admin");
  const [designerOpen, setDesignerOpen] = useState(true);
  return (
    <div className="mx-auto max-w-6xl px-6 py-8">
      {tab === "admin" && (
        <>
          <nav className="flex items-center justify-between">
            <div className="flex gap-6 text-sm font-medium">
              {[[Home, "Home"], [Mail, "Chat with us"], [Phone, "Book a call"]].map(([I, l]) => {
                const Icon = I as typeof Home;
                return (
                  <a key={l as string} href="#" className="flex items-center gap-2 hover:text-primary">
                    <span className="grid h-8 w-8 place-items-center rounded-lg bg-card shadow-card"><Icon className="h-4 w-4" /></span>
                    {l as string}
                  </a>
                );
              })}
            </div>
            <button className="flex items-center gap-2 rounded-full bg-card py-1.5 pl-1.5 pr-4 text-sm shadow-card">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">LN</span>
              lee newtwo <ChevronDown className="h-4 w-4" />
            </button>
          </nav>

          <header className="mt-10">
            <h1 className="text-4xl font-bold tracking-tight">Billing & Invoices</h1>
          </header>
        </>
      )}

      <ViewSwitcher
        active={tab === "admin" ? "billing" : "popup"}
        onBilling={() => setTab("admin")}
        onPopup={() => {
          setTab("designer");
          setDesignerOpen(true);
        }}
      />

      {tab === "admin" ? (
        <section aria-labelledby="ai-heading" id="ai-upgrade" className="mt-8 rounded-2xl bg-card px-5 py-6 shadow-card sm:px-7">
          <div className="flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-md bg-secondary text-primary"><Sparkles className="h-5 w-5" /></span>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <h2 id="ai-heading" className="text-lg font-bold">AI Insights</h2>
                  <span className="text-sm font-medium text-muted-foreground">Free plan</span>
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">Credit resets <span className="font-semibold text-foreground">November 1, 2026</span> · 9 days left</p>
              </div>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-2xl font-bold">$0</p>
              <p className="mt-0.5 text-xs text-muted-foreground">per month</p>
            </div>
          </div>
          <div className="mt-6 border-t border-border pt-5">
            <div className="flex justify-between gap-3 text-sm">
              <span className="font-medium">AI credit usage</span>
              <span className="font-semibold">{used}% used</span>
            </div>
            <div role="progressbar" aria-label="Monthly AI credit used" aria-valuenow={used} aria-valuemin={0} aria-valuemax={100} className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
              <div className="h-2 rounded-full bg-primary" style={{ width: `${used}%` }} />
            </div>
            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><Users className="h-3.5 w-3.5" />Shared across your team</p>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="sm" className="rounded-full text-muted-foreground hover:text-destructive">Cancel AI plan</Button>
                <Button variant="outline" size="sm" className="gap-2 rounded-full border-primary/30 text-primary" aria-expanded={showAiPlans} aria-controls="ai-plan-options" onClick={() => setShowAiPlans((open) => !open)}>
                  Change AI plan<ChevronDown className={`h-4 w-4 transition-transform motion-reduce:transition-none ${showAiPlans ? "rotate-180" : ""}`} />
                </Button>
              </div>
            </div>
          </div>
          {showAiPlans && <div id="ai-plan-options" className="mt-6 border-t border-border pt-5">
            <h3 className="font-semibold">AI plans</h3>
            <p className="mt-1 text-sm text-muted-foreground">Optional add-on · billed monthly from your purchase date</p>
            <div className="mt-3 divide-y divide-border">
              <div className="flex flex-wrap items-center justify-between gap-4 py-4">
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                  <span className="w-20 font-semibold">Free</span>
                </div>
                <div className="flex items-center gap-5">
                  <span className="font-semibold">$0<span className="text-sm font-normal text-muted-foreground"> / month</span></span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-primary"><Check className="h-4 w-4" />Current plan</span>
                </div>
              </div>
              {aiPlans.map((p) => <div key={p.name} className="flex flex-wrap items-center justify-between gap-4 py-4">
                <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                  <span className="w-20 font-semibold">{p.name}</span>
                  <span className="text-sm text-muted-foreground">{p.mult} more usage</span>
                </div>
                <div className="flex items-center gap-5">
                  <span className="font-semibold">${p.price}<span className="text-sm font-normal text-muted-foreground"> / month</span></span>
                  <Button variant="secondary" size="sm" className="gap-2 rounded-full" disabled aria-label={`Choose ${p.name} — billing not connected`}>Choose<ArrowRight className="h-3.5 w-3.5" /></Button>
                </div>
              </div>)}
            </div>
          </div>}
        </section>
      ) : (
        <AiPlanDialog open={designerOpen} onOpenChange={setDesignerOpen} />
      )}
    </div>
  );
}
