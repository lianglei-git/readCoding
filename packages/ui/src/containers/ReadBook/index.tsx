import { useBooks } from "@/hooks";
import './index.less'
/** read book view */
const ReadBookContainer = () => {
    const books = useBooks();
    return <div className="ReadBookContainer">
        
        <iframe src={"/public/pdfjs/web/viewer.html?file=1678845299863"}></iframe>
    </div>
}

export default ReadBookContainer;