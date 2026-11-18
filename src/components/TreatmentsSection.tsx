import { useState } from 'react';
import { Check, Heart, Plus } from 'lucide-react';
import { BEAUTY_PRICE_LIST, SPA_TREATMENTS } from '../data/spaData';
import type { BookingFormState, PriceListItem, SpaTreatment } from '../data/spaData';
import { TreatmentCuteIcon } from './CuteIllustrations';

interface TreatmentsSectionProps {
  selectedTreatments: BookingFormState['selectedTreatments'];
  selectedPriceIds: string[];
  onToggleTreatment: (
    treatmentId: SpaTreatment['id'],
    focus: string,
    duration: string
  ) => void;
  onUpdateTreatmentVariant: (
    treatmentId: SpaTreatment['id'],
    focus: string,
    duration: string
  ) => void;
  onTogglePriceItem: (priceId: string) => void;
}

type CategoryFilter = 'All' | SpaTreatment['category'];
type PriceFilter = 'All' | PriceListItem['category'];

const FILTER_OPTIONS: CategoryFilter[] = [
  'All',
  'Massage & Body',
  'Facials & Skin',
  'Nails & Waxing',
  'Makeup & Hair',
];

const PRICE_FILTERS: Array<{ value: PriceFilter; label: string }> = [
  { value: 'All', label: 'All Prices' },
  { value: 'Nails', label: 'Nails (K100–K260)' },
  { value: 'Makeup', label: 'Makeup (K200–K450)' },
  { value: 'Hair', label: 'Hair (K250–K350)' },
];

export function TreatmentsSection({
  selectedTreatments,
  selectedPriceIds,
  onToggleTreatment,
  onUpdateTreatmentVariant,
  onTogglePriceItem,
}: TreatmentsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('All');
  const [priceFilter, setPriceFilter] = useState<PriceFilter>('All');
  const [draftVariants, setDraftVariants] = useState<
    Record<string, { focus: string; duration: string }>
  >(() =>
    Object.fromEntries(
      SPA_TREATMENTS.map((t) => [
        t.id,
        { focus: t.focusOptions[0], duration: t.durations[0] },
      ])
    )
  );

  const visibleTreatments =
    activeFilter === 'All'
      ? SPA_TREATMENTS
      : SPA_TREATMENTS.filter((t) => t.category === activeFilter);

  const visiblePrices =
    priceFilter === 'All'
      ? BEAUTY_PRICE_LIST
      : BEAUTY_PRICE_LIST.filter((p) => p.category === priceFilter);

  const handleVariantChange = (
    treatmentId: SpaTreatment['id'],
    field: 'focus' | 'duration',
    value: string
  ) => {
    const current = draftVariants[treatmentId];
    const next = { ...current, [field]: value };
    setDraftVariants((prev) => ({ ...prev, [treatmentId]: next }));

    const isSelected = selectedTreatments.some((s) => s.treatmentId === treatmentId);
    if (isSelected) {
      onUpdateTreatmentVariant(treatmentId, next.focus, next.duration);
    }
  };

  return (
    <section id="treatments" className="border-b border-[#F5D3DF] bg-[#FFF7FA] py-12 sm:py-16 lg:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-wide text-[#C22D6B]">
              Spa &amp; Beauty Menu
            </p>
            <h2 className="mt-1 font-display text-2xl font-semibold tracking-tight text-[#421C2D] sm:text-4xl text-balance">
              Choose Your Pamper Sessions
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#6B3B50]">
              Mix and match spa rituals, nails, makeup, and hair styling below. Everything you select flows straight into your WhatsApp booking message.
            </p>
          </div>

          {/* Mobile swipeable pill bar */}
          <div
            role="tablist"
            aria-label="Filter treatments by category"
            className="flex overflow-x-auto no-scrollbar items-center gap-1.5 rounded-2xl bg-[#FFE6EF] p-1.5 self-start -mx-1 px-1 sm:mx-0 sm:flex-wrap"
          >
            {FILTER_OPTIONS.map((category) => {
              const active = activeFilter === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveFilter(category)}
                  className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C22D6B] active:scale-95 ${
                    active
                      ? 'bg-white text-[#421C2D] shadow-xs'
                      : 'text-[#703C52] hover:text-[#421C2D]'
                  }`}
                >
                  {category === 'All' ? 'All Treatments' : category}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {visibleTreatments.map((treatment) => {
            const selectedItem = selectedTreatments.find(
              (s) => s.treatmentId === treatment.id
            );
            const isSelected = Boolean(selectedItem);
            const activeVariant = selectedItem ?? draftVariants[treatment.id];

            return (
              <article
                key={treatment.id}
                className={`flex flex-col justify-between rounded-3xl border p-5 sm:p-6 transition-all duration-150 ${
                  isSelected
                    ? 'border-[#C22D6B] bg-[#FFF0F6] shadow-[0_12px_30px_-14px_rgba(194,45,107,0.28)]'
                    : 'border-[#F3C8D8] bg-white hover:-translate-y-0.5 hover:border-[#E89EB9] shadow-[0_8px_24px_-14px_rgba(194,45,107,0.12)]'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-[#8B4D67]">
                        <span>{treatment.category}</span>
                        <span aria-hidden="true">·</span>
                        <span className="tabular-nums">
                          {treatment.priceRange
                            ? treatment.priceRange
                            : treatment.durations.join(' / ')}
                        </span>
                      </div>

                      <h3 className="mt-1.5 font-display text-xl sm:text-2xl font-semibold text-[#421C2D] leading-tight">
                        {treatment.number}. {treatment.title}
                      </h3>
                    </div>

                    <TreatmentCuteIcon id={treatment.id} />
                  </div>

                  <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-[#6B3B50]">
                    {treatment.description}
                  </p>

                  <div className="mt-4 space-y-3 border-t border-[#FCE4ED] pt-3.5">
                    <div>
                      <label
                        htmlFor={`focus-${treatment.id}`}
                        className="block text-xs font-semibold text-[#703C52]"
                      >
                        Treatment Focus
                      </label>
                      <select
                        id={`focus-${treatment.id}`}
                        value={activeVariant.focus}
                        onChange={(e) =>
                          handleVariantChange(treatment.id, 'focus', e.target.value)
                        }
                        className="mt-1 w-full min-h-[44px] rounded-xl border border-[#F0C2D3] bg-white px-3 py-2 text-base sm:text-sm text-[#421C2D] focus:border-[#C22D6B] focus:outline-none focus:ring-2 focus:ring-[#C22D6B]/20"
                      >
                        {treatment.focusOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor={`duration-${treatment.id}`}
                        className="block text-xs font-semibold text-[#703C52]"
                      >
                        Session Length
                      </label>
                      <select
                        id={`duration-${treatment.id}`}
                        value={activeVariant.duration}
                        onChange={(e) =>
                          handleVariantChange(treatment.id, 'duration', e.target.value)
                        }
                        className="mt-1 w-full min-h-[44px] rounded-xl border border-[#F0C2D3] bg-white px-3 py-2 text-base sm:text-sm text-[#421C2D] tabular-nums focus:border-[#C22D6B] focus:outline-none focus:ring-2 focus:ring-[#C22D6B]/20"
                      >
                        {treatment.durations.map((dur) => (
                          <option key={dur} value={dur}>
                            {dur}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-3.5 border-t border-[#FCE4ED]">
                  <p className="text-[11px] sm:text-xs text-[#8B4D67]">{treatment.careStandard}</p>
                  <button
                    type="button"
                    onClick={() =>
                      onToggleTreatment(
                        treatment.id,
                        activeVariant.focus,
                        activeVariant.duration
                      )
                    }
                    className={`mt-3 inline-flex min-h-[46px] w-full items-center justify-center gap-2 rounded-2xl px-4 py-2.5 text-sm font-semibold transition-all duration-150 whitespace-nowrap active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C22D6B] ${
                      isSelected
                        ? 'bg-[#421C2D] text-white hover:bg-[#5B283F]'
                        : 'bg-[#FFE6EF] text-[#A8225A] hover:bg-[#FAD2E2]'
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check className="h-4 w-4" aria-hidden="true" />
                        Added to Booking
                      </>
                    ) : (
                      <>
                        <Heart className="h-4 w-4" aria-hidden="true" />
                        Select for Booking
                      </>
                    )}
                  </button>
                </div>
              </article>
            );
          })}
        </div>

        {/* Nails, Makeup & Hair Price List */}
        <div
          id="price-list"
          className="mt-12 sm:mt-16 rounded-3xl border border-[#F3C8D8] bg-white p-4 sm:p-8 shadow-[0_12px_34px_-16px_rgba(194,45,107,0.16)]"
        >
          <div className="flex flex-col gap-4 border-b border-[#FCE4ED] pb-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold tracking-wide text-[#C22D6B]">
                Transparent Beauty Rates · Zambian Kwacha
              </p>
              <h3 className="mt-1 font-display text-xl sm:text-3xl font-semibold text-[#421C2D]">
                Nails, Makeup &amp; Hair Price List
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-[#6B3B50]">
                Nails range from K100 to K260; makeup and hair styling range up to K450. Tap any item to add it straight to your WhatsApp booking.
              </p>
            </div>

            {/* Mobile swipeable price filter */}
            <div
              role="tablist"
              aria-label="Filter beauty price list"
              className="flex overflow-x-auto no-scrollbar items-center gap-1.5 rounded-2xl bg-[#FFE6EF] p-1.5 self-start -mx-1 px-1 sm:mx-0 sm:flex-wrap"
            >
              {PRICE_FILTERS.map((tab) => {
                const active = priceFilter === tab.value;
                return (
                  <button
                    key={tab.value}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setPriceFilter(tab.value)}
                    className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all whitespace-nowrap shrink-0 tabular-nums active:scale-95 ${
                      active
                        ? 'bg-white text-[#421C2D] shadow-xs'
                        : 'text-[#703C52] hover:text-[#421C2D]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-2 divide-y divide-[#FCE8F0]">
            {visiblePrices.map((item) => {
              const isAdded = selectedPriceIds.includes(item.id);
              return (
                <div
                  key={item.id}
                  className="flex flex-col gap-2.5 py-3.5 sm:py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-1.5 text-xs font-medium text-[#8B4D67]">
                      <span className="rounded-md bg-[#FFEBF2] px-1.5 py-0.5 text-[11px] text-[#C22D6B] font-semibold">
                        {item.category}
                      </span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{item.duration}</span>
                    </div>
                    <p className="mt-1 text-sm sm:text-base font-semibold text-[#421C2D]">
                      {item.name}
                    </p>
                    <p className="mt-0.5 text-xs text-[#6B3B50]">{item.detail}</p>
                  </div>

                  <div className="flex items-center justify-between gap-3 sm:justify-end shrink-0 pt-1 sm:pt-0">
                    <span className="font-display text-lg sm:text-xl font-bold text-[#C22D6B] tabular-nums">
                      K{item.priceKwacha}
                    </span>

                    <button
                      type="button"
                      onClick={() => onTogglePriceItem(item.id)}
                      className={`inline-flex min-h-[42px] items-center gap-1.5 rounded-2xl px-3.5 py-2 text-xs font-semibold transition-all whitespace-nowrap active:scale-95 ${
                        isAdded
                          ? 'bg-[#421C2D] text-white hover:bg-[#5B283F]'
                          : 'bg-[#FFE6EF] text-[#A8225A] hover:bg-[#FAD2E2]'
                      }`}
                    >
                      {isAdded ? (
                        <>
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          Added
                        </>
                      ) : (
                        <>
                          <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                          Add to Booking
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
