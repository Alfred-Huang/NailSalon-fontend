const TokenKey = 'Token'

export function getToken(){
    console.log("------------------------------------")
     return sessionStorage.getItem(TokenKey)
}
export function setToken(token){
     sessionStorage.setItem(TokenKey, "123")
}
export function removeToken(){
     sessionStorage.removeItem(TokenKey)
}
