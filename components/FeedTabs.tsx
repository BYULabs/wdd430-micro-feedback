'use client';

import { useId, useRef, useState } from 'react';
import type { KeyboardEvent, ReactNode } from 'react';

export interface FeedTab {
  id: string;
  label: string;
  count: number;
  content: ReactNode;
}

interface FeedTabsProps {
  tabs: FeedTab[];
  /** Rendered at the end of the tab bar, e.g. a primary action. */
  action?: ReactNode;
}

export function FeedTabs({ tabs, action }: FeedTabsProps) {
  const baseId = useId();
  const [activeId, setActiveId] = useState(tabs[0]?.id);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (index: number) => {
    const tab = tabs[(index + tabs.length) % tabs.length];
    setActiveId(tab.id);
    tabRefs.current[tabs.indexOf(tab)]?.focus();
  };

  // Arrow keys and Home/End move between tabs, per the WAI-ARIA tabs pattern.
  const handleKeyDown = (event: KeyboardEvent, index: number) => {
    const moves: Record<string, number> = {
      ArrowRight: index + 1,
      ArrowLeft: index - 1,
      Home: 0,
      End: tabs.length - 1,
    };
    if (event.key in moves) {
      event.preventDefault();
      focusTab(moves[event.key]);
    }
  };

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80">
        <div role="tablist" aria-label="Feed" className="flex gap-6">
          {tabs.map((tab, index) => {
            const isActive = tab.id === activeId;
            return (
              <button
                key={tab.id}
                ref={(node) => {
                  tabRefs.current[index] = node;
                }}
                type="button"
                role="tab"
                id={`${baseId}-tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={`${baseId}-panel-${tab.id}`}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveId(tab.id)}
                onKeyDown={(event) => handleKeyDown(event, index)}
                className={`relative flex items-center gap-2 py-4 font-mono text-sm transition-colors focus-visible:outline-none focus-visible:text-slate-50 ${
                  isActive
                    ? 'text-slate-50'
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {tab.label}
                <span
                  className={`rounded px-1.5 py-0.5 text-xs ${
                    isActive
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {tab.count}
                </span>
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-px h-px bg-emerald-400"
                  />
                )}
              </button>
            );
          })}
        </div>
        {action}
      </div>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          id={`${baseId}-panel-${tab.id}`}
          aria-labelledby={`${baseId}-tab-${tab.id}`}
          hidden={tab.id !== activeId}
          className="panel-enter pt-6"
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}
