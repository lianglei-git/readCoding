import BookEntry, { BookItem, FileType } from "@store/BookEntry";
import { AppStore } from "@store/index";
import ToKillAMockingbird from "./default_books/To kill a Mockingbird.pdf?raw";
import queryString from "@/utils/queryString";
import { getSaveCodingAPI } from "@/api/index";

/** sparrow-ui开发 */
class SpuiDev {
  constructor(public app: AppStore) {
    this.startup();
  }
  selectEvery() {
    let arr = Array.from(document.querySelectorAll('.rc-tree-node-content-wrapper'));
    for(let i = 0; i < arr.length; i++){
        if(arr[i].title.indexOf('index.') > -1) {
            arr[i]?.click();
            break;
        }
    }
  }
  startup() {
    this.app.Setting.PersistableLoadProcess.value = 1;
    const parseData: any = queryString.parse(location.href);
    if (parseData.key) {
      getSaveCodingAPI(parseData.key).then((res) => {
        if (res.data) {
          this.app.TreeStore.startup(res.data);
          this.app.TreeStore.OriginBootContainerFiles = res.data;
          this.app.Setting.PersistableLoadProcess.value = 100;
          setTimeout(() => {
            this.selectEvery();
          },100)
        }
      });
    }else {
        const SpuiDev = this.app.TreeStore.OriginBootContainerFiles.template.directory.spuiDev
        this.app.TreeStore.OriginBootContainerFiles = SpuiDev.directory;
        this.app.TreeStore.startup(SpuiDev.directory);
        this.app.Setting.PersistableLoadProcess.value = 100;
        setTimeout(() => {
            this.selectEvery();
          },100)
    }
    this.app.TreeStore.projectName = 'SpuiDev'
  }
}

export default SpuiDev;
