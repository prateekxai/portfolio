import { SOURCE_LABELS, type Figure, type Source } from "../data/work";

/** Tiny superscript that labels a figure as measured, client-reported or estimated. */
export function SourceMark({ source }: { source?: Source }) {
  if (!source) return null;
  return (
    <sup
      title={SOURCE_LABELS[source]}
      aria-label={SOURCE_LABELS[source]}
      className="ml-1 inline-grid h-4 min-w-4 cursor-help place-items-center rounded-[5px] border border-stroke bg-bg px-1 align-super font-body text-[9px] font-medium not-italic leading-none tracking-normal text-muted"
    >
      {source}
    </sup>
  );
}

/** Renders text, turning inline [M] / [C] / [E] markers into SourceMarks. */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/\s?\[(M|C|E)\]/g);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? <SourceMark key={i} source={part as Source} /> : part
      )}
    </>
  );
}

export function FigureText({ figure }: { figure: Figure }) {
  return (
    <>
      {figure.value}
      <SourceMark source={figure.source} />
      {figure.note && (
        <span className="ml-1.5 font-body text-xs not-italic text-muted">
          {figure.note}
        </span>
      )}
    </>
  );
}

/** Legend explaining the source marks. */
export function SourceLegend() {
  return (
    <p className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted">
      {(Object.keys(SOURCE_LABELS) as Source[]).map((s) => (
        <span key={s} className="inline-flex items-center gap-1.5">
          <SourceMark source={s} />
          {SOURCE_LABELS[s]}
        </span>
      ))}
    </p>
  );
}
