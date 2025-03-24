import { WeightClass } from "../../models"
import { SeasonType } from "../../../stores";

export const initialFightState = {  
     isMainEvent: false,
    isTitleFight: false,
    officialResult: null,
    rounds: 12,
    weightclass: WeightClass.CATCHWEIGHT,
};

export const initialShowState = {   
    location: '',
    link: '',
    network: '',
    promoter: '',
};

// export const initialSeasonState = {
//     type: SeasonType.MONTH
// };
export const initialMetasState = {
    description: null,
    parent: null,
    storyline: null,
    subtitle: null,
    title: null,
    typeIds: [],
    starts: new Date(),
    ends: new Date(),
}