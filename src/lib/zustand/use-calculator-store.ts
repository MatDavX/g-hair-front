import type { CalculatorRequest } from '@/types/response';
import { create } from 'zustand';

interface CalculatorState {
  calculator_result: CalculatorRequest | null;
  setCalculator: (state: CalculatorRequest) => void;
}

export const useCalculatorStore = create<CalculatorState>(set => ({
  calculator_result: null,
  setCalculator: state => set(() => ({ calculator_result: state })),
}));
