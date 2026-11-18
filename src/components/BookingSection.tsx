import { useMemo, useState } from 'react';
import {
  Calendar,
  CalendarHeart,
  Check,
  ChevronDown,
  ChevronUp,
  Copy,
  Flower2,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquareHeart,
  Phone,
  Plus,
  Trash2,
} from 'lucide-react';
import {
  buildBookingSubject,
  buildEmailUrl,
  buildWhatsAppMessage,
  buildWhatsAppUrl,
  getSelectedPriceItems,
  SPA_TREATMENTS,
  THERAPIST_PROFILE,
  TIME_WINDOWS,
} from '../data/spaData';
import type { BookingFormState, SpaTreatment } from '../data/spaData';

interface BookingSectionProps {
  booking: BookingFormState;
  onChangeBooking: (updater: (prev: BookingFormState) => BookingFormState) => void;
}

export function BookingSection({ booking, onChangeBooking }: BookingSectionProps) {
  const [copied, setCopied] = useState(false);
  const [validationAttempted, setValidationAttempted] = useState(false);
  const [showPreviewOnMobile, setShowPreviewOnMobile] = useState(false);

  const todayIso = useMemo(() => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }, []);

  const selectedPriceItems = useMemo(
    () => getSelectedPriceItems(booking.selectedPriceIds),
    [booking.selectedPriceIds]
  );

  const pricedTotalKwacha = useMemo(
    () => selectedPriceItems.reduce((sum, item) => sum + item.priceKwacha, 0),
    [selectedPriceItems]
  );

  const totalItemsCount =
    booking.selectedTreatments.length + selectedPriceItems.length;

  const errors = useMemo(() => {
    const list: Record<string, string> = {};
    if (!booking.clientName.trim()) {
      list.clientName = 'Please enter your name so Evita knows who is booking.';
    }
    if (!booking.clientPhone.trim()) {
      list.clientPhone = 'Please enter your phone or WhatsApp number for confirmation.';
    }
    if (!booking.preferredDate) {
      list.preferredDate = 'Please select your preferred appointment date.';
    }
    if (totalItemsCount === 0) {
      list.treatments = 'Please select at least one spa or beauty service.';
    }
    return list;
  }, [booking, totalItemsCount]);

  const isFormValid = Object.keys(errors).length === 0;
  const bookingSubject = useMemo(() => buildBookingSubject(booking), [booking]);
  const bookingMessage = useMemo(() => buildWhatsAppMessage(booking), [booking]);
  const whatsappUrl = useMemo(() => buildWhatsAppUrl(booking), [booking]);
  const emailUrl = useMemo(() => buildEmailUrl(booking), [booking]);

  const isEmailMode = booking.preferredChannel === 'email';

  const handleField = <K extends keyof BookingFormState>(
    key: K,
    value: BookingFormState[K]
  ) => {
    onChangeBooking((prev) => ({ ...prev, [key]: value }));
  };

  const handleToggleTreatmentQuick = (treatment: SpaTreatment) => {
    onChangeBooking((prev) => {
      const exists = prev.selectedTreatments.some(
        (item) => item.treatmentId === treatment.id
      );
      if (exists) {
        return {
          ...prev,
          selectedTreatments: prev.selectedTreatments.filter(
            (item) => item.treatmentId !== treatment.id
          ),
        };
      }
      return {
        ...prev,
        selectedTreatments: [
          ...prev.selectedTreatments,
          {
            treatmentId: treatment.id,
            focus: treatment.focusOptions[0],
            duration: treatment.durations[0],
          },
        ],
      };
    });
  };

  const handleRemovePriceItem = (priceId: string) => {
    onChangeBooking((prev) => ({
      ...prev,
      selectedPriceIds: prev.selectedPriceIds.filter((id) => id !== priceId),
    }));
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(bookingMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section
      id="booking"
      className="border-b border-[#F5D3DF] bg-gradient-to-b from-[#FFEBF2]/75 to-[#FFF4F8] py-12 sm:py-16 lg:py-20"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="max-w-2xl">
          <p className="text-xs font-semibold tracking-wide text-[#C22D6B]">
            WhatsApp ({THERAPIST_PROFILE.phoneLocal}) · Direct Booking
          </p>
          <h2 className="mt-1 font-display text-2xl sm:text-4xl font-semibold tracking-tight text-[#421C2D] text-balance">
            Book via WhatsApp or Email
          </h2>
          <p className="mt-2 text-sm sm:text-base text-[#6B3B50]">
            Fill in your pamper preferences below, choose WhatsApp or Email, and dispatch your booking directly to {THERAPIST_PROFILE.name}.
          </p>
        </div>

        <div className="mt-8 sm:mt-10 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-start">
          {/* Left Form Column */}
          <div className="rounded-3xl border border-[#F3C8D8] bg-white p-5 sm:p-8 shadow-[0_12px_34px_-16px_rgba(194,45,107,0.18)] lg:col-span-7">
            {/* 1. Chosen Services */}
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h3 className="inline-flex items-center gap-2 text-sm font-semibold text-[#421C2D]">
                  <Flower2 className="h-4 w-4 text-[#C22D6B]" aria-hidden="true" />
                  1. Choose Your Services
                </h3>
                <span className="rounded-full bg-[#FFEBF2] px-2.5 py-0.5 text-xs font-semibold text-[#C22D6B] tabular-nums">
                  {totalItemsCount} selected
                  {pricedTotalKwacha > 0 ? ` · Total K${pricedTotalKwacha}` : ''}
                </span>
              </div>

              {/* Quick toggle chips */}
              <div className="mt-3 flex flex-wrap gap-1.5 sm:gap-2">
                {SPA_TREATMENTS.map((treatment) => {
                  const selected = booking.selectedTreatments.some(
                    (s) => s.treatmentId === treatment.id
                  );
                  return (
                    <button
                      key={treatment.id}
                      type="button"
                      onClick={() => handleToggleTreatmentQuick(treatment)}
                      className={`inline-flex min-h-[42px] items-center gap-1.5 rounded-2xl border px-3 py-2 text-xs font-semibold transition-all whitespace-nowrap active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C22D6B] ${
                        selected
                          ? 'border-[#C22D6B] bg-[#C22D6B] text-white shadow-xs'
                          : 'border-[#F3C8D8] bg-[#FFF7FA] text-[#6B3B50] hover:bg-[#FFEBF2]'
                      }`}
                    >
                      {selected ? (
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      ) : (
                        <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                      )}
                      {treatment.title}
                    </button>
                  );
                })}
              </div>

              {/* List of currently selected items */}
              {totalItemsCount > 0 ? (
                <ul className="mt-4 divide-y divide-[#FCE4ED] border-t border-b border-[#FCE4ED]">
                  {booking.selectedTreatments.map((item) => {
                    const t = SPA_TREATMENTS.find((x) => x.id === item.treatmentId);
                    if (!t) return null;
                    return (
                      <li
                        key={item.treatmentId}
                        className="flex items-center justify-between gap-3 py-2.5 text-sm"
                      >
                        <div className="min-w-0">
                          <p className="font-semibold text-[#421C2D] truncate">
                            {t.title}
                          </p>
                          <p className="text-xs text-[#8B4D67] tabular-nums truncate">
                            {item.focus} · {item.duration}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleToggleTreatmentQuick(t)}
                          aria-label={`Remove ${t.title}`}
                          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#8B4D67] transition-colors hover:bg-[#FFEBF2] hover:text-[#C22D6B] active:scale-95"
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </li>
                    );
                  })}

                  {selectedPriceItems.map((priceItem) => (
                    <li
                      key={priceItem.id}
                      className="flex items-center justify-between gap-3 py-2.5 text-sm"
                    >
                      <div className="min-w-0">
                        <p className="font-semibold text-[#421C2D] truncate">
                          {priceItem.name}
                        </p>
                        <p className="text-xs text-[#C22D6B] font-medium tabular-nums">
                          {priceItem.category} · {priceItem.duration} · K{priceItem.priceKwacha}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleRemovePriceItem(priceItem.id)}
                        aria-label={`Remove ${priceItem.name}`}
                        className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-[#8B4D67] transition-colors hover:bg-[#FFEBF2] hover:text-[#C22D6B] active:scale-95"
                      >
                        <Trash2 className="h-4 w-4" aria-hidden="true" />
                      </button>
                    </li>
                  ))}
                </ul>
              ) : (
                validationAttempted &&
                errors.treatments && (
                  <p className="mt-2 text-xs font-semibold text-[#B3205C]">
                    {errors.treatments}
                  </p>
                )
              )}
            </div>

            {/* 2. Session Setting */}
            <div className="mt-6 sm:mt-7 border-t border-[#FCE4ED] pt-5 sm:pt-6">
              <h3 className="inline-flex items-center gap-2 text-sm font-semibold text-[#421C2D]">
                <MapPin className="h-4 w-4 text-[#C22D6B]" aria-hidden="true" />
                2. Where Should We Meet?
              </h3>
              <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => handleField('sessionSetting', 'studio')}
                  className={`flex items-start gap-3 rounded-2xl border p-3.5 text-left transition-all active:scale-[0.99] ${
                    booking.sessionSetting === 'studio'
                      ? 'border-[#C22D6B] bg-[#FFF0F6] ring-1 ring-[#C22D6B]/50'
                      : 'border-[#F3C8D8] bg-white hover:bg-[#FFF7FA]'
                  }`}
                >
                  <MapPin
                    className={`mt-0.5 h-4 w-4 shrink-0 ${
                      booking.sessionSetting === 'studio'
                        ? 'text-[#C22D6B]'
                        : 'text-[#8B4D67]'
                    }`}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#421C2D]">
                      Private Studio Session
                    </p>
                    <p className="mt-0.5 text-xs text-[#8B4D67]">
                      {THERAPIST_PROFILE.shortLocation}
                    </p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleField('sessionSetting', 'home')}
                  className={`flex items-start gap-3 rounded-2xl border p-3.5 text-left transition-all active:scale-[0.99] ${
                    booking.sessionSetting === 'home'
                      ? 'border-[#C22D6B] bg-[#FFF0F6] ring-1 ring-[#C22D6B]/50'
                      : 'border-[#F3C8D8] bg-white hover:bg-[#FFF7FA]'
                  }`}
                >
                  <Calendar
                    className={`mt-0.5 h-4 w-4 shrink-0 ${
                      booking.sessionSetting === 'home'
                        ? 'text-[#C22D6B]'
                        : 'text-[#8B4D67]'
                    }`}
                    aria-hidden="true"
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#421C2D]">
                      Home or Lodge Visit
                    </p>
                    <p className="mt-0.5 text-xs text-[#8B4D67]">
                      Within Siavonga area (by arrangement)
                    </p>
                  </div>
                </button>
              </div>

              {booking.sessionSetting === 'home' && (
                <div className="mt-3">
                  <label
                    htmlFor="home-area"
                    className="block text-xs font-semibold text-[#703C52]"
                  >
                    Siavonga Area / Lodge / Street Name
                  </label>
                  <input
                    id="home-area"
                    type="text"
                    value={booking.homeArea}
                    onChange={(e) => handleField('homeArea', e.target.value)}
                    placeholder="e.g., Kariba Hills, Town Centre, or Lakeside Lodge"
                    className="mt-1 w-full min-h-[46px] rounded-xl border border-[#F0C2D3] bg-white px-3.5 py-2.5 text-base sm:text-sm text-[#421C2D] placeholder:text-[#BA8DA0] focus:border-[#C22D6B] focus:outline-none focus:ring-2 focus:ring-[#C22D6B]/20"
                  />
                </div>
              )}
            </div>

            {/* 3. Date & Time */}
            <div className="mt-6 sm:mt-7 border-t border-[#FCE4ED] pt-5 sm:pt-6">
              <h3 className="inline-flex items-center gap-2 text-sm font-semibold text-[#421C2D]">
                <CalendarHeart className="h-4 w-4 text-[#C22D6B]" aria-hidden="true" />
                3. Pick Your Date &amp; Time
              </h3>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="booking-date"
                    className="block text-xs font-semibold text-[#703C52]"
                  >
                    Preferred Date <span className="text-[#C22D6B]">*</span>
                  </label>
                  <input
                    id="booking-date"
                    type="date"
                    min={todayIso}
                    value={booking.preferredDate}
                    onChange={(e) => handleField('preferredDate', e.target.value)}
                    className="mt-1 w-full min-h-[46px] rounded-xl border border-[#F0C2D3] bg-white px-3 py-2.5 text-base sm:text-sm text-[#421C2D] tabular-nums focus:border-[#C22D6B] focus:outline-none focus:ring-2 focus:ring-[#C22D6B]/20"
                  />
                  {validationAttempted && errors.preferredDate && (
                    <p className="mt-1 text-xs font-semibold text-[#B3205C]">
                      {errors.preferredDate}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="booking-window"
                    className="block text-xs font-semibold text-[#703C52]"
                  >
                    Time Window
                  </label>
                  <select
                    id="booking-window"
                    value={booking.timeWindow}
                    onChange={(e) => handleField('timeWindow', e.target.value)}
                    className="mt-1 w-full min-h-[46px] rounded-xl border border-[#F0C2D3] bg-white px-3 py-2.5 text-base sm:text-sm text-[#421C2D] tabular-nums focus:border-[#C22D6B] focus:outline-none focus:ring-2 focus:ring-[#C22D6B]/20"
                  >
                    {TIME_WINDOWS.map((win) => (
                      <option key={win} value={win}>
                        {win}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-3">
                <label
                  htmlFor="booking-exact-time"
                  className="block text-xs font-semibold text-[#703C52]"
                >
                  Exact Time Note (optional)
                </label>
                <input
                  id="booking-exact-time"
                  type="text"
                  value={booking.exactTime}
                  onChange={(e) => handleField('exactTime', e.target.value)}
                  placeholder="e.g., 10:00 AM or after 4:00 PM"
                  className="mt-1 w-full min-h-[46px] rounded-xl border border-[#F0C2D3] bg-white px-3.5 py-2.5 text-base sm:text-sm text-[#421C2D] placeholder:text-[#BA8DA0] focus:border-[#C22D6B] focus:outline-none focus:ring-2 focus:ring-[#C22D6B]/20"
                />
              </div>
            </div>

            {/* 4. Client Contact & Notes */}
            <div className="mt-6 sm:mt-7 border-t border-[#FCE4ED] pt-5 sm:pt-6">
              <h3 className="inline-flex items-center gap-2 text-sm font-semibold text-[#421C2D]">
                <MessageSquareHeart className="h-4 w-4 text-[#C22D6B]" aria-hidden="true" />
                4. Your Details &amp; Comfort Notes
              </h3>

              <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="client-name"
                    className="block text-xs font-semibold text-[#703C52]"
                  >
                    Your Full Name <span className="text-[#C22D6B]">*</span>
                  </label>
                  <input
                    id="client-name"
                    type="text"
                    value={booking.clientName}
                    onChange={(e) => handleField('clientName', e.target.value)}
                    placeholder="e.g., Mutinta Banda"
                    className="mt-1 w-full min-h-[46px] rounded-xl border border-[#F0C2D3] bg-white px-3.5 py-2.5 text-base sm:text-sm text-[#421C2D] placeholder:text-[#BA8DA0] focus:border-[#C22D6B] focus:outline-none focus:ring-2 focus:ring-[#C22D6B]/20"
                  />
                  {validationAttempted && errors.clientName && (
                    <p className="mt-1 text-xs font-semibold text-[#B3205C]">
                      {errors.clientName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="client-phone"
                    className="block text-xs font-semibold text-[#703C52]"
                  >
                    Your Phone / WhatsApp Number <span className="text-[#C22D6B]">*</span>
                  </label>
                  <input
                    id="client-phone"
                    type="tel"
                    value={booking.clientPhone}
                    onChange={(e) => handleField('clientPhone', e.target.value)}
                    placeholder="e.g., 0977 123 456"
                    className="mt-1 w-full min-h-[46px] rounded-xl border border-[#F0C2D3] bg-white px-3.5 py-2.5 text-base sm:text-sm text-[#421C2D] placeholder:text-[#BA8DA0] tabular-nums focus:border-[#C22D6B] focus:outline-none focus:ring-2 focus:ring-[#C22D6B]/20"
                  />
                  {validationAttempted && errors.clientPhone && (
                    <p className="mt-1 text-xs font-semibold text-[#B3205C]">
                      {errors.clientPhone}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-3">
                <label
                  htmlFor="client-email"
                  className="block text-xs font-semibold text-[#703C52]"
                >
                  Your Email Address (optional)
                </label>
                <input
                  id="client-email"
                  type="email"
                  value={booking.clientEmail}
                  onChange={(e) => handleField('clientEmail', e.target.value)}
                  placeholder="e.g., mutinta@example.com"
                  className="mt-1 w-full min-h-[46px] rounded-xl border border-[#F0C2D3] bg-white px-3.5 py-2.5 text-base sm:text-sm text-[#421C2D] placeholder:text-[#BA8DA0] focus:border-[#C22D6B] focus:outline-none focus:ring-2 focus:ring-[#C22D6B]/20"
                />
              </div>

              <div className="mt-3">
                <label
                  htmlFor="skin-notes"
                  className="block text-xs font-semibold text-[#703C52]"
                >
                  Skin Sensitivity, Allergies, or Pressure Preference (optional)
                </label>
                <textarea
                  id="skin-notes"
                  rows={2}
                  value={booking.skinNotes}
                  onChange={(e) => handleField('skinNotes', e.target.value)}
                  placeholder="Share sensitive areas, favourite scents, or gentle/firm pressure wishes..."
                  className="mt-1 w-full rounded-xl border border-[#F0C2D3] bg-white px-3.5 py-2.5 text-base sm:text-sm text-[#421C2D] placeholder:text-[#BA8DA0] focus:border-[#C22D6B] focus:outline-none focus:ring-2 focus:ring-[#C22D6B]/20"
                />
              </div>
            </div>
          </div>

          {/* Right Live Dispatch Panel (Sticky on Desktop, Instant Action on Mobile) */}
          <div className="rounded-3xl border border-[#F3C8D8] bg-white p-5 sm:p-7 shadow-[0_12px_34px_-16px_rgba(194,45,107,0.2)] lg:col-span-5 lg:sticky lg:top-24">
            <div className="border-b border-[#FCE4ED] pb-4">
              <p className="text-xs font-semibold text-[#C22D6B]">
                Choose Booking Channel
              </p>
              <h3 className="mt-0.5 font-display text-xl sm:text-2xl font-semibold text-[#421C2D]">
                Send to Evita Sinzala
              </h3>

              <div
                role="tablist"
                aria-label="Choose WhatsApp or Email booking destination"
                className="mt-3 grid grid-cols-2 gap-1.5 rounded-2xl bg-[#FFE6EF] p-1.5"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={!isEmailMode}
                  onClick={() => handleField('preferredChannel', 'whatsapp')}
                  className={`inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-all whitespace-nowrap active:scale-95 ${
                    !isEmailMode
                      ? 'bg-[#25D366] text-white shadow-xs'
                      : 'text-[#703C52] hover:text-[#421C2D]'
                  }`}
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={isEmailMode}
                  onClick={() => handleField('preferredChannel', 'email')}
                  className={`inline-flex min-h-[42px] items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold transition-all whitespace-nowrap active:scale-95 ${
                    isEmailMode
                      ? 'bg-[#C22D6B] text-white shadow-xs'
                      : 'text-[#703C52] hover:text-[#421C2D]'
                  }`}
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Email
                </button>
              </div>
            </div>

            {/* Quick Summary Strip */}
            <div className="mt-4 rounded-2xl bg-[#FFF6FA] p-3 border border-[#FCE4ED] text-xs text-[#6B3B50] space-y-1">
              <div className="flex justify-between">
                <span className="text-[#8B4D67]">Client:</span>
                <span className="font-semibold text-[#421C2D] truncate">
                  {booking.clientName.trim() || 'Guest'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8B4D67]">Date &amp; Time:</span>
                <span className="font-semibold text-[#421C2D] tabular-nums">
                  {booking.preferredDate || 'Not selected'} · {booking.timeWindow}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8B4D67]">Services:</span>
                <span className="font-semibold text-[#C22D6B] tabular-nums">
                  {totalItemsCount} selected
                  {pricedTotalKwacha > 0 ? ` (K${pricedTotalKwacha})` : ''}
                </span>
              </div>
            </div>

            {/* Mobile collapsible message preview */}
            <div className="mt-3">
              <button
                type="button"
                onClick={() => setShowPreviewOnMobile((prev) => !prev)}
                className="flex w-full items-center justify-between text-xs font-semibold text-[#8B4D67] hover:text-[#C22D6B] py-1"
              >
                <span>{showPreviewOnMobile ? 'Hide message text' : 'View formatted message'}</span>
                {showPreviewOnMobile ? (
                  <ChevronUp className="h-3.5 w-3.5" />
                ) : (
                  <ChevronDown className="h-3.5 w-3.5" />
                )}
              </button>

              {showPreviewOnMobile && (
                <pre className="mt-2 max-h-56 overflow-y-auto whitespace-pre-wrap rounded-2xl bg-[#FFF6FA] p-3.5 font-sans text-xs leading-relaxed text-[#421C2D] border border-[#FCE4ED]">
                  {bookingMessage}
                </pre>
              )}
            </div>

            {!isFormValid && validationAttempted && (
              <div className="mt-3 rounded-xl bg-[#FFEBF2] p-2.5 text-xs font-semibold text-[#B3205C] border border-[#F5C2D4]">
                Please complete your name, phone number, and choose at least one service above.
              </div>
            )}

            <div className="mt-4 space-y-2.5">
              {isFormValid ? (
                isEmailMode ? (
                  <a
                    href={emailUrl}
                    className="inline-flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-2xl bg-[#C22D6B] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(194,45,107,0.55)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#A8225A] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C22D6B]"
                  >
                    <Mail className="h-4 w-4" aria-hidden="true" />
                    Send Booking via Email
                  </a>
                ) : (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(37,211,102,0.55)] transition-all duration-150 hover:-translate-y-0.5 hover:bg-[#20BD5A] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#25D366]"
                  >
                    <MessageCircle className="h-4 w-4 fill-white" aria-hidden="true" />
                    Open WhatsApp Chat with Evita
                  </a>
                )
              ) : (
                <button
                  type="button"
                  onClick={() => setValidationAttempted(true)}
                  className={`inline-flex min-h-[50px] w-full items-center justify-center gap-2.5 rounded-2xl px-5 py-3 text-sm font-semibold text-white transition-all duration-150 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 ${
                    isEmailMode
                      ? 'bg-[#C22D6B] hover:bg-[#A8225A]'
                      : 'bg-[#25D366] hover:bg-[#20BD5A]'
                  }`}
                >
                  {isEmailMode ? (
                    <>
                      <Mail className="h-4 w-4" aria-hidden="true" />
                      Confirm &amp; Send via Email
                    </>
                  ) : (
                    <>
                      <MessageCircle className="h-4 w-4 fill-white" aria-hidden="true" />
                      Confirm &amp; Open WhatsApp Chat
                    </>
                  )}
                </button>
              )}

              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-2xl border border-[#F0C2D3] bg-white px-3 py-2 text-xs font-semibold text-[#421C2D] transition-colors hover:bg-[#FFEBF2] whitespace-nowrap active:scale-95"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#C22D6B]" aria-hidden="true" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-[#8B4D67]" aria-hidden="true" />
                      Copy Message
                    </>
                  )}
                </button>

                <a
                  href={`tel:${THERAPIST_PROFILE.phoneRaw}`}
                  className="inline-flex min-h-[42px] items-center justify-center gap-1.5 rounded-2xl border border-[#F0C2D3] bg-white px-3 py-2 text-xs font-semibold text-[#421C2D] transition-colors hover:bg-[#FFEBF2] whitespace-nowrap active:scale-95"
                >
                  <Phone className="h-3.5 w-3.5 text-[#C22D6B]" aria-hidden="true" />
                  Call Directly
                </a>
              </div>
            </div>

            <p className="mt-3 text-[11px] sm:text-xs text-center text-[#8B4D67]">
              {isEmailMode
                ? `Sends formatted booking to ${THERAPIST_PROFILE.email}`
                : `Launches WhatsApp directly to wa.me/${THERAPIST_PROFILE.whatsappNumber}`}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
