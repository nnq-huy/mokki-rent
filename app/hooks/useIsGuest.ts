import { create } from 'zustand';

interface IsGuestStore {
  isGuest: boolean;
  switchToHost: () => void;
  switchToGuest: () => void;
}

const useSearchModal = create<IsGuestStore>((set) => ({
  isGuest: true,
  switchToHost: () => set({ isGuest: false }),
  switchToGuest: () => set({ isGuest: true })
}));


export default useSearchModal;
