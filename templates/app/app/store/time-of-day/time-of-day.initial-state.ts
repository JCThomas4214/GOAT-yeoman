import { reimmutifyTimeOfDay } from './time-of-day.transformers';

// Define the TIME_OF_DAY for the cloudStyle Object
export const INITIAL_STATE = reimmutifyTimeOfDay({
    cloudBrightness: '100%',
    skySvg: '',

    goatSvg: '',
    mountainSvg: '',
    islandSvg: '',
    treeSvg: '',

    oceanSvg: '',
    whaleSvg: ''
});
