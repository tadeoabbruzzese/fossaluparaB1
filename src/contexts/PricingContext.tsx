import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PricingContextType {
  selectedPricing: string | null;
  setSelectedPricing: (id: string | null) => void;
}

const PricingContext = createContext<PricingContextType | undefined>(undefined);

export const PricingProvider = ({ children }: { children: ReactNode }) => {
  const [selectedPricing, setSelectedPricing] = useState<string | null>(null);

  return (
    <PricingContext.Provider value={{ selectedPricing, setSelectedPricing }}>
      {children}
    </PricingContext.Provider>
  );
};

export const usePricing = () => {
  const context = useContext(PricingContext);
  if (context === undefined) {
    throw new Error('usePricing must be used within a PricingProvider');
  }
  return context;
};