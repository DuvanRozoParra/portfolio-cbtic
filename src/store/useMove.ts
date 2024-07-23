import { create } from "zustand";

type TStateFaraday = {
  moveX: number;
};

type TActionsFaraday = {
  setX: (x: number) => void;
};

export const useMove = create<TStateFaraday & TActionsFaraday>((set) => ({
  moveX: 0,
  setX: (x: number) => {
    set((state) => ({ ...state, moveX: x }));
  },
}));
