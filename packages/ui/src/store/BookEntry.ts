import IL from "@/components/Internationalization";
import Spui from "@sparrowend/ui";
import localforage from "localforage";
import { computed, makeAutoObservable, makeObservable, observable, reaction, toJS } from "mobx";
import { Localforage_key_Any, Localforage_key_Books } from "./private";

const ErrorTip = (Spui.Message as any).error
const SuccessTip = (Spui.Message as any).success

enum FileType {
    markdown = 'text/markdown',
    pdf = 'application/pdf',
}
interface IBookFile extends File {
    path?: string,
    type: FileType
}

interface CoreBookType {
    size: number;
    author: string,
    description: string,
    key: string,
    type: FileType,
    path: string |undefined,
    name: string,
    lastPage: number,
    isHistoryInfo?:boolean,
    cover: string
}
enum BookSaveType {
    'local', 'sql', 'web'
}
type AnalysisStatus = false | 'wait' | 'fulled' | 'failed'

class BookItem {
    /** 目前支持pdf */
    private _reader: FileReader = new FileReader();
    private _status: AnalysisStatus = false;
    constructor(public File: IBookFile | CoreBookType) {
        makeObservable(this, {
            _status: observable,
            analysisStatus: computed
        });
    }


     get analysisStatus() {
        return this._status
    }

    /** 当前是否为历史储存过的文件 */
    get isHistoryInfo() {
        return (this.File as CoreBookType).isHistoryInfo
    }

    get bookName() {
        return this.File.name
    }

    get bookPath() {
        return this.File.path;
    }

    get bookType() {
        return this.File.type;
    }

    get bookSize() {
        return this.File.size;
    }

    lastPage = -1;

    key:string =  Date.now()+'';

    cover = '';

    description = '';

    author = '未知';

    /** save for indexedDB Object */
    toJson(): CoreBookType {
        return {
            size: this.bookSize,
            author: this.author,
            description: this.description,
            key: this.key,
            type: this.bookType,
            path: this.bookPath,
            name: this.bookName,
            lastPage: this.lastPage,
            cover: this.cover
        }
    }

    /** 创建文件 */
    static createFile(content: any, fileName: string, type: FileType): IBookFile{
        return new File([content],fileName, {type}) as IBookFile
    }

    /** load for indexedDB Object */
    toLoad(File: IBookFile| CoreBookType = this.File) {
        if(this.isHistoryInfo) {
           return ErrorTip('因为是历史文件，不能加载，请传入文件再试！')
        }
        this._reader.readAsArrayBuffer(File as IBookFile);
        this._status = 'wait';
        this._reader.onload = async (e: FileReaderEventMap['load']) => {
            if (!e.target) {
                this._status = 'failed';
                // return ErrorTip(IL('导入失败'));
            }
            this._status = 'fulled';
        }
    }

    get bookContent(): string | ArrayBuffer | null {
        if (this._status == 'fulled') {
            return this._reader.result;
        }
        return '';
    }

}


/** save book */
class BookAction {

    /** save indexDB */
    _saveWeb(BooksStore:BookEntry,target: BookItem):Promise<any> {
        return new Promise((res,rej) => {
            localforage.setItem(Localforage_key_Books, BooksStore.toJson())
            .then(() => {
                const key = target.key;
                localforage.setItem(key as Localforage_key_Any, target.bookContent)
                res({code: 1, message: SuccessTip(IL('书籍导入成功'))})
            })
            .catch((errMessage) => {
                ErrorTip(errMessage)
                rej({code: 0, message: errMessage})
            })
        })
    }

    _saveSql(BooksStore:BookEntry,target: BookItem) {
        return Promise.resolve('');
    }

    _saveLocal(BooksStore:BookEntry,target: BookItem) {
        return Promise.resolve('');
    }

    bookSave(BooksStore:BookEntry,target: BookItem, saveType: BookSaveType):Promise<any>{
        if(saveType == BookSaveType.web) {
            return this._saveWeb(BooksStore, target)
        }
        if(saveType == BookSaveType.local){
            return this._saveLocal(BooksStore, target)
        }
        // if(saveType == BookSaveType.sql){
            return this._saveSql(BooksStore, target)
        // }
    }

    /** 加载web储存过的book */
    loadWebBook(target: CoreBookType){
        localforage.getItem(target.key as Localforage_key_Any, (err, value) => {
            if(err) return ErrorTip(err);
            console.log('加载web储存过的book--->', value)
        })
    }
}

// function p(obj) {
//     return new Promise((res,rej) => {
//         obj.res = res;
//         obj.rej = rej;
//     })
// }


class BookEntry {

    constructor() {
        makeAutoObservable(this);
    }

    /** 当前选中书籍 */
    activeBook = null;

    /** book的行动 */
    BookAction = new BookAction();

    /** 书籍集合 */
    bookMap: BookItem[] = [];

    get allBook() {
        return this.bookMap;
    }

    toJson() {
        return toJS(this.bookMap.map(item => {
            return item.toJson();
        }))
    }

    /** 加载历史 文件 */
    toLoadDataFormat(historyBooks: any[]){
        historyBooks.map((item: CoreBookType) => {
            item.isHistoryInfo = true;
            this._bookMapPush(item);
        })
    }

    isSupportFileType(File: IBookFile):boolean {
        return true
        if(File.type == FileType.pdf){
            return true;
        }
        return false
    }

    _bookMapPush(File: IBookFile | CoreBookType) {
        const b: BookItem = new BookItem(File);
        this.bookMap.push(b);
        return b;
    }

    /** 图书重复 */
    isDuplicateBook(File: IBookFile):boolean {
        for(let i =0; i < this.bookMap.length; i++) {
            if(this.bookMap[i].bookName == File.name && this.bookMap[i].bookSize == File.size) {
                return true
            }
        }
        return false
    }

    /** Add One Book */
    addBook(File: IBookFile, saveType: BookSaveType | false = BookSaveType.web):Promise<BookItem|unknown> {
        
        if(!this.isSupportFileType(File)) {
            return ErrorTip('不支持文件类型')
        }

        if(this.isDuplicateBook(File)) {
            return ErrorTip('图书重复')
        }

        const b = this._bookMapPush(File);
        b.toLoad();
        let PromiseResolve: any = null;
        let PromiseReject: any= null;
        reaction(() => b.analysisStatus, (status: AnalysisStatus) => {
            if(status == 'fulled') {
                /** no save */
                if(saveType === false) {
                    // TODO: 不使用任何存储情况下打开文件
                    PromiseResolve({code: 1, message: SuccessTip(IL('导入成功'))}) 
                }else {
                    this.BookAction.bookSave(this, b, saveType)
                    .then((saveReslove) => {
                        PromiseResolve(saveReslove);
                    })
                    .catch((err) => {
                        PromiseReject(err)
                    })
                }
            }
            if(status == 'failed') {
                PromiseReject({code: 0, message:  ErrorTip(IL('导入失败'))})
            }
        });

        
        return new Promise((res, rej)=> {
            PromiseResolve = res;
            PromiseReject = rej;
        })
    }

}

export default BookEntry;