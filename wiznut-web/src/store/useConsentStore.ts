import {create} from 'zustand';

interface ConsentStore {
  consentGiven: boolean | null;
  setConsent: (consent: boolean) => void;
}

const useConsentStore = create<ConsentStore>((set) => ({
  consentGiven: null,
  setConsent: (consent: boolean) => set({consentGiven: consent})
}));

export default useConsentStore;
