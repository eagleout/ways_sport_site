"use client";

import { useId, useState } from "react";
import type { FaqItem } from "@/lib/content";

export default function Faq({ items, light = false }: { items: FaqItem[]; light?: boolean }) {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <div className={light ? "faq faq--light" : "faq"}>
      {items.map((item, index) => {
        const isOpen = open === index;
        const panelId = `${baseId}-panel-${index}`;
        const buttonId = `${baseId}-button-${index}`;
        return (
          <div key={item.q} className={isOpen ? "faq__item is-open" : "faq__item"} data-reveal data-delay={String(index * 0.05)}>
            <h3 style={{ margin: 0 }}>
              <button
                id={buttonId}
                type="button"
                className="faq__q"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpen(isOpen ? null : index)}
              >
                {item.q}
                <span className="faq__icon" aria-hidden="true" />
              </button>
            </h3>
            <div id={panelId} className="faq__a" role="region" aria-labelledby={buttonId}>
              <div>
                <p>{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
