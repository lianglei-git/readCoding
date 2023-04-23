import { AppStore } from "..";
import {LoadingENUM} from './Symbol'

class Plugins {

    constructor(public app: AppStore, enabled: (LoadingENUM | null)[]= []) {
        this.LoadPluginsMap.then((module: any) => {
            enabled.map(key=> {
                if(key !== null && module.default[key]){
                    console.log(key,'keykeykey')
                    // console.log(module.default[key],'module.default[key]')
                    new (module.default[key])(app);
                }
            });
        })
    }

    LoadPluginsMap = import('./Load')

    // TODO: For local page, and for every page. Use by Loading Plugins
    /** plugin loading change process number. */
    get PersistableLoadProcess() {
        return this.app.Setting.PersistableLoadProcess;
    }

}

export default Plugins