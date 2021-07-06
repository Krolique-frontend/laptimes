import {createContext} from 'react';

export const MenuContext = createContext({
    pilotsList: null,
    filtersList: null,
    trackList: null,
    raceMode: false
});