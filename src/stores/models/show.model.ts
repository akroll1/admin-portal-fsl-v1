import { Network, ShowStatus } from "./enums";

export interface Show {
	showId: string
	fightIds: string[]
	location: string
	network: Network 
	promoter: string
	showStoryline: string
	showTime: number
	showName: string
	showStatus: ShowStatus
	isFeatured: boolean
	createdAt?: number
	updatedAt?: number
}

export interface ShowCreate {
	showName: string
    fightIds: string[]
    location: string
    network: string
    promoter: string
    showStoryline: string
    showTime: number
}