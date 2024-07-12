import { create } from "zustand";

type TStateFaraday = {
  frecuency: number;
  field: number;
};

type TActionsFaraday = {
  updateData: (
    property: "frecuency" | "field",
    step: boolean,

    range: [number, number]
  ) => void;
};

export const useFaraday = create<TStateFaraday & TActionsFaraday>((set) => ({
  frecuency: 0,
  field: 0,
  updateData: (
    property: "frecuency" | "field",
    step: boolean,
    range: [number, number]
  ) => {
    set(state => {
        if (step && state[property] <= range[0])
            return ({ ...state, [property]: state[property] + 1})
        else if (state[property] > range[1])
            return ({ ...state, [property]: state[property] - 1})
        return (state)
    })
  },
}));
