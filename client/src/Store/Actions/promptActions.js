import { actionTypes } from '../actionTypes'

const closePrompt = () => dispatch => {
    dispatch(closePromptFunc())
}

const closePromptFunc = () => {
    return {
        type: actionTypes.CLOSE_PROMPT,
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


export {
    closePrompt,
    openPrompt,
}