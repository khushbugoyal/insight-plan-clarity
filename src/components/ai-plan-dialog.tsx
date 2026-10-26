import { useState } from "react";
import { ArrowRight, Check, ShieldCheck, Sparkles, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { AI_PLANS, canActivateAiPlan, type AiPlanId } from "@/lib/ai-plans";
import { cn } from "@/lib/utils";

type AiPlanDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentPlan?: AiPlanId;
};

export function AiPlanDialog({ open, onOpenChange, currentPlan = "free" }: AiPlanDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100dvh-32px)] w-[calc(100%-32px)] max-w-xl gap-0 overflow-y-auto rounded-lg bg-card p-0">
        {open && <AiPlanChoices currentPlan={currentPlan} />}
      </DialogContent>
    </Dialog>
  );
}

function AiPlanChoices({ currentPlan }: { currentPlan: AiPlanId }) {
  const [selectedPlan, setSelectedPlan] = useState<AiPlanId>(currentPlan);
  const selected = AI_PLANS.find((plan) => plan.id === selectedPlan);
  if (!selected) return null;

  return (
    <>
      <DialogHeader className="px-5 pb-6 pt-6 text-left sm:px-7">
        <span className="mb-3 grid h-11 w-11 place-items-center rounded-md bg-secondary text-primary">
          <Sparkles className="h-5 w-5" />
        </span>
        <DialogTitle className="text-2xl font-bold tracking-normal">Choose your AI plan</DialogTitle>
        <DialogDescription className="mt-2 leading-relaxed">
          <span className="block text-sm font-medium text-foreground">AI-powered insights and answers across ReferralHero</span>
          <span className="mt-1.5 flex items-center gap-1.5 text-xs text-muted-foreground"><Users className="h-3.5 w-3.5" />Shared across your team</span>
        </DialogDescription>
      </DialogHeader>
      <div aria-hidden className="mx-5 border-t border-border sm:mx-7" />

      <RadioGroup
        aria-label="AI plans"
        value={selectedPlan}
        onValueChange={(value) => {
          const plan = AI_PLANS.find((item) => item.id === value);
          if (plan) setSelectedPlan(plan.id);
        }}
        className="gap-3 px-5 pb-6 pt-5 sm:px-7"
      >
        {AI_PLANS.map((plan) => (
          <label
            key={plan.id}
            htmlFor={`popup-plan-${plan.id}`}
            className={cn(
              "flex min-h-20 cursor-pointer items-center gap-3 rounded-lg border px-4 py-3 transition-colors motion-reduce:transition-none",
              selectedPlan === plan.id ? "border-primary bg-secondary/50 ring-1 ring-primary" : "border-border bg-card hover:bg-muted/50",
            )}
          >
            <RadioGroupItem id={`popup-plan-${plan.id}`} value={plan.id} aria-label={plan.name} className="shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-semibold">{plan.name}</span>
                {plan.id === currentPlan && <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground"><Check className="h-3 w-3" />Current plan</span>}
              </div>
              {plan.usage && <p className="mt-1 text-sm text-muted-foreground">{plan.usage}</p>}
            </div>
            <div className="shrink-0 text-right">
              <span className="text-xl font-bold">${plan.price}</span>
              <p className="text-xs text-muted-foreground">per month</p>
            </div>
          </label>
        ))}
      </RadioGroup>

      <div className="mx-5 border-t border-border sm:mx-7">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 py-5">
          <div className="flex flex-col gap-1.5">
            <div aria-live="polite" className="flex items-baseline gap-2">
              <span className="text-sm font-semibold">{selected.name}</span>
              <span className="text-sm text-muted-foreground">·</span>
              <span className="font-bold">${selected.price}<span className="text-sm font-normal text-muted-foreground"> / month</span></span>
            </div>
            <p className="flex items-center gap-1.5 text-xs text-muted-foreground"><ShieldCheck className="h-3.5 w-3.5" />Cancel or downgrade anytime</p>
          </div>
          <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-end">
            <DialogClose asChild><Button variant="ghost" className="-ml-4 sm:ml-0">Not now</Button></DialogClose>
            <Button
              disabled={!canActivateAiPlan(selectedPlan, currentPlan, false)}
              aria-label={selectedPlan === currentPlan ? "Current plan" : `Continue with ${selected.name} — billing not connected`}
            >
              {selectedPlan === currentPlan ? "Current plan" : "Continue"}
              {selectedPlan !== currentPlan && <ArrowRight className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}