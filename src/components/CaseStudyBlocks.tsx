import type { ReactNode } from "react";
import type { Block, ImpactRow } from "../data/work";
import { FigureText, RichText } from "./RichText";

type ListBlock = Extract<Block, { kind: "list" }>;
type TableBlock = Extract<Block, { kind: "table" }>;

function List({ block, checklist }: { block: ListBlock; checklist: boolean }) {
  return (
    <ul className="flex max-w-[72ch] flex-col gap-4">
      {block.items.map((item, i) => (
        <li
          key={i}
          className="flex gap-3.5 text-sm leading-relaxed text-text-primary/80 md:text-base md:leading-relaxed"
        >
          {checklist ? (
            <span
              aria-hidden
              className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-stroke text-[11px] text-text-primary"
            >
              ✓
            </span>
          ) : (
            <span
              aria-hidden
              className="mt-[0.7em] h-1 w-1 shrink-0 rounded-full bg-muted"
            />
          )}
          <div className="min-w-0">
            {item.title && (
              <span className="font-medium text-text-primary">{item.title} </span>
            )}
            <RichText text={item.body} />
          </div>
        </li>
      ))}
    </ul>
  );
}

const TH =
  "px-5 py-3.5 text-[10px] font-normal uppercase tracking-[0.2em] text-muted";

function Table({ block }: { block: TableBlock }) {
  const { caption, columns, rows } = block.table;
  return (
    <figure className="flex flex-col gap-3">
      {caption && (
        <figcaption className="text-xs uppercase tracking-[0.2em] text-muted">
          {caption}
        </figcaption>
      )}
      <div className="overflow-x-auto rounded-2xl border border-stroke bg-surface">
        <table className="w-full min-w-[34rem] text-left text-sm">
          <thead>
            <tr className="border-b border-stroke">
              {columns.map((col) => (
                <th key={col} scope="col" className={TH}>
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr
                key={i}
                className="border-b border-stroke transition-colors duration-300 last:border-0 hover:bg-bg/40"
              >
                {row.map((cell, j) => (
                  <td
                    key={j}
                    className={`px-5 py-3.5 align-top leading-relaxed ${
                      j === 0 ? "text-text-primary" : "text-text-primary/75"
                    }`}
                  >
                    <RichText text={cell} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </figure>
  );
}

/** Renders the body of one case-study section. */
export function Blocks({
  body,
  checklist = false,
  storyboard,
}: {
  body: Block[];
  checklist?: boolean;
  /** What to render for a `storyboard` block. */
  storyboard?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6">
      {body.map((block, i) => {
        switch (block.kind) {
          case "paragraph":
            return (
              <p
                key={i}
                className="max-w-[72ch] text-sm leading-relaxed text-text-primary/80 md:text-base md:leading-relaxed"
              >
                <RichText text={block.text} />
              </p>
            );
          case "list":
            return <List key={i} block={block} checklist={checklist} />;
          case "table":
            return <Table key={i} block={block} />;
          case "storyboard":
            return <div key={i}>{storyboard}</div>;
        }
      })}
    </div>
  );
}

/** Before / after table, with the highlighted row (annual value) emphasised. */
export function ImpactTable({ rows }: { rows: ImpactRow[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-stroke bg-surface">
      <table className="w-full min-w-[36rem] text-left text-sm">
        <thead>
          <tr className="border-b border-stroke">
            <th scope="col" className={TH}>Metric</th>
            <th scope="col" className={TH}>Before</th>
            <th scope="col" className={TH}>After</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr
              key={row.metric}
              className={`border-b border-stroke last:border-0 ${
                row.highlight
                  ? "bg-[linear-gradient(90deg,rgb(var(--brand)/0.12),rgb(var(--brand)/0.03))]"
                  : "transition-colors duration-300 hover:bg-bg/40"
              }`}
            >
              <th
                scope="row"
                className="px-5 py-4 align-top font-normal text-text-primary/85"
              >
                {row.metric}
              </th>
              <td className="px-5 py-4 align-top text-muted">
                {row.before ? <FigureText figure={row.before} /> : "n/a"}
              </td>
              <td
                className={`px-5 py-4 align-top ${
                  row.highlight
                    ? "font-display text-2xl italic text-text-primary"
                    : "text-text-primary"
                }`}
              >
                <FigureText figure={row.after} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
