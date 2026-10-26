import type { WorkItem } from "../data/work";

const DOT: Record<WorkItem["statusTone"], string> = {
  success: "bg-green-500",
  info: "accent-gradient",
  neutral: "bg-muted",
};

export default function StatusPill({
  status,
  tone,
}: {
  status: string;
  tone: WorkItem["statusTone"];
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-stroke bg-bg/60 px-3 py-1 text-xs text-muted backdrop-blur-md">
      <span aria-hidden className={`h-1.5 w-1.5 shrink-0 rounded-full ${DOT[tone]}`} />
      {status}
    </span>
  );
}
