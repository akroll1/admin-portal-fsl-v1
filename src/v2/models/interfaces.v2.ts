import { FightProps } from "../../stores";
import type {
    AnalyticType,
    CornerType,
    FighterType,
    SeasonType,
    Status,
    UserPickType,
  } from "./enums.v2";
  import type {
    DistanceMetas,
    FightMetas,
    Manager,
    RoundScore,
    ScorecardFinal,
    ScorecardMetas,
    SeasonMetas,
    ShowMetas,
    TeamMember,
  } from "./types.v2";
  
  export interface Analytic {
    id: string; // distance ID.
    analytics: Record<string, number>[] | Record<string, number>;
    notes?: string | null;
    officialResult?: string | null;
    status?: Status;
    type: AnalyticType;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface Corner {
    id: string; // manager.sub + <active season distanceId>
    cornerName: string;
    manager: Manager;
    team: TeamMember[];
    type: CornerType;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface FightV2 {
    id: string;
    fighters: Fighter[];
    instance: FightMetas;
    metas: DistanceMetas;
    props?: FightProps | null;
    status: Status;
  }
  
  export interface Fighter {
    id: string;
    type: FighterType;
    firstName: string;
    home: string | null;
    lastName: string;
    profileImg?: string | null;
    ringname?: string | null;
    socials: string[] | null;
    wins: number;
    losses: number;
    draws: number;
    kos: number;
    dq: number;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface Invite {
    id: string;
    cornerId: string; // <sub+activeSeason.id>
    cornerName: string;
    email: string;
    requestor: TeamMember;
    createdAt?: string;
  }
  
  export interface Scorecard {
    id: string; // sub+fightId.
    final?: ScorecardFinal | null;
    metas: ScorecardMetas;
    scores?: RoundScore[];
  }
  
  export interface SeasonV2 {
    id: string;
    metas: DistanceMetas;
    shows: ShowV2[];
    status: Status;
    instance: SeasonMetas;
  }
  
  export interface ShowV2 {
    id: string;
    fights: FightV2[];
    instance: ShowMetas;
    metas: DistanceMetas;
    status: Status;
  }
  
  
  export interface SwingsChart {
    id: string; // fight.id
    notes?: string | null;
    roundScores: Record<string, number>[];
    total: number;
    createdAt?: string;
  }
  
  export interface User {
    sub: string;
    bio?: string | null;
    email: string;
    fightCoins?: number;
    firstName?: string | null;
    image?: string | null;
    isPublic?: boolean;
    lastName?: string | null;
    location?: string | null;
    tagline?: string | null;
    username?: string;
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface UserCorner {
    id: string; // sub+seasonId.
    cornerIds: string[]; // subs now.
    createdAt?: string;
    updatedAt?: string;
  }
  
  export interface UserPick {
    id: string; // sub + someID
    comment?: string | null;
    list?: string[];
    score?: number;
    selected?: string;
    type: UserPickType;
    createdAt?: string;
    updatedAt?: string;
  }
  