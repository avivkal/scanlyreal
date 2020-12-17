const initialState = {
    currentUser: {},
    loggedIn: false,
    loading: false,
    token: ''
}

const mainReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'UPDATE_USERNAME':
            return {
                ...state,
                currentUser: action.payload
            }
        case 'LOGGED_IN':
            return {
                ...state,
                loggedIn: true
            }
        case 'UPDATE_TOKEN':
            return {
                ...state,
                token: action.token
            }
        default:
            return state
    }
}

export default mainReducer;