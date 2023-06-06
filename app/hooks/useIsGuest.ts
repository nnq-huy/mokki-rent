import { create } from 'zustand';

interface IsGuestStore {
  isGuest: boolean;
  switchToHost: () => void;
  switchToGuest: () => void;
}

const isGuest = create<IsGuestStore>((set) => ({
  isGuest: true,
  switchToHost: () => set({ isGuest: false }),
  switchToGuest: () => set({ isGuest: true })
}));


export default isGuest;
