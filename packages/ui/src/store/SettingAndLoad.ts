import localforage from "localforage";
import { AppStore } from ".";
import { Localforage_key_Books } from "./private";
import { action, makeObservable, observable, toJS } from "mobx";
import { makePersistable, isHydrated } from 'mobx-persist-store'; // 引入相关api
import { planLayoutMain_Horizontal, planLayoutMain_Mutant, LayoutEnmu, planLayoutMainInit } from "./private/layoutConst";



type IUseType = 'web' | 'local' | 'sql'
class SettingAndLoadStore {
    useType: IUseType[] = ['web']

    /** 默认布局 */
    LayoutPlan = planLayoutMain_Horizontal

    /** 修改布局 */
    changeLayout = (layoutType: LayoutEnmu) => {
        if (layoutType == LayoutEnmu.Init) {
            this.LayoutPlan = planLayoutMainInit;
            return;
        }

        
        if(layoutType == LayoutEnmu.Static) {
            const cp = toJS(this.LayoutPlan);
            this.LayoutPlan = cp.map(i => {
                i.static = !i.static;
                return i;
            })
        }else if(layoutType == LayoutEnmu.Mutant) {
            this.LayoutPlan = planLayoutMain_Mutant;
        }else{
            this.LayoutPlan = planLayoutMain_Horizontal;
        }
    }

    /** 系统是否加载完成进度 -1~100, -1为失败，具体看提示 */
    PersistableLoadProcess = {
        value: -1,
        message: ''
    };

    constructor(app: AppStore) {
        makeObservable(this, {
            PersistableLoadProcess: observable,
            LayoutPlan: observable
        });
        makePersistable(this, {
            name: 'PersistSetting',
            properties: ['LayoutPlan'],
            storage: localStorage
          }).then(
            action(() => {
                // 非ui代码实现
                if(!AppStore.isCardCode) {
                    this.PersistableLoadProcess.value = 100;
                }
            })
          );
        // if(useType)
        localforage.getItem(Localforage_key_Books, (err, historyBooks) => {
            if (err) {
                return this.PersistableLoadProcess = {
                    value: -1,
                    message: '获取历史报错  ' + err
                };
            }
            if (Array.isArray(historyBooks)) {
                app.Books.toLoadDataFormat(historyBooks)
            }
        })
    }

}


export default SettingAndLoadStore;