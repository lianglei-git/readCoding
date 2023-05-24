import { LoadingENUM } from "../Symbol"

import SpuiTesting from './SpuiTesting'
import LoadDefaultBook from './LoadDefaultBook'
import SpuiDev from './SpuiDev'

// TODO: checked LoadingENUM for key.
export default {
    [LoadingENUM['SpuiTesting']]: SpuiTesting,
    [LoadingENUM['LoadDefaultBook']]: LoadDefaultBook,
    [LoadingENUM['SpuiDev']]: SpuiDev,
}