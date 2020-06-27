import { Config } from "../configuration/config";

export class StateLoader {
    config: Config;
    constructor() {
        this.config = new Config();
    }
    loadState() {
        try {
            let serializedState = localStorage.getItem(this.config.localStorageKey.appState);

            if (serializedState === null) {
                return this.initializeState();
            }

            return JSON.parse(serializedState);
        }
        catch (err) {
            return this.initializeState();
        }
    }

    saveState(state: any) {
        try {
            let serializedState = JSON.stringify(state);
            localStorage.setItem(this.config.localStorageKey.appState, serializedState);

        }
        catch (err) {
        }
    }

    initializeState() {
        return {
            //state object
        }
    }
}