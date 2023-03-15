/** bookshelf */

import { useBooks } from "@/hooks";



/**
 * View
 * |--------- ----------|
 * |  Cover  | BookName |
 * |  Cover  |          |
 * |  Cover  | Author   |
 * |--------- ----------|
 */
const BookShelf = () => {
    const books = useBooks();
    return <div className="book_shelf">
        {books.bookMap.map((item) => {
            return <dl className="book_shelf-item" key={item.key}>
                    <dd></dd>
                    <dt></dt>
                </dl>
        })}
    </div>
}

export default BookShelf;