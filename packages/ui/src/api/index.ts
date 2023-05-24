import axios from "axios"

// dev
// const baseURI = location.protocol+'//'+location.hostname+':28256'

// pro
const baseURI = location.protocol+'//'+location.hostname

function saveCodingAPI(param: {key: string,username:string, password:string, data: any}) {
    return axios.post(baseURI+'/coding/save', param)
}


function getSaveCodingAPI(key:string) {
    return axios.get(baseURI+'/coding/save?key='+key)
}


export {
    getSaveCodingAPI,
    saveCodingAPI
}