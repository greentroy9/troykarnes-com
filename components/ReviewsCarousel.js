"use client";

import { useState, useEffect } from "react";

const AUTO_ADVANCE_MS = 8000;

export default function ReviewsCarousel({ reviews }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const total = reviews.length;

  useEffect(() => {
    if (paused || total <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, AUTO_ADVANCE_MS);
    return () => clearInterval(id);
  }, [paused, total]);

  if (total === 0) return null;

  const review = reviews[index];

  return (
    <div
      className="max-w-3xl mx-auto"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <figure
        className="bg-background p-10 md:p-14 min-h-[280px] flex flex-col justify-center"
        aria-live="polite"
      >
        <blockquote className="font-[var(--font-body)] text-[17px] leading-[1.8] text-center">
          <span className="text-accent text-4xl leading-none font-[var(--font-display)] mr-1 align-top">
            &ldquo;
          </span>
          {review.quote}
          <span className="text-accent text-4xl leading-none font-[var(--font-display)] ml-1 align-top">
            &rdquo;
          </span>
        </blockquote>
        {(review.name || review.title) && (
          <figcaption className="text-center text-[13px] font-[var(--font-ui)] mt-6">
            {review.name && (
              <div className="font-semibold">{review.name}</div>
            )}
            {review.title && (
              <div
                className={`text-foreground/60 ${review.name ? "mt-1" : ""}`}
              >
                {review.title}
              </div>
            )}
          </figcaption>
        )}
      </figure>

    </div>
  );
}
