import { useEffect, useState } from 'react';
import {
  CalendarHeart,
  Flower2,
  HeartHandshake,
  Home,
  Sparkles,
} from 'lucide-react';

interface BottomDockNavProps {
  selectedCount: number;
}

type SectionId = 'top' | 'treatments' | 'booking' | 'ai-therapist' | 'credentials';

const DOCK_ITEMS: Array<{
  id: SectionId;
  label: string;
  Icon: typeof Home;
}> = [
  { id: 'top', label: 'Home', Icon: Home },
  { id: 'treatments', label: 'Menu', Icon: Flower2 },
  { id: 'booking', label: 'Book', Icon: CalendarHeart },
  { id: 'ai-therapist', label: 'AI Tips', Icon: Sparkles },
  { id: 'credentials', label: 'About', Icon: HeartHandshake },
];

export function BottomDockNav({ selectedCount }: BottomDockNavProps) {
  const [activeId, setActiveId] = useState<SectionId>('top');

  useEffect(() => {
    const sectionIds: SectionId[] = [
      'top',
      'treatments',
      'booking',
      'ai-therapist',
      'credentials',
    ];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);

    if (elements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const id = visible[0].target.id as SectionId;
          setActiveId(id);
        }
      },
      {
        rootMargin: '-25% 0px -45% 0px',
        threshold: [0.1, 0.35, 0.6],
      }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavigate = (id: SectionId) => {
    setActiveId(id);
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav
      aria-label="Floating Bottom Navigation"
      className="fixed bottom-[calc(env(safe-area-inset-bottom,0px)+0.65rem)] left-1/2 z-50 w-[calc(100%-20px)] max-w-sm sm:max-w-md -translate-x-1/2"
    >
      <div className="grid grid-cols-5 items-center gap-0.5 sm:gap-1 rounded-[26px] border border-white/80 bg-[#FFF4F8]/92 p-1.5 ring-1 ring-[#F3C5D6]/80 backdrop-blur-xl shadow-[0_12px_36px_-8px_rgba(194,45,107,0.38),0_2px_10px_rgba(66,28,45,0.08)]">
        {DOCK_ITEMS.map(({ id, label, Icon }) => {
          const isActive = activeId === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => handleNavigate(id)}
              aria-current={isActive ? 'page' : undefined}
              className={`relative flex min-h-[46px] sm:min-h-[48px] flex-col items-center justify-center rounded-[20px] px-1 py-1 transition-all duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C22D6B] active:scale-95 ${
                isActive
                  ? 'bg-[#C22D6B] text-white shadow-[0_6px_16px_-6px_rgba(194,45,107,0.7)]'
                  : 'text-[#703C52] hover:bg-[#FFE6F0] hover:text-[#421C2D]'
              }`}
            >
              <span className="relative inline-flex items-center justify-center">
                <Icon
                  className="h-[18px] w-[18px] sm:h-[19px] sm:w-[19px]"
                  strokeWidth={isActive ? 2.2 : 1.85}
                  aria-hidden="true"
                />
                {id === 'booking' && selectedCount > 0 && (
                  <span
                    className={`absolute -top-1.5 -right-2 flex h-4 min-w-[16px] items-center justify-center rounded-full px-1 text-[10px] font-bold tabular-nums leading-none shadow-xs ${
                      isActive
                        ? 'bg-white text-[#C22D6B]'
                        : 'bg-[#C22D6B] text-white animate-pulse'
                    }`}
                  >
                    {selectedCount}
                  </span>
                )}
              </span>
              <span className="mt-1 text-[10.5px] sm:text-[11px] font-semibold tracking-tight leading-none whitespace-nowrap">
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
