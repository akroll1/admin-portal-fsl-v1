export enum ChatMessageEnum {
  CALLING_IT = "CALLING_IT",
  FSL = "FSL",
  GROUP = "GROUP",
  FIGHT = "FIGHT",
  ROUND_SCORE = "ROUND_SCORE",
}

export enum ChatEnums {
  CORNER = "CORNER",
  SHOW = "SHOW"
}

export enum CookieSelectionEnum {
  ACCEPTED = "ACCEPTED",
  DECLINED = "DECLINED"
}

export enum DistanceType {
  FIGHT = "FIGHT",
  SHOW = "SHOW",
  SEASON = "SEASON",
}

export enum FightPropsEnum {
  MONEYLINE = "MONEYLINE",
    OU = "OU"
}

export enum ModalsEnum {
  ADD_MEMBER_MODAL =  "ADD_MEMBER_MODAL",
  CREATE_GROUP_MODAL = "CREATE_GROUP_MODAL",
  EXPIRED_TOKEN_MODAL =  "EXPIRED_TOKEN_MODAL",
  FIGHT_REVIEW_FORM_MODAL =  "FIGHT_REVIEW_FORM_MODAL",
  GUEST_JUDGE_MODAL =  "GUEST_JUDGE_MODAL",
  MONEYLINE_MODAL =  "MONEYLINE_MODAL",
  PREDICTION_MODAL =  "PREDICTION_MODAL",
}

export enum NetworkEnum {
  ESPN = 'ESPN',
  ESPNPLUS = 'ESPN+',
  HBO = 'HBO',
  HBOPPV = 'HBOPPV',
  DAZN = 'DAZN',
  SHOWTIME = 'SHOWTIME',
  SHOWTIMEPPV = 'SHOWTIMEPPV',
  FIGHTSYNC = 'FIGHTSYNC',
  FIGHTTV = 'FIGHTTV',
  NONE = 'NONE'
}

export enum ScoringNavGroupEnum {
  ANALYTICS = "ANALYTICS",
  BRACKETS = "BRACKETS",
  CHAT = "CHAT",
  FIGHT = "FIGHT",
  MONEYLINE = "MONEYLINE",
  PANELISTS = "PANELISTS",
  PROPS = "PROPS",
  ROUNDPROP = "ROUNDPROP",
}

export enum Status {
  ACTIVE = "ACTIVE",
  CANCELED = "CANCELED",
  COMPLETE = "COMPLETE",
  FANTASY = "FANTASY",
  HISTORICAL = "HISTORICAL",
  PENDING = "PENDING",
  TESTING = "TESTING",
}

export enum TabsEnum {
  INFO = "INFO",
  SCORING = "SCORING",
  ANALYTICS = "ANALYTICS",
  BRACKET = "BRACKET",
  FOLLOWING = "FOLLOWING",
  ALL = "ALL",
}

export enum WeightclassEnum {
  HEAVYWEIGHT = 'HEAVYWEIGHT',
  CRUISERWEIGHT = 'CRUISERWEIGHT',
  LIGHTHEAVYWEIGHT = 'LIGHTHEAVYWEIGHT',
  SUPERMIDDLEWEIGHT = 'SUPERMIDDLEWEIGHT',
  MIDDLEWEIGHT = 'MIDDLEWEIGHT',
  SUPERWELTERWEIGHT = 'SUPERWELTERWEIGHT',
  WELTERWEIGHT = 'WELTERWEIGHT',
  SUPERLIGHTWEIGHT = 'SUPERLIGHTWEIGHT',
  LIGHTWEIGHT = 'LIGHTWEIGHT',
  SUPERFEATHERWEIGHT = 'SUPERFEATHERWEIGHT',
  FEATHERWEIGHT = 'FEATHERWEIGHT',
  SUPERBANTAMWEIGHT = 'SUPERBANTAMWEIGHT',
  BANTAMWEIGHT = 'BANTAMWEIGHT',
  SUPERFLYWEIGHT = 'SUPERFLYWEIGHT',
  FLYWEIGHT = 'FLYWEIGHT',
  JRFLYWEIGHT = 'JRFLYWEIGHT'
}

export enum ReviewType {
  FANTASY = 'FANTASY',
  HISTORICAL = 'HISTORICAL',
  PREDICTION = 'PREDICTION',
  REVIEW = 'REVIEW',
}

export const ROUND_LENGTH_ENUMS = [3,4,6,8,10,12,15];

export enum Networks {
  BLKPRIME = 'BLKPRIME', 
  DAZN = 'DAZN',
  ESPN = 'ESPN',
  FIGHTSYNC = 'FIGHTSYNC',
  ESPNP = 'ESPNP',
  FITETV = 'FITETV',
  FIGHTTV = 'FIGHTTV',
  FOXSPORTS = 'FOXSPORTS',
  HBO = 'HBO',
  HBOPPV = 'HBOPPV',
  SHOWTIME = 'SHOWTIME',
  SHOWTIMEPPV = 'SHOWTIMEPPV',
  NONE = 'NONE',
}

export enum OfficialResults {
  DECISION = 'DECISION',
  DRAW = 'DRAW', 
  UD = 'UD',
  MD = 'MD',
  MDD = 'MDD',
  SD = 'SD', 
  SDD = 'SDD',
  DQ = 'DQ',
  KO1 = 'KO1', 
  KO2 = 'KO2', 
  KO3 = 'KO3', 
  KO4 = 'KO4', 
  KO5 = 'KO5', 
  KO6 = 'KO6', 
  KO7 = 'KO7', 
  KO8 = 'KO8', 
  KO9 = 'KO9', 
  KO10 = 'KO10', 
  KO11 = 'KO11', 
  KO12 = 'KO12', 
  KO13 = 'KO13', 
  KO14 = 'KO14', 
  KO15 = 'KO15', 
}

export enum OfficialResultsPredictionKOs {
  KO1 = 'KO1', 
  KO2 = 'KO2', 
  KO3 = 'KO3', 
  KO4 = 'KO4', 
  KO5 = 'KO5', 
  KO6 = 'KO6', 
  KO7 = 'KO7', 
  KO8 = 'KO8', 
  KO9 = 'KO9', 
  KO10 = 'KO10', 
  KO11 = 'KO11', 
  KO12 = 'KO12', 
}

export enum OfficialResultsPredictionDecisions {
  ROUNDS_12_0 = "ROUNDS_12_0",
  ROUNDS_11_1 = "ROUNDS_11_1",
  ROUNDS_10_2 = "ROUNDS_10_2",
  ROUNDS_9_3 = "ROUNDS_9_3",
  ROUNDS_8_4 = "ROUNDS_8_4",
  ROUNDS_7_5 = "ROUNDS_7_5",
}

export const PANELIST_PREDICTIONS_OPTIONS = [
  { value: 'DC', label: 'UD' },
  { value: 'SD', label: 'SD' },
  { value: 'KO13' , label: 'KO 1-3' },
  { value: 'KO46' , label: 'KO 4-6' },
  { value: 'KO79' , label: 'KO 7-9' },
  { value: 'KO10' , label: 'KO 10-12' }
]