import BookEntry, { BookItem, FileType } from "@store/BookEntry";
import { AppStore } from "@store/index";
import ToKillAMockingbird from './default_books/To kill a Mockingbird.pdf?raw'

class LoadDefaultBook {

    constructor(public app: AppStore) {

        this.startup();
    }
    startup() {
        // this.app.Books.addBook()
        const ToKillAMockingbirdFile = BookItem.createFile(ToKillAMockingbird, 'To Kill A Mockingbird', FileType['pdf'])
        if(this.app.Books.isDuplicateBook(ToKillAMockingbirdFile)) return '';
        this.app.Books.addBook(ToKillAMockingbirdFile)
    }
}

export default LoadDefaultBook;