import { describe, expect, it } from "vitest";
import { AI_PLANS, canActivateAiPlan } from "./ai-plans";

describe("AI plan choices", () => {
  it("preserves the existing monthly prices", () => {
    expect(AI_PLANS.map(({ price }) => price)).toEqual([0, 20, 50, 100]);
  });

  it("preserves the requested usage multipliers", () => {
    expect(AI_PLANS.slice(1).map(({ usage }) => usage)).toEqual([
      "2× more usage", "5× more usage", "10× more usage",
    ]);
  });

  it("blocks every plan change while billing is disconnected", () => {
    for (const plan of AI_PLANS) {
      expect(canActivateAiPlan(plan.id, "free", false)).toBe(false);
    }
    expect(canActivateAiPlan("plus", "free", true)).toBe(true);
  });

  it("does not activate the current plan again", () => {
    expect(canActivateAiPlan("free", "free", true)).toBe(false);
  });
});