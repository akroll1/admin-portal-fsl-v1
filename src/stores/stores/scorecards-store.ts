import { StateCreator } from "zustand"
import axios from 'axios'
import { BlogPost } from '../models/blog-post.model'
import { Discussion } from '../models/discussion.model'
import { 
    Scorecard, 
    ScorecardSummary
} from "../models/scorecard.model"
import { 
    Fight, 
    FightResolution,
    FightSummary, 
    FightUpdateOptions
} from '../models/fight.model' 
import { Fighter, FighterScores } from '../models/fighter.model'
import { AcceptInviteOptions } from '../models/invite.model'
import { List } from '../models/lists.model'
import { Panelist, PanelSummary } from "../models/panel.model"
import { Review, ReviewPut } from '../models/review.model'
import { Season, SeasonSummary } from '../models/season.model'
import { Show } from "../models/show.model"
import { User } from '../models/user.model'
import { GlobalStoreState } from "./global-store"
import { configureAccessToken, configureIDToken } from "./auth-store"

export interface ScorecardStoreState {
    acceptInvite(groupScorecardId: string, inviteId: string): void
    blogPosts: BlogPost[]
    deleteInvite(inviteId: string): void
    discussion: Discussion
    discussions: Discussion[]
    fetchAllDiscussions(): void
    fetchAllPanelists(): void
    fetchBlogPost(blogPostId: string): void
    fetchBlogPosts(): void
    fetchDiscussion(discussionId: string): void
    fetchFighter(fighterId: string): void
    fetchFightSummary(fightId: string): void
    fetchList(listType: string): void
    fetchPanel(panelId: string): void
    fetchPanelist(panelistId: string): void
    fetchPanelSummaries(): void
    // fetchSeasonSummaries(): void
    fetchSeasons(): void
    fetchSelectedFightReviews(fightId: string): void;
    fetchShow(showId: string): void
    fetchUserInvites(): void
    fetchUserScorecards(): void
    fetchUserScorecardsBySeason(seasonId: string): void
    fight: Fight
    fighters: Fighter[]
    fighterScores: FighterScores
    panelist: Panelist
    panelists: Panelist[]
    panelSummaries: PanelSummary[]
    patchPrediction(prediction: string): void
    poundListOfficial: List
    poundListUser: List
    putUserFightReview(reviewObj: ReviewPut): void
    seasons: Season[]
    seasonSummaries: SeasonSummary[]
    seasonsOptions: Record<string, string>[]
    selectedBlogPost: BlogPost
    selectedFighter: Fighter
    selectedFightReview: Review
    selectedFightReviews: Review[]
    setFighterScores(): void
    setSeasonsOptions(): void
    stats: any[]
    submitFightResolution(resolutionObj: FightResolution): void
    submitList(list: List): void
    updateDiscussion(discussionObj: Partial<Discussion>): void
    updateFight(fightUpdateOptions: FightUpdateOptions): void
    updateFighter(updateFighterObj: Partial<Fighter>): void
    updatePanelist(updateObj: Partial<Panelist>): void
    updateSeason(updateObj: Partial<Season>): void
    updateShow(update: any): void
    updateUser(updateOptions: Partial<User>): void
    userInvites: string[]
    userScorecardSummary: ScorecardSummary
    userScorecards: Scorecard[]
    userScorecardSummaries: ScorecardSummary[]
    // addMemberToActiveScorecard(email: string): void
}

export const initialScorecardsStoreState = {
    blogPosts: [],
    discussion: {} as Discussion,
    discussions: [],
    fight: {} as Fight,
    fighters: [],
    fighterScores: {} as FighterScores,
    panelist: {} as Panelist,
    panelists: [],
    panelSummaries: [],
    poundListOfficial: {} as List,
    poundListUser: {} as List,
    prediction: null,
    seasons: [] as Season[],
    seasonsOptions: [],
    seasonSummaries: [] as SeasonSummary[],
    selectedBlogPost: {} as BlogPost,
    selectedFighter: {} as Fighter,
    selectedFightReviews: [],
    selectedFightReview: {} as Review,
    selectedSeason: {} as Season,
    stats: [],
    userInvites: [],
    userScorecardSummary: {} as ScorecardSummary,
    userScorecards: [],
    userScorecardSummaries: [],
}

const url = process.env.REACT_APP_API;

export const scorecardStoreSlice: StateCreator<GlobalStoreState, [], [], ScorecardStoreState> = (set, get) => ({
    ...initialScorecardsStoreState,
    acceptInvite: async (groupScorecardId: string, inviteId: string) => {
        const acceptInviteObj: AcceptInviteOptions = {
            groupScorecardId,
            inviteId,
            sub: '',
            username: ''
            // sub: authStoreSlice.user.sub!,
            // username: authStoreSlice.user.username!,

        }
        const res = await axios.post(`${url}/me`, acceptInviteObj,     )
        const data = res.data
        console.log('ACCEPT_INVITE data: ', data)
        get().fetchUserScorecards()
        get().fetchUserInvites()
    },
    
    deleteInvite: async (invitedId: string) => {
        const res = await axios.delete(`${url}/me/${invitedId}`,await configureAccessToken() )
        const data = res.data;
        console.log('DELETE_INVITE data: ', data)
        get().fetchUserScorecards();
    },
    fetchAllDiscussions: async () => {
        const res = await axios.get(`${url}/discussions`,await configureAccessToken() )
        const discussions = res.data as Discussion[]
        set({ discussions })
    },
    fetchAllPanelists: async () => {
        const res = await axios.get(`${url}/panelists`, await configureAccessToken() )
        const panelists = res.data as Panelist[]
        set({ panelists })
    },
    fetchBlogPost: async (blogPostId: string) => {
        const res = await axios.get(`${url}/blog/${blogPostId}`)
        const selectedBlogPost = res.data as BlogPost
        set({ selectedBlogPost })
    },
    fetchBlogPosts: async () => {
        const res = await axios.get(`${url}/blog`)
        const blogPosts = res.data as BlogPost[]
        set({ blogPosts })
    },
    fetchDiscussion: async (discussionId: string) => {
        const res = await axios.get(`${url}/discussions/${discussionId}`, await configureAccessToken() )
        const discussion = res.data as Discussion
        set({ discussion })
    },
    fetchFighter: async (fighterId: string) => {
        const res = await axios.get(`${url}/fighters/${fighterId}`, await configureAccessToken() )
        const selectedFighter = res.data as Fighter
        set({ selectedFighter })
    },
    fetchFightSummary: async (fightId: string) => {
        const res = await axios.get(`${url}/fights/${fightId}/summary`, await configureAccessToken() )
        const selectedFightSummary = res.data as FightSummary
        set({ selectedFightSummary })
    },
    
    fetchList: async (listType: string) => {
        const res = await axios.get(`${url}/lists/${get().user.attributes.sub}/${listType}`, await configureAccessToken() );
        const data = res.data as any;
        if(listType === "pound"){
            set({ 
                poundListUser: data.userPoundList, 
                poundListOfficial: data.officialPoundList 
            })
        }
    },
    fetchOfficialList: async () => {
        const res = axios.get(`${url}/lists/`)
    },
    fetchPanel: async (panelId: string) => {
        const res = await axios.get(`${url}/${panelId}`, await configureAccessToken() )
        console.log('res: ', res)
    },
    fetchPanelist: async (panelistId: string) => {
        const res = await axios.get(`${url}/panelists/${panelistId}`, await configureAccessToken() );
        const panelist = res.data as Panelist
        set({ panelist })
    },
    
    fetchPanelSummaries: async () => {
        const res = await axios.get(`${url}/panels`, await configureAccessToken() )
        const panelSummaries = res.data as PanelSummary[]
        set({ panelSummaries })
    },
    // fetchSeasonSummaries: async () => {
    //     const res = await axios.get(`${url}/seasons`)
    //     const seasonSummaries = res.data as SeasonSummary[]
    //     // const filtered: FightSummary[] = filterFights(seasonSummaries[0].fightSummaries)
    //     set({ 
    //         seasonSummaries, 
    //         selectedSeasonSummary: seasonSummaries[0],
    //         selectedSeasonFightSummaries: filtered,
    //         selectedFightSummary: seasonSummaries[0].fightSummaries[0]
    //     })d
    //     get().setSeasonsOptions()
    // },
   
    fetchSeasons: async () => {
        const res = await axios.get(`${url}/seasons`,await configureAccessToken() )
        const seasons = res.data as Season[]
        set({ seasons })
    },
    fetchSelectedFightReviews: async (fightId: string) => {
        const res = await axios.get(`${url}/reviews/${fightId}/fight`,await configureAccessToken() );
        const selectedFightReviews = res.data as Review[];
        set({ selectedFightReviews })
    }, 
    fetchShow: async (showId: string) => {
        const res = await axios.get(`${url}/shows/${showId}`,await configureAccessToken() )
        const show = res.data as Show
        set({ show })
    },
    
    fetchUserScorecards: async () => {

        const res = await axios.get(`${url}/me/scorecards/${get().user.attributes.sub}`, await configureAccessToken() )
        if(res.data === 'Token expired!'){
            get().setModals('expiredTokenModal', true)
            return
        }
        const userScorecardSummaries = res.data as ScorecardSummary[]
        const userScorecards: any[] = await userScorecardSummaries.map( (scorecard: any) => scorecard.scorecardId)
        set({ 
            userScorecards,
            userScorecardSummaries,
        })
    },
    fetchUserScorecardsBySeason: async (seasonId: string) => {
        const res = await axios.get(`${url}/me/${encodeURIComponent(get().user.attributes.sub!)}/${seasonId}`, await configureAccessToken() )
        const userScorecards = res.data as Scorecard[]
        set({ userScorecards })
    },
    fetchUserInvites: async () => {
        const res = await axios.get(`${url}/me/invites`, await configureIDToken() )
        if(res.data === 'Token expired!'){
            get().setModals('expiredTokenModal', true)
            return
        }
        const userInvites = res.data;
        set({ userInvites })
    },
    patchPrediction: async (prediction: string | null) => {
        const res = await axios.patch(`${url}/scorecards/${get().userScorecard.scorecardId}`, { prediction }, await configureAccessToken() )
        if(res.status === 200){
            get().setScoringTransformedPrediction(prediction)
            // refresh on 200
            // get().fetchGroupScorecardSummary(get().activeGroupScorecard.groupScorecardId)
        }
    },
    putUserFightReview: async (reviewObj: ReviewPut) => {
        const res = await axios.put(`${url}/reviews`, reviewObj, );
        if(res.status === 200) {
            get().fetchSelectedFightReviews(reviewObj.fightId);
            return true;
        }
    },
    setChatToken: (chatToken: string) => {
        set({ chatToken })
    },
    setFighterScores: () => {
        const scores = get().activeGroupScorecard.fighters.map( (fighter: Fighter) => {
            return ({
                [fighter.fighterId]: 10
            })
        })
        const round = get().userScorecard.scores.length;
        const scorecardId = get().userScorecard.scorecardId;
        set({ fighterScores: { round, scorecardId, scores } });

    },
    
    
    setSeasonsOptions: () => {
        const seasonSummaries = get().seasonSummaries;
        if(seasonSummaries.length){
            const seasonsOptions = seasonSummaries.map( (seasonSummary: SeasonSummary) => {
                return ({
                    value: seasonSummary.season.seasonId,
                    label: seasonSummary.season.seasonName
                })
            })
            set({ seasonsOptions })
        }
    },
    setSelectedFightReview: (reviewId: string) => {
        const [selected] = get().selectedFightReviews.filter( (review: Review) => review.reviewId === reviewId);
        set({ selectedFightReview: selected });
    },
   
    submitFightResolution: async (resolutionObj: FightResolution) => {
        const res = await axios.put(`${url}/resolutions/${resolutionObj.fightId}`, resolutionObj, await configureAccessToken() )
        const data = res.data
        console.log('RESOLUTION put res: ', data)
    },
    submitList: async (list: List) => {
        const res = await axios.put(`${url}/lists/${get().user.attributes.sub}/${list.listType}`, list, await configureAccessToken() )
        console.log('res.data: ', res.data)
    },
    submitPanelPredictions: async (predictionObj: Record<string, string[]>) => {
        Object.assign(predictionObj, { panelistId: get().user.attributes.sub })
        const res = await axios.put(`${url}/panels`, predictionObj, )
        const data = res.data
        console.log('DATA: ', data)
    },
    
    updateDiscussion: async (updateObj: Partial<Discussion>) => {
        const res = await axios.put(`${url}/discussions/${updateObj.discussionId}`, updateObj, await configureAccessToken() )
        console.log('DISCUSSION- update res.data: ', res.data)
    },
    updateFight: async (fightUpdateOptions: FightUpdateOptions) => {
        const res = await axios.put(`${url}/fights/${fightUpdateOptions.fightId}`, fightUpdateOptions, await configureAccessToken() )
        console.log('res.data: ', res.data)
    },
    updateFighter: async (updateFighterObj: Partial<Fighter>) => {
        const res = await axios.put(`${url}/fighters/${updateFighterObj.fighterId}`, updateFighterObj, await configureAccessToken() )
        console.log('FIGHTER- update res.data: ', res.data)
    },
    updatePanelist: async (updateObj: Partial<Panelist>) => {
        const res = await axios.put(`${url}/panelists/${updateObj.panelistId}`, updateObj, await configureAccessToken() )
        console.log('PANELIST- update, res.data: ', res.data)
    },
    updateSeason: async (updateObj: Partial<Season>) => {
        const res = await axios.put(`${url}/seasons/${updateObj.seasonId}`, updateObj, await configureAccessToken() )
        get().fetchSeasons()
    },
    updateShow: async (update: any) => {
        const res = await axios.put(`${url}/shows/${update.showId}`, update, await configureAccessToken() )
        console.log('res.data: ', res.data)
    },
    updateUser: async (updateOptions: Partial<User>) => {
        const res = await axios.put(`${url}/users/${get().user.attributes.sub}`, updateOptions, await configureAccessToken() )
        console.log('UPDATE USER res: ', res)
    },  
})