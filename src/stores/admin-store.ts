import { StateCreator } from "zustand";
import { GlobalStoreState } from "./global.store";
import { 
    Distance,
    Fighter,
    FightProps,
    DistanceSummary,
    DistanceMetas,
    ResolveFightDistance,
    modalsReset,
} from './index'

export interface AdminStoreState {
    deleteDistance(distanceId: string): void
    deleteFighter(fighterId: string): void
    fetchDistanceById(distanceId: string): void
    fetchDistanceMetas(id: string): void
    fetchFighterById(id: string): void
    fetchFightProps(id: string): void
    fetchFightSummary(id: string): void
    setIsSubmitting(isSubmitting: boolean): void
    setModals(modal: any, modalState: boolean, data?: Record<string, string | boolean> | null ): void
    submitFightResolution(resolutionObj: any): void
    updateDistance(distanceObj: Partial<Distance>): void
    updateDistanceMetas(dmObj: Partial<DistanceMetas>): void
    updateFighter(update: Partial<Fighter>): void
    updateFightProps(obj: Partial<FightProps>): void
    updateFightResolution(options: ResolveFightDistance): void
    distancesByStatusSummaries: any[]
    distanceMetas: DistanceMetas
    isSubmitting: boolean   
    modals: any
    modalState: Record<string, string | boolean> | null
    selectedDistance: Distance
    selectedFighter: Fighter
    selectedFightProps: FightProps | null
    selectedFightSummary: DistanceSummary
}

export const initialAdminStoreState = {
    distancesByStatusSummaries: [],
    distanceMetas: {} as DistanceMetas,
    isSubmitting: false,
    modals: {},
    modalState: null,
    selectedDistance: {} as Distance,
    selectedFighter: {} as Fighter,
    selectedFightProps: {} as FightProps,
    selectedFightSummary: {} as DistanceSummary,
}

const ADMIN_API = process.env.REACT_APP_ADMIN_API;

export const adminStoreSlice: StateCreator<GlobalStoreState, [], [], AdminStoreState> = (set, get) => ({
    ...initialAdminStoreState,
    deleteDistance: async (distanceId: string) => {
        const res = await get().axiosServiceCall(`${ADMIN_API}/distances/${distanceId}`, 'delete')
        console.log('DELETE_DISTANCE, RES: ', res)
    },
    deleteFighter: async (fighterId: string) => {
        // get().setIsSubmitting(true)
        const res = await get().axiosServiceCall(`${ADMIN_API}/fighters/${fighterId}`, 'delete' )
        console.log('FIGHTER- delete res.data: ', res?.data)
        // get().setIsSubmitting(false)
    },
    fetchDistanceById: async (distanceId: string) => {
        // const url = `${ADMIN_API}/distances/${distanceId}`
        const res = await get().axiosServiceCall(`${ADMIN_API}/distances/${distanceId}`, 'get');
        const selectedDistance = res?.data as Distance;
        set({ selectedDistance })
    },
    fetchDistanceMetas: async (id: string) => {
        const res = await get().axiosServiceCall(`${ADMIN_API}/distance-metas/${id}`, 'get')
        const distanceMetas = res?.data as DistanceMetas
        set({ distanceMetas })
    },
    fetchFighterById: async (id: string) => {
        const res = await get().axiosServiceCall(`${ADMIN_API}/fighters/${id}`, 'get' )
        const selectedFighter = res?.data as Fighter
        set({ selectedFighter })
    },
    fetchFightProps: async (id: string) => {
        const res = await get().axiosServiceCall(`${ADMIN_API}/props/${id}`, 'get' )
        const selectedFightProps = res?.data as FightProps
        set({ selectedFightProps })
    },
    fetchFightSummary: async (id: string) => {
        const res = await get().axiosServiceCall(`${ADMIN_API}/summaries/${id}`, 'get' )
        const selectedFightSummary = res?.data as DistanceSummary
        set({ selectedFightSummary })
    },
    setIsSubmitting: (isSubmitting: boolean) => {
        set({ isSubmitting })
    },
    setModals: (modal: any, modalState: boolean, data?: Record<string, string | boolean> | null) => {
        set({
            modals: { ...modalsReset, [modal]: modalState }, 
            modalState: data || {}
        })   
    },
    submitFightResolution: async (resolutionObj: any) => {
        get().setIsSubmitting(true)
        const res = await get().axiosServiceCall(`${ADMIN_API}/resolutions/${resolutionObj.id}`, resolutionObj, 'put' )
        const data = res?.data
        console.log('RESOLUTION put res: ', data)
        get().setIsSubmitting(false)
    },
    updateDistance: async (distanceObj: Partial<Distance>) => {
        // get().setIsSubmitting(true)
        const res = await get().axiosServiceCall(`${ADMIN_API}/distances`, 'put', distanceObj );
        const selectedDistance = res?.data as Distance;
        set({ 
            selectedDistance,
            isSubmitting: false,
        })
    },
    updateDistanceMetas: async (dmObj: Partial<DistanceMetas>) => {
        const res = await get().axiosServiceCall(`${ADMIN_API}/distance-metas`, 'put', dmObj )
        console.log('UPDATE_DISTANCE_METAS: ', res?.data)
    },
    updateFighter: async (fighterObj: Partial<Fighter>) => {
        get().setIsSubmitting(true)
        const res = await get().axiosServiceCall(`${ADMIN_API}/fighters`, 'put', fighterObj )
        console.log('FIGHTER- update res.data: ', res?.data);
        get().setIsSubmitting(false)
    },
    updateFightProps: async (obj: Partial<FightProps>) => {
        // get().setIsSubmitting(true)
        const res = await get().axiosServiceCall(`${ADMIN_API}/props`, 'put', obj )
        console.log('UPDATE_FIGHT_PROPS, res: ', res?.data)
        // get().setIsSubmitting(false)
    },
    updateFightResolution: async (options: ResolveFightDistance) => {
        console.log('options: ', options)
        const res = await get().axiosServiceCall(`${ADMIN_API}/resolutions`, 'put', options )
        console.log('RESOLUTION put res: ', res?.data)
    }
})
