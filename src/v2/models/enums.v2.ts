export enum AnalyticType {
    FIGHT = "FIGHT",
    LIST = "LIST",
    RS = "RS",
    UP = "UP",
  }
  
  export enum CornerType {
    FIGHT = "FIGHT",
    FIGHT_NIGHT = "FIGHT_NIGHT",
    SHOW = "SHOW",
    SEASON = "SEASON",
  }
  
  export enum FighterType {
    BOXER = "BOXER",
    MMA = "MMA",
  }
  
  export enum JabType {
    ALL = "ALL", // Currently for unsubscribe only.
    BETA = "BETA",
    NEWSLETTER = "NEWSLETTER",
    REMINDERS = "REMINDERS",
    WEEKLY_FIGHTS_UPDATE = "WEEKLY_FIGHTS_UPDATE",
    WELCOME = "WELCOME", // There should be no WELCOME subscribe type, this should be a jabs (service) type.
  }
  
  export enum JudgeType {
    COACH = "COACH",
    FSL = "FSL",
    OFFICIAL = "OFFICIAL",
  }
  
  export enum Networks {
    BLKPRIME = "BLKPRIME",
    DAZN = "DAZN",
    ESPN = "ESPN",
    ESPN_PLUS = "ESPN_PLUS",
    FSL = "FSL",
    FIGHT_TV = "FIGHT_TV",
    FITE_TV = "FITE_TV",
    PRIME = "PRIME",
    PRIME_PPV = "PRIME_PPV",
    SHOWTIME = "SHOWTIME",
    SHOWTIME_PPV = "SHOWTIME_PPV",
    TNT_SPORTS_1 = "TNT_SPORTS_1",
    NONE = "NONE",
  }
  
  export const ROUND_LENGTH_ENUMS = [3,4,6,8,10,12,15];

  export enum RoundNote {
    "EA" = "Effective Aggression",
    "D" = "Defense",
    "RG" = "Ring Generalship",
    "CP" = "Clean Punching",
  }
  
  export enum SeasonType {
    ANNUAL = "ANNUAL",
    FANTASY = "FANTASY",
    HISTORICAL = "HISTORICAL",
    MONTH = "MONTH",
    QUARTER = "QUARTER",
    TRAINING = "TRAINING",
  }
  
  export enum Status {
    ACTIVE = "ACTIVE",
    ARCHIVED = "ARCHIVED",
    CANCELED = "CANCELED",
    COMPLETE = "COMPLETE",
    PENDING = "PENDING",
    PPD = "PPD",
    TESTING = "TESTING",
  }
  
  export enum UserPickType {
    FIGHT = "FIGHT",
    FSL = "FSL",
    LIST = "LIST",
  }
  
  export enum WeightClass {
    HEAVYWEIGHT = "Heavyweight",
    CRUISERWEIGHT = "Cruiserweight",
    LIGHT_HEAVYWEIGHT = "Light Heavyweight",
    SUPER_MIDDLEWEIGHT = "Super Middleweight",
    MIDDLEWEIGHT = "Middleweight",
    SUPER_WELTERWEIGHT = "Super Welterweight",
    WELTERWEIGHT = "Welterweight",
    JR_WELTERWEIGHT = "Jr Welterweight",
    SUPER_LIGHTWEIGHT = "Super Lightweight",
    LIGHTWEIGHT = "Lightweight",
    SUPER_FEATHERWEIGHT = "Super Featherweight",
    FEATHERWEIGHT = "Featherweight",
    SUPER_BANTAMWEIGHT = "Super Bantamweight",
    BANTAMWEIGHT = "Bantamweight",
    SUPER_FLYWEIGHT = "Super Flyweight",
    FLYWEIGHT = "Flyweight",
    JR_FLYWEIGHT = "Jr Flyweight",
    MINIMUMWEIGHT = "Minimumweight",
    STRAWWEIGHT = "Strawweight",
    CATCHWEIGHT = "Catchweight",
  }
  