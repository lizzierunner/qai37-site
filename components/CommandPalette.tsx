"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import { searchSite, type SearchItem } from "@/lib/search-data";

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const router = useRouter();

  const closeSearch = () => {
    dialogRef.current?.close();
    setOpen(false);
    returnFocusRef.current?.focus();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (!document.activeElement?.closest(".cmd-dialog")) {
          returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        } else {
          dialogRef.current?.close();
          returnFocusRef.current?.focus();
        }
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        if (dialogRef.current?.open) {
          dialogRef.current.close();
          returnFocusRef.current?.focus();
        }
        setOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filtered = searchSite(query);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (open && dialog && !dialog.open) dialog.showModal();
    return () => { if (dialog?.open) dialog.close(); };
  }, [open]);

  useEffect(() => {
    if (open) selectedRef.current?.scrollIntoView({ block: "nearest", behavior: "instant" });
  }, [open, selectedIndex, query]);

  const handleSelect = (item: SearchItem) => {
    setOpen(false);
    setQuery("");
    setSelectedIndex(0);
    if (item.isExternal) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    } else {
      router.push(item.url);
    }
  };

  const handleKeyDownInMenu = (e: React.KeyboardEvent) => {
    if (!(e.target instanceof HTMLInputElement)) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((i) => (i + 1) % Math.max(1, filtered.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((i) => (i - 1 + filtered.length) % Math.max(1, filtered.length));
    } else if (e.key === "Enter" && filtered[selectedIndex]) {
      e.preventDefault();
      handleSelect(filtered[selectedIndex]);
    }
  };

  if (!open) return null;

  return (
    <dialog ref={dialogRef} className="cmd-backdrop" aria-label="Site search" onCancel={(event) => { event.preventDefault(); closeSearch(); }} onClick={closeSearch}>
      <div className="cmd-dialog" onClick={(e) => e.stopPropagation()} onKeyDown={handleKeyDownInMenu}>
        <div className="cmd-search-wrap">
          <Search className="cmd-search-icon" aria-hidden="true" />
          <input
            type="text"
            className="cmd-input"
            placeholder="Search qAI37..."
            aria-label="Search pages and news"
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            autoFocus
          />
          <button type="button" className="cmd-close" aria-label="Close search" title="Close search" onClick={closeSearch}><X size={18} aria-hidden="true" /></button>
        </div>

        <div className="cmd-results">
          {filtered.length === 0 ? (
            <div className="cmd-empty" role="status">No results found for &quot;{query}&quot;</div>
          ) : (
            filtered.map((item, i) => (
              <button
                key={item.id}
                type="button"
                ref={i === selectedIndex ? selectedRef : undefined}
                className={`cmd-item ${i === selectedIndex ? "selected" : ""}`}
                onClick={() => handleSelect(item)}
                onMouseEnter={() => setSelectedIndex(i)}
              >
                <div className="cmd-item-main">
                  <span className="cmd-item-title">{item.title}</span>
                  <span className="cmd-item-sub">{item.subtitle}</span>
                </div>
                <span className="cmd-item-cat">{item.category}</span>
              </button>
            ))
          )}
        </div>

        <div className="cmd-footer">
          <span><kbd className="cmd-mini-kbd">↑↓</kbd> navigate</span>
          <span><kbd className="cmd-mini-kbd">↵</kbd> select</span>
          <span><kbd className="cmd-mini-kbd">esc</kbd> close</span>
        </div>
      </div>
    </dialog>
  );
}
