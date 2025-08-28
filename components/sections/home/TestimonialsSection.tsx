'use client';

import { useEffect, useRef, useState } from 'react';
import Container from '@/components/ui/Container';
import { Card } from '@/components/ui/Card';
import { testimonials as testimonialsData } from '@/lib/data/testimonials';

// Helper to generate consistent colors from a string
const stringToColor = (str: string) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = hash % 360;
  return `hsl(${hue}, 70%, 85%)`; // Light pastel color
};

export default function MaterialTestimonials() {
  const items = Array.isArray(testimonialsData) ? testimonialsData : [];
  const count = items.length;

  const containerRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const [index, setIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [slideWidth, setSlideWidth] = useState(0);

  // Add CSS to hide scrollbar
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .testimonials-carousel::-webkit-scrollbar {
        display: none;
      }
      .testimonials-carousel {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
    `;
    document.head.appendChild(style);
    return () => style.remove();
  }, []);

  // Responsive breakpoint
  useEffect(() => {
    const mql = window.matchMedia('(min-width: 768px)');
    const onChange = () => setIsDesktop(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  // Measure slide width from viewport
  useEffect(() => {
    const measure = () => {
      const vp = viewportRef.current;
      if (!vp) return;
      const w = vp.clientWidth;
      setSlideWidth(isDesktop ? w / 2 : w);
    };

    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [isDesktop]);

  // Move to index with smooth scroll; supports wrap-around
  const goTo = (target: number) => {
    if (!containerRef.current || slideWidth === 0) {
      setIndex(((target % count) + count) % count);
      return;
    }

    const i = ((target % count) + count) % count;
    setIndex(i);
    containerRef.current.scrollTo({ left: i * slideWidth, behavior: 'smooth' });
  };

  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);

  // keyboard navigation
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  };

  if (count === 0) return null;

  return (
    <section className="py-24 overflow-hidden">
      <Container>
        <h2 className="text-4xl font-semibold mb-12 text-center text-[color:var(--md-sys-color-on-surface)]">
          What our customers say
        </h2>

        <div className="relative mx-auto max-w-6xl">
          <div ref={viewportRef} className="overflow-hidden">
            <div
              ref={containerRef}
              tabIndex={0}
              onKeyDown={onKeyDown}
              role="region"
              aria-roledescription="carousel"
              aria-label="Customer testimonials"
              className="flex  touch-pan-x testimonials-carousel"
              style={{
                scrollSnapType: 'x mandatory',
                overflowX: 'auto',
                scrollBehavior: 'smooth',
              }}
            >
              {items.map((t, i) => (
                <div
                  key={i}
                  style={{
                    flex: '0 0 auto',
                    width: isDesktop ? '50%' : '100%',
                  }}
                  className="box-border scroll-snap-align-start px-2"
                >
                  <Card className="p-8 flex flex-col justify-center rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 h-full min-h-80 bg-[color:var(--md-sys-color-surface)] text-[color:var(--md-sys-color-on-surface)]">
                    <div className="flex items-center gap-6 mb-6">
                      <div
                        style={{ backgroundColor: stringToColor(t.author) }}
                        className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-semibold"
                        title={t.author}
                      >
                        {t.author[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="font-medium">{t.author}</div>
                        <div className="text-sm text-[color:var(--md-sys-color-on-surface-variant)]">
                          {t.role}
                        </div>
                      </div>
                    </div>
                    <p className="text-[16px] rounded-2xl min-h-5/8 bg-[color:var(--md-sys-color-background)] p-4 leading-relaxed">
                      “{t.content}”
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 p-4 bg-[color:var(--md-sys-color-primary)] text-[color:var(--md-sys-color-on-primary)] rounded-full shadow-lg w-16 h-16 cursor-pointer hover:shadow-xl hover:scale-110 transition-all duration-300 text-2xl font-semibold z-10"
          >
            ‹
          </button>

          <button
            onClick={next}
            aria-label="Next testimonial"
            className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 p-4 bg-[color:var(--md-sys-color-primary)] text-[color:var(--md-sys-color-on-primary)] rounded-full shadow-lg w-16 h-16 cursor-pointer hover:shadow-xl hover:scale-110 transition-all duration-300 text-2xl font-semibold z-10"
          >
            ›
          </button>
        </div>
      </Container>
    </section>
  );
}
