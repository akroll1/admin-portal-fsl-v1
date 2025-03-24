import type { Networks, RoundNote, SeasonType, Status, WeightClass } from "./enums.v2";

export type AcceptCornerInvite = {
  id: string; // inviteId, used to delete invite.
  cornerId: string; // used to find Corner for update.
  displayName: string; // used for TeamMember info in Corner.
  sub: string;
};

export type DirtyRoundScoreUpdate = {
  scorecardId: string;
  f1: string;
  f2: string;
  round: number;
  f1Score: number;
  f2Score: number;
};

export type DistanceMetas = {
  description?: string | null;
  parent?: string | null;
  storyline?: string | null;
  subtitle?: string | null;
  title: string;
  typeIds: string[];
  starts: string;
  ends?: string | null;
  createdAt?: string;
  updatedAt?: string;
};

export type FightMetas = {
  isMainEvent: boolean;
  isTitleFight: boolean;
  officialResult: string | null;
  rounds: number;
  weightclass: WeightClass;
};

export type Manager = {
  id: string;
  chatKey: string | null;
  hidePredictions: boolean;
  notes?: string | null;
  stageKey: string | null;
};

export type Message = Record<string, string>;

export type Props = {
  id: string; // distanceId.
  moneyline?: Record<string, string>[] | null;
  overUnder?: Record<string, Record<string, string>> | null;
  createdAt?: string;
  updatedAt?: string;
};

export type RoundScore = {
  isDirty?: boolean;
  note?: RoundNote;
  round: number;
  scores: Record<string, number>[];
};

export type ScorecardFinal = {
  finalScore?: number;
  prediction?: string;
  analysis?: string;
  createdAt?: string;
};

export type ScorecardMetas = {
  callingIt?: number; // will be 0 if not set.
  displayName?: string;
  isPH?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type SeasonMetas = {
  type: SeasonType;
}

export type ShowMetas = {
  location: string | null;
  link?: string | null;
  network: Networks | null;
  promoter: string | null;
};

export type Syncs = {
  chatkey?: string | null;
  video?: boolean;
};

export type TeamMember = {
  displayName: string;
  email?: string;
  id: string;
  notes?: string | null;
};

export type UpdateFightOptions = {
  id?: string;
  status?: Status;
  // INSTANCE
  isMainEvent?: boolean;
  isTitleFight?: boolean;
  officialResult?: string | null;
  rounds?: number;
  weightclass?: WeightClass;
  // METAS
  description?: string | null;
  parent?: string | null;
  storyline?: string | null;
  subtitle?: string | null;
  title?: string;
  typeIds?: string[];
  starts?: string;
  ends?: string | null;
};


export type YouAreInvitedToCorner = {
  email: string;
  managerName: string;
  cornerName: string;
  seasonTitle: string;
};
