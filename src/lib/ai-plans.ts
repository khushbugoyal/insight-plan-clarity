export const AI_PLANS = [
  { id: "free", name: "Free", price: 0, usage: null },
  { id: "plus", name: "AI Plus", price: 20, usage: "2× more usage" },
  { id: "boost", name: "AI Boost", price: 50, usage: "5× more usage" },
  { id: "max", name: "AI Max", price: 100, usage: "10× more usage" },
] as const;

export type AiPlanId = (typeof AI_PLANS)[number]["id"];

// Browsing a plan is only a draft choice, never an activated subscription.
export function canActivateAiPlan(
  selectedPlan: AiPlanId,
  currentPlan: AiPlanId,
  billingConnected: boolean,
) {
  return billingConnected && selectedPlan !== currentPlan;
}