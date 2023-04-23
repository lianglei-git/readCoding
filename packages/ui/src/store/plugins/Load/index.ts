import { LoadingENUM } from "../Symbol"

import SpuiTesting from './SpuiTesting'
import LoadDefaultBook from './LoadDefaultBook'

// TODO: checked LoadingENUM for key.
export default {
    [LoadingENUM['SpuiTesting']]: SpuiTesting,
    [LoadingENUM['LoadDefaultBook']]: LoadDefaultBook
}