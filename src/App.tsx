import { useState } from 'react';
import { AiTherapistSection } from './components/AiTherapistSection';
import { BookingSection } from './components/BookingSection';
import { BottomDockNav } from './components/BottomDockNav';
import { CredentialsSection } from './components/CredentialsSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { Navbar } from './components/Navbar';
import { TreatmentsSection } from './components/TreatmentsSection';
import { SPA_TREATMENTS, TIME_WINDOWS } from './data/spaData';
import type { BookingFormState, SpaTreatment } from './data/spaData';

function getTomorrowIsoDate(): string {
  const date = new Date();
  date.setDate(date.getDate() + 1);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export default function App() {
  const [booking, setBooking] = useState<BookingFormState>(() => ({
    clientName: '',
    clientPhone: '',
    clientEmail: '',
    preferredChannel: 'whatsapp',
    preferredDate: getTomorrowIsoDate(),
    timeWindow: TIME_WINDOWS[0],
    exactTime: '',
    sessionSetting: 'studio',
    homeArea: '',
    skinNotes: '',
    selectedTreatments: [
      {
        treatmentId: SPA_TREATMENTS[0].id,
        focus: SPA_TREATMENTS[0].focusOptions[0],
        duration: SPA_TREATMENTS[0].durations[1],
      },
    ],
    selectedPriceIds: [],
  }));

  const totalSelectedCount =
    booking.selectedTreatments.length + booking.selectedPriceIds.length;

  const scrollToBooking = () => {
    const el = document.getElementById('booking');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const ensureTreatmentSelectedAndScroll = (treatmentId: SpaTreatment['id']) => {
    const treatment = SPA_TREATMENTS.find((t) => t.id === treatmentId);
    if (!treatment) return;

    setBooking((prev) => {
      const exists = prev.selectedTreatments.some(
        (item) => item.treatmentId === treatmentId
      );
      if (exists) return prev;
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

    scrollToBooking();
  };

  const handleToggleTreatment = (
    treatmentId: SpaTreatment['id'],
    focus: string,
    duration: string
  ) => {
    setBooking((prev) => {
      const exists = prev.selectedTreatments.some(
        (item) => item.treatmentId === treatmentId
      );
      if (exists) {
        return {
          ...prev,
          selectedTreatments: prev.selectedTreatments.filter(
            (item) => item.treatmentId !== treatmentId
          ),
        };
      }
      return {
        ...prev,
        selectedTreatments: [
          ...prev.selectedTreatments,
          { treatmentId, focus, duration },
        ],
      };
    });
  };

  const handleUpdateTreatmentVariant = (
    treatmentId: SpaTreatment['id'],
    focus: string,
    duration: string
  ) => {
    setBooking((prev) => ({
      ...prev,
      selectedTreatments: prev.selectedTreatments.map((item) =>
        item.treatmentId === treatmentId
          ? { ...item, focus, duration }
          : item
      ),
    }));
  };

  const handleTogglePriceItem = (priceId: string) => {
    setBooking((prev) => {
      const exists = prev.selectedPriceIds.includes(priceId);
      return {
        ...prev,
        selectedPriceIds: exists
          ? prev.selectedPriceIds.filter((id) => id !== priceId)
          : [...prev.selectedPriceIds, priceId],
      };
    });
  };

  return (
    <div className="min-h-screen bg-[#FFF7FA] text-[#421C2D]">
      <Navbar />

      <main>
        <HeroSection
          selectedCount={totalSelectedCount}
          onQuickSelectTreatment={ensureTreatmentSelectedAndScroll}
        />

        <TreatmentsSection
          selectedTreatments={booking.selectedTreatments}
          selectedPriceIds={booking.selectedPriceIds}
          onToggleTreatment={handleToggleTreatment}
          onUpdateTreatmentVariant={handleUpdateTreatmentVariant}
          onTogglePriceItem={handleTogglePriceItem}
        />

        <BookingSection booking={booking} onChangeBooking={setBooking} />

        <AiTherapistSection
          selectedTreatmentIds={booking.selectedTreatments.map((s) => s.treatmentId)}
          onAddTreatmentFromAi={ensureTreatmentSelectedAndScroll}
        />

        <CredentialsSection />
      </main>

      <Footer />
      <BottomDockNav selectedCount={totalSelectedCount} />
    </div>
  );
}
