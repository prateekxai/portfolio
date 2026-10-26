/** Smooth-scroll to a section by id, accounting for the floating navbar. */
export function scrollToSection(id: string, behavior: ScrollBehavior = "smooth") {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY;
  window.scrollTo({ top: id === "home" ? 0 : top, behavior });
}

/** Turns a heading into a stable anchor id ("The problem" → "the-problem"). */
export function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
