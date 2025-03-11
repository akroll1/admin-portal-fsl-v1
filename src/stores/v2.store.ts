import { StateCreator } from "zustand";
import { GlobalStoreState } from "./global.store";
import axios from 'axios'
import { Fight } from "../v2/models/interfaces.v2";
import { UpdateFightOptions } from "../v2/models";

export interface V2StoreState {
    deleteFight(id: string): void
    fetchFightById(id: string): void
    updateFight(options: UpdateFightOptions): void
    fight: Fight
}

export const initialV2StoreState = {
    fight: {} as Fight,
} as V2StoreState

const V2_API = process.env.REACT_APP_V2_API

export const v2StoreSlice: StateCreator<GlobalStoreState, [], [], V2StoreState> = (set, get) => ({
    ...initialV2StoreState,
    deleteFight: async (id: string) => {
        const res = await get().axiosServiceCall(`${V2_API}/fights/${id}`, 'delete')

        if (res?.status === 204) {
            set({ fight: {} as Fight })
            console.log('Fight deleted!')
        }
    },
    fetchFightById: async (id: string) => {
        const res = await get().axiosServiceCall(`${V2_API}/fights/${id}`, 'get')
        const fight = res?.data as Fight
        console.log('FIGHT: ', fight)    
        set({ fight })
    },
    updateFight: async (options: UpdateFightOptions) => {
        const res = await get().axiosServiceCall(`${V2_API}/fights`, 'put', options)
        console.log('UPDATE_FIGHT, res: ', res?.data)
        const fight = res?.data as Fight
        set({ fight })
    }
})