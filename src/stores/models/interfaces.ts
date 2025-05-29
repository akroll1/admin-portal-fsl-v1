import type {
  AnalyticType,
  DistanceType,
  Networks,
  SeasonType,
  Status,
  UserPickType,
  WeightClass,
} from "./enums";
import type {
  Fight,
  Manager,
  RoundScore,
  ScorecardFinal,
  ScorecardMetas,
  Season,
  Show,
  TeamMember,
  UIMetas,
} from "./types";

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
  type: DistanceType;
  createdAt?: string;
  updatedAt?: string;
}

export interface Distance {
  id: string;
  instance: Season | Show | Fight;
  metas: UIMetas;
  status: Status;
  type: DistanceType;
}

export type DistanceMetasV2 = {
  description?: string | null;
  location?: string | null;
  parent?: string | null;
  storyline?: string | null;
  subtitle?: string | null;
  title: string;
  typeIds: string[];
  starts: string;
  ends?: string | null;
  createdAt: string;
  updatedAt?: string;
};

export interface DistanceSummary {
  id: string;
  distance: Distance;
  summary: DistanceSummary[] | Fighter[];
  type: DistanceType;
  createdAt?: string;
}

export interface FightV2 {
  id: string;
  fighters: Fighter[];
  isMainEvent: boolean;
  isTitleFight: boolean;
  metas: DistanceMetasV2;
  officialResult: string | null;
  rounds: number;
  status: Status;
  weightclass: WeightClass;
}


export interface Fighter {
  id: string;
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

export interface FightPropsV2 {
  id: string;
  moneyline?: Record<string, string>[] | null;
  overUnder?: Record<string, Record<string, string>> | null;
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

export interface Leaderboard {
  id: string;
  board: Record<string, string | number>[];
  type: DistanceType;
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
  metas: DistanceMetasV2;
  shows: ShowV2[];
  status: Status;
  type: SeasonType;
}

export interface ShowV2 {
  id: string;
  fights: FightV2[];
  location: string | null;
  metas: DistanceMetasV2;
  network: Networks | null;
  promoter: string | null;
  status: Status;
}

export interface SwingsChart {
  id: string; // fight.id
  notes?: string | null;
  roundScores: Record<string, number>[];
  total: number;
  createdAt?: string;
}

export interface UISummary {
  id: string;
  description: string | null;
  isMainEvent?: boolean;
  isTitleFight?: boolean;
  location?: string | null;
  network?: Networks | null;
  officialResult?: string | null;
  parent: string | null;
  promoter?: string | null;
  rounds?: number;
  seasonType?: SeasonType | null;
  starts: string;
  ends?: string | null;
  status: Status;
  storyline?: string | null;
  subtitle?: string | null;
  summary: UISummary[] | Fighter[];
  title: string;
  type: DistanceType;
  typeIds: string[] | null;
  weightclass?: WeightClass;
  createdAt: string;
  updatedAt?: string;
}

export interface User {
  sub?: string;
  accessToken?: string;
  idToken?: string;
  isAdmin?: boolean;
  isBetaA?: boolean;
  refreshToken?: string;
  bio?: string | null;
  email?: string;
  fightCoins?: number;
  firstName?: string | null;
  isPublic?: boolean;
  isLoggedIn?: boolean;
  lastName?: string | null;
  tagline?: string | null;
  username?: string;
  createdAt?: string;
  updatedAt?: string;
  subscribe?: boolean; // For weekly fights update newsletter, on Set User Name Modal.
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
