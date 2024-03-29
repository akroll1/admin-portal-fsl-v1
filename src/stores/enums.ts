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

export enum Networks {
  BLKPRIME = "BLKPRIME",
  DAZN = "DAZN",
  ESPN = "ESPN",
  ESPNPLUS = "ESPN+",
  FSL = "FSL",
  FIGHTTV = "FIGHT TV",
  FITETV = "FITE TV",
  HBO = "HBO",
  HBOPPV = "HBO PPV",
  SHOWTIME = "ShowTime",
  SHOWTIMEPPV = "ShowTime PPV",
  NONE = "NONE",
}

export enum OfficialResults {
  CANCELED = "CANCELED",
  DECISION = "DECISION",
  DRAW = "DRAW",
  UD = "UD",
  MD = "MD",
  MDD = "MDD",
  SD = "SD",
  SDD = "SDD",
  DQ = "DQ",
  KO1 = "KO1",
  KO2 = "KO2",
  KO3 = "KO3",
  KO4 = "KO4",
  KO5 = "KO5",
  KO6 = "KO6",
  KO7 = "KO7",
  KO8 = "KO8",
  KO9 = "KO9",
  KO10 = "KO10",
  KO11 = "KO11",
  KO12 = "KO12",
  KO13 = "KO13",
  KO14 = "KO14",
  KO15 = "KO15",
  R12 = "R12",
  R11 = "R11",
  R10 = "R10",
  R9 = "R9",
  R8 = "R8",
  R7 = "R7",
}

export enum ReviewType {
  FANTASY = 'FANTASY',
  HISTORICAL = 'HISTORICAL',
  PREDICTION = 'PREDICTION',
  REVIEW = 'REVIEW',
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

export enum SeasonType {
  ANNUAL = "ANNUAL",
  MONTH = "MONTH",
  QUARTER = "QUARTER",
  FANTASY = "FANTASY",
  HISTORICAL = "HISTORICAL",
}

export enum Status {
  ACTIVE = "ACTIVE",
  CANCELED = "CANCELED",
  COMPLETE = "COMPLETE",
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
export const PANELIST_PREDICTIONS_OPTIONS = [
  { value: 'DC', label: 'UD' },
  { value: 'SD', label: 'SD' },
  { value: 'KO13' , label: 'KO 1-3' },
  { value: 'KO46' , label: 'KO 4-6' },
  { value: 'KO79' , label: 'KO 7-9' },
  { value: 'KO10' , label: 'KO 10-12' }
];

export const ROUND_LENGTH_ENUMS = [3,4,6,8,10,12,15];

export enum WeightClass {
  HEAVYWEIGHT = "Heavyweight",
  CRUISERWEIGHT = "Cruiserweight",
  LIGHTHEAVYWEIGHT = "Light Heavyweight",
  SUPERMIDDLEWEIGHT = "Super Middleweight",
  MIDDLEWEIGHT = "Middleweight",
  SUPERWELTERWEIGHT = "Super Welterweight",
  WELTERWEIGHT = "Welterwieght",
  JRWELTERWEIGHT = "Jr Welterweight",
  SUPERLIGHTWEIGHT = "Super Lightweight",
  LIGHTWEIGHT = "Lightweight",
  SUPERFEATHERWEIGHT = "Super Featherweight",
  FEATHERWEIGHT = "Featherweight",
  SUPERBANTAMWEIGHT = "Super Bantamweight",
  BANTAMWEIGHT = "Bantamweight",
  SUPERFLYWEIGHT = "Super Flyweight",
  FLYWEIGHT = "Flyweight",
  JRFLYWEIGHT = "Jr Flyweight",
}