import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useSettingsStore = create(
  persist(
    (set) => ({
      currency: '₹',
      theme: 'light',

      setCurrency: (c) => set({ currency: c }),
      setTheme: (t) => set({ theme: t }),
    }),
    {
      name: 'settings-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useSettingsStore;