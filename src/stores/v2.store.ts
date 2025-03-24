import { StateCreator } from "zustand";
import { GlobalStoreState } from "./global.store";
import { Fighter, FightV2, SeasonV2, ShowV2 } from "../v2/models/interfaces.v2";
import { UpdateFightOptions } from "../v2/models";
import { FightPropsV2, ResolveFightDistance } from "./models";

export interface V2StoreState {
    deleteFightV2(id: string): void
    deleteFighterV2(fighterId: string): void
    deleteSeasonV2(id: string): void
    deleteShowV2(id: string): void
    fetchFightByIdV2(id: string): void
    fetchFightPropsByIdV2(id: string): void
    fetchSeasonByIdV2(id: string): void
    fetchShowByIdV2(id: string): void
    updateFightV2(options: UpdateFightOptions): void
    updateFighterV2(fighterObj: Partial<Fighter>): void
    updateFightPropsV2(obj: Partial<FightPropsV2>): void
    updateFightResolutionV2(options: ResolveFightDistance): void
    updateSeasonV2(options: Partial<SeasonV2>): void
    updateShowV2(options: Partial<ShowV2>): void
    fight: FightV2
    props: FightPropsV2
    show: ShowV2
    season: SeasonV2
}

export const initialV2StoreState = {
    fight: {} as FightV2,
    props: {} as FightPropsV2,
    show: {} as ShowV2,
    season: {} as SeasonV2
} as V2StoreState

const V2_API = process.env.REACT_APP_V2_API

export const v2StoreSlice: StateCreator<GlobalStoreState, [], [], V2StoreState> = (set, get) => ({
    ...initialV2StoreState,
    // FIGHT, SHOW AND SEASON CRUD OPERATIONS.
    deleteFightV2: async (id: string) => {
        const res = await get().axiosServiceCall(`${V2_API}/fights/${id}`, 'delete')

        if (res?.status === 204) {
            set({ fight: {} as FightV2 })
            console.log('Fight deleted!')
        }
    },
    deleteSeasonV2: async (id: string) => {
        const res = await get().axiosServiceCall(`${V2_API}/seasons/${id}`, 'delete')

        if (res?.status === 204) {
            set({ season: {} as SeasonV2 })
            console.log('Season deleted!')
        }
    },
    deleteShowV2: async (id: string) => {
        const res = await get().axiosServiceCall(`${V2_API}/shows/${id}`, 'delete')

        if (res?.status === 204) {
            set({ show: {} as ShowV2 })
            console.log('Show deleted!')
        }
    },
    fetchFightByIdV2: async (id: string) => {
        const res = await get().axiosServiceCall(`${V2_API}/fights/${id}`, 'get')
        const fight = res?.data as FightV2
        console.log('FIGHT: ', fight)    
        set({ fight })
    },
    fetchFightPropsByIdV2: async (id: string) => {
        const res = await get().axiosServiceCall(`${V2_API}/props/${id}`, 'get')
        const props = res?.data as FightPropsV2
        console.log('props: ', props)    
        set({ props })
    },
    fetchShowByIdV2: async (id: string) => {
        const res = await get().axiosServiceCall(`${V2_API}/shows/${id}`, 'get')
        const show = res?.data as ShowV2
        console.log('SHOW: ', show)    
        set({ show })
    },
    fetchSeasonByIdV2: async (id: string) => {
        const res = await get().axiosServiceCall(`${V2_API}/seasons/${id}`, 'get')
        const season = res?.data as SeasonV2
        console.log('SEASON: ', season)    
        set({ season })
    },
    updateFightV2: async (options: Partial<FightV2>) => {
        const res = await get().axiosServiceCall(`${V2_API}/fights`, 'put', options)
        console.log('UPDATE_FIGHT, res: ', res?.data)
        const fight = res?.data as FightV2
        set({ fight })
    },
    updateFightPropsV2: async (obj: Partial<FightPropsV2>) => {
        const res = await get().axiosServiceCall(`${V2_API}/props`, 'put', obj)
        console.log('UPDATE_FIGHT_PROPS, res: ', res?.data)
    },
    updateShowV2: async (options: Partial<ShowV2>) => {
        const res = await get().axiosServiceCall(`${V2_API}/shows`, 'put', options)
        console.log('UPDATE_SHOW, res: ', res?.data)
        const show = res?.data as ShowV2
        set({ show })
    },
    updateSeasonV2: async (options: Partial<SeasonV2>) => {
        const res = await get().axiosServiceCall(`${V2_API}/seasons`, 'put', options)
        console.log('UPDATE_SEASON, res: ', res?.data)
        const season = res?.data as SeasonV2
        set({ season })
    },
    // FIGHTER CRUD OPERATIONS
    deleteFighterV2: async (fighterId: string) => {
        // get().setIsSubmitting(true)
        const res = await get().axiosServiceCall(`${V2_API}/fighters/${fighterId}`, 'delete' )
        console.log('FIGHTER- delete res.data: ', res?.data)
    },
     updateFighterV2: async (fighterObj: Partial<Fighter>) => {
        get().setIsSubmitting(true)
        const res = await get().axiosServiceCall(`${V2_API}/fighters`, 'put', fighterObj )
        console.log('FIGHTER- update res.data: ', res?.data);
        get().setIsSubmitting(false)
    },
    updateFightResolutionV2: async (options: ResolveFightDistance) => {
        const res = await get().axiosServiceCall(`${V2_API}/resolutions`, 'put', options)
        console.log('RESOLUTION put res: ', res?.data)
    }
})