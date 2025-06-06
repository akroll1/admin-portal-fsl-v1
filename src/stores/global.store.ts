import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { adminStoreSlice, AdminStoreState } from "./admin-store"
import { authStoreSlice, AuthStoreState } from "./auth-store"
import { dashboardStoreSlice, DashboardsStoreState } from "./dashboards-store"
import { v2StoreSlice, V2StoreState } from "./v2.store"

export type GlobalStoreState = 
    & AuthStoreState 
    & AdminStoreState
    & DashboardsStoreState
    & V2StoreState

export const useGlobalStore = create<GlobalStoreState>()(
    persist(
        (set, get, api) => ({
            ...adminStoreSlice(set, get, api),
            ...authStoreSlice(set, get, api),
            ...dashboardStoreSlice(set, get, api),
            ...v2StoreSlice(set, get, api),
        }),
        // reset: () => set( state => initialScorecardsStoreState)
        {
            partialize: state => {
                const { 
                    user,
                } = state;

                return ({ 
                    user,
                })
            },
            storage: createJSONStorage(() => sessionStorage),
            name: 'fsl-admin',
            version: 4,
        }
    )
)
