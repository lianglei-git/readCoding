import axios from "axios"

const baseURI = location.protocol+'//'+location.hostname+':28256'

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