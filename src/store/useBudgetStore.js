import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useBudgetStore = create(
  persist(
    (set) => ({
      monthlyBudget: 0,
      categoryBudgets: {},

      setMonthlyBudget: (amount) => set({ monthlyBudget: amount }),

      setCategoryBudget: (category, amount) =>
        set((state) => ({
          categoryBudgets: { ...state.categoryBudgets, [category]: amount },
        })),
    }),
    {
      name: 'budget-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useBudgetStore;