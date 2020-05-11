import {getCookie, setCookie} from "./cookies";
import {LANGUAGES} from "./common/Common";

const TARGET_LANGUAGE_COOKIE = "targetLanguage";
const SET_TARGET_LANGUAGE = "SET_TARGET_LANGUAGE";
export function setTargetLanguage(targetLanguage) {
    const language = targetLanguage || LANGUAGES[0].code;
    setCookie(TARGET_LANGUAGE_COOKIE, language);
    return {
        language: language,
        type: SET_TARGET_LANGUAGE
    };
}

export function mapLanguageStateToProps(state) {
    return {
        targetLanguage: state.targetLanguage
    };
}

const initialState = {
    targetLanguage: getCookie(TARGET_LANGUAGE_COOKIE) || "en"
};

export function languageReducer(state, action) {
    if (typeof state === "undefined") {
        return initialState;
    }

    switch (action.type) {
        case SET_TARGET_LANGUAGE:
            if (action.language) {
                return {
                    ...state,
                    targetLanguage: action.language
                };
            }
            return state;
        default:
            return state;
    }
}