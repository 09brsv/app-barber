import { TBarber } from "@mb/@types/barber"
import { create } from "zustand"

type TStateBarbers = {
  barbers: TBarber[]
  barbersFiltered: TBarber[]
  setBarbers: (barbers: TBarber[]) => void
  removeBarber: (id: number) => void
  addBarber: (barber: TBarber) => void
  getBarber: (id: number) => TBarber | undefined
  updateBarber: (id: number, data: TBarber) => void
  setBarberFilter: (filter: string) => void
  resetBarberFilter: () => void
}

export const useBarberStore = create<TStateBarbers>((set, get) => ({
  barbers: [],
  barbersFiltered: [],
  setBarbers: (barbers) => set({ barbers }),
  removeBarber: (id) => set((state) => ({ barbers: state.barbers.filter((barber) => barber.id !== id) })),
  addBarber: (barber) => set((state) => ({ barbers: [...state.barbers, barber] })),
  getBarber: (id) => get().barbers.find((barber) => barber.id === id),
  updateBarber: (id, data) => set((state) => {
    const barbers = state.barbers
    const barberIdx = state.barbers.findIndex((barber) => barber.id === id)
    if (barberIdx !== -1) {
      barbers[barberIdx] = data
    }
    return { barbers }
  }),
  setBarberFilter: (filter) => set({ barbersFiltered: get().barbers.filter((barber) => barber.name.toLowerCase().includes(filter.toLowerCase())) }),
  resetBarberFilter: () => set({ barbersFiltered: get().barbers })
}))