import {languageReducer, SET_TARGET_LANGUAGE, setTargetLanguage} from "./reduxSetup";

describe("Redux setup", () => {
    it("set target language", () => {
        expect(setTargetLanguage("it")).toStrictEqual({
            language: "it",
            type: SET_TARGET_LANGUAGE
        });
    });

    it("set target language with missing language", () => {
        // eslint-disable-next-line no-undefined
        expect(setTargetLanguage(undefined)).toStrictEqual({
            language: "en",
            type: SET_TARGET_LANGUAGE
        });
    });

    it("handle language action without state by using initial state without cookies", () => {
        // eslint-disable-next-line no-undefined
        expect(languageReducer(undefined, null))
            .toStrictEqual({targetLanguage: "en"});
    });

    it("handle language action without a language", () => {
        expect(languageReducer({a: 1}, {type: SET_TARGET_LANGUAGE}))
            .toStrictEqual({a: 1});
    });

    it("handle language action with a language", () => {
        expect(languageReducer({a: 1}, {
            language: "it",
            type: SET_TARGET_LANGUAGE
        })).toStrictEqual({
            a: 1,
            targetLanguage: "it"
        });
    });

    it("handle unknown action", () => {
        expect(languageReducer({a: 1}, "unknown"))
            .toStrictEqual({a: 1});
    });
});