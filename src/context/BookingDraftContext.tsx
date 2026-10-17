import { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

export type BookingDraft = {
  doctorId: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  reason: string;
};

type BookingDraftContextValue = {
  draft: BookingDraft | null;
  setDraft: (draft: BookingDraft) => void;
  clearDraft: () => void;
};

const BookingDraftContext = createContext<BookingDraftContextValue | null>(null);

export function BookingDraftProvider({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<BookingDraft | null>(null);

  return (
    <BookingDraftContext.Provider
      value={{
        draft,
        setDraft,
        clearDraft: () => setDraft(null),
      }}
    >
      {children}
    </BookingDraftContext.Provider>
  );
}

export function useBookingDraft() {
  const context = useContext(BookingDraftContext);
  if (!context) {
    throw new Error('useBookingDraft must be used inside BookingDraftProvider.');
  }

  return context;
}
