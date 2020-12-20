import { actionTypes } from '../actionTypes'
import axios from '../../Axios/config'
import { setCurrentUser,getCurrentUser, setCurrentToken } from '../../UtilityFunctions/functions'
import { loading, finishedLoading } from './loadingActions'

const updateWifiDetails = (username, password) => async dispatch => {
    dispatch(loading());
    try{
        const user = await axios.post('/wifi',{email:getCurrentUser().email,wifiUsername: username,wifiPassword: password })
        dispatch(updateUsername(user.data));
    }
    catch(error){
        dispatch(openPrompt('תקלה', error.response.data))
    }
    finally{
        dispatch(finishedLoading());
    }
}

const updateSettings = (shufersalUsername,shufersalPassword,ramiLevyUsername,ramiLevyPassword,selection,sound, showMessage = false) => async dispatch => {
    dispatch(loading());
    try{
        const user = await axios.post('/settings',
        {email:getCurrentUser().email,
            shufersalUsername,
            shufersalPassword,
            ramiLevyUsername,
            ramiLevyPassword,
            selection,
            sound
         })
        await dispatch(updateUsername(user.data));
        await dispatch(loggedIn());
        if(!showMessage)
            dispatch(openPrompt('נשמר','כל המידע נשמר'))
    }
    catch(error){
        console.log(error)
        dispatch(openPrompt('תקלה', error.response.data))
    }
    finally{
        dispatch(finishedLoading());
    }


}


const updateUsername = (user) => dispatch => {
    setCurrentUser(user);
    try{
        if(user.token !== undefined && user.token !== null && user.token !== ''){
            setCurrentToken(user.token)
            dispatch(updateToken(user.token))    
        }
    }
    catch(erorr){
        console.log(erorr)
    }
    return {
        type: actionTypes.UPDATE_USERNAME,
        payload: user
    }
}

const openPrompt = (title, text, subjectOptional) => {
    return {
        type: actionTypes.OPEN_PROMPT,
        title,
        text,
        subjectOptional
    }
}


const loggedIn = () => {
    return {
        type: actionTypes.LOGGED_IN
    }
}

const updateToken = (token) => {
    return {
        type: actionTypes.UPDATE_TOKEN,
        token,
    }
}

const logIn = (email, password) => async dispatch => {
    dispatch(loading());
    try {
        const user = await axios.post('/login', { email: email, password: password })
        await dispatch(updateUsername(user.data));
        await dispatch(loggedIn());
    }
    catch (error) {
        dispatch(openPrompt('תקלה', error.response.data))
    }
    finally {
        dispatch(finishedLoading());
    }
}

const registerAll = (email,password,shufersalUsername,shufersalPassword,ramiLevyUsername,ramiLevyPassword,selection,sound,usernameWifi,passwordWifi) => async dispatch => {
    const shouldUpdate = await axios.post('/settings/update', {shufersalUsername,shufersalPassword,ramiLevyUsername,ramiLevyPassword,selection})
    if(shouldUpdate.data.should){
        await dispatch(register(email,password))
        if(getCurrentUser()){
            await dispatch(updateWifiDetails(usernameWifi,passwordWifi))        
            await dispatch(updateSettings(shufersalUsername,shufersalPassword,ramiLevyUsername,ramiLevyPassword,selection,sound,true))
        }    
    }
   else{
       dispatch(openPrompt('תקלה', ' האימייל והסיסמה לאתר הקניות לא נמצאו'))
   }
}

const register = (email, password) => async dispatch => {
    dispatch(loading());
    try {
        const user = await axios.post('/register', { email: email, password: password })
        await dispatch(updateUsername(user.data));
    }
    catch (error) {
        console.log(error)
        dispatch(openPrompt('תקלה', error.response.data))
    }
    finally {
        dispatch(finishedLoading());
    }
}






export {
    updateUsername,
    loggedIn,
    logIn,
    register,
    updateWifiDetails,
    updateSettings,
    updateToken,
    registerAll
}
