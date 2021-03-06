const userExists = (user) => {
    return user !== undefined && user !== null && user !== '';
}
const isPartOfString = (main, partOfMain, isReceiver) => {
    const mainStr = isReceiver ? main.receiver : main.sender;
    if (mainStr.indexOf(partOfMain) >= 0)
        return true
    return false
}

const messagesExist = (messages) => {
    return messages !== undefined && messages !== null && messages.length > 0;
}

const setCurrentUser = (user) => {
    if(getCurrentUser() && getCurrentUser().wifiPassword){
        user.wifiPassword = getCurrentUser().wifiPassword
    }
    localStorage.setItem('currentUser', JSON.stringify(user))
}
const setCurrentToken = (token) => {
    localStorage.setItem('token', JSON.stringify(token))
}

const getCurrentToken = () => {
    return JSON.parse(localStorage.getItem('token'))
}

const getCurrentUser = () => {
    return JSON.parse(localStorage.getItem('currentUser'))
}

export {
    userExists,
    isPartOfString,
    setCurrentUser,
    getCurrentUser,
    messagesExist,
    getCurrentToken,
    setCurrentToken
}