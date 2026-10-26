import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { AiPlanDialog } from "@/components/ai-plan-dialog";
import { ViewSwitcher } from "@/components/view-switcher";

export const Route = createFileRoute("/ai-plans")({
  head: () => ({
    meta: [
      { title: "Choose an AI Plan — ReferralHero" },
      { name: "description", content: "Compare monthly AI Insights plans and choose your team's usage level." },
      { property: "og:title", content: "Choose an AI Plan — ReferralHero" },
      { property: "og:description", content: "Compare Free, AI Plus, AI Boost, and AI Max monthly plans." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: AiPlansScreen,
});

function AiPlansScreen() {
  const [open, setOpen] = useState(true);
  const navigate = useNavigate();
  return (
    <main>
      <ViewSwitcher active="popup" onBilling={() => navigate({ to: "/" })} onPopup={() => setOpen(true)} />
      <AiPlanDialog open={open} onOpenChange={setOpen} />
    </main>
  );
}
