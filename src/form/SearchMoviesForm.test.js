import ReactDOM from "react-dom";
import React from "react";
import SearchMoviesForm from "./SearchMoviesForm";
import {SEARCH_MODES} from "../common/Common";
import {shallow} from "enzyme";
import {LanguageDropdown} from "./LanguageDropdown";
import {SearchModeToggle} from "./SearchModeToggle";
import {FlagsRow} from "./FlagsRow";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {languageReducer} from "../common/reduxSetup";

describe("SearchMoviesForm init", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <Provider store={createStore(languageReducer)}>
                <SearchMoviesForm audio="en" handleSubmit={jest.fn()} title="matrix"/>
            </Provider>, div);
    });

    it("initialize state with default values", () => {
        const component = shallow(<SearchMoviesForm.WrappedComponent handleSubmit={jest.fn()}/>);

        expect(component.state()).toStrictEqual({
            searchMode: SEARCH_MODES.MOVIEDB,
            title: ""
        });
    });
});

describe("SearchMovieForm", () => {
    it("perform action on submit if search term long enough", () => {
        const submitAction = jest.fn();
        const wrapper = shallow(<SearchMoviesForm.WrappedComponent handleSubmit={submitAction}
                                                                   targetLanguage="en" title="mAtrix "/>);
        wrapper.state().searchMode = SEARCH_MODES.DIRECT;

        wrapper.instance().handleSubmit({preventDefault: jest.fn()});

        expect(submitAction).toHaveBeenCalledWith("matrix", "en", SEARCH_MODES.DIRECT);
    });

    it("does not perform action on submit if search term too short", () => {
        const submitAction = jest.fn();
        const wrapper = shallow(<SearchMoviesForm.WrappedComponent
            handleSubmit={submitAction} language="EN" title="m"/>);

        wrapper.instance().handleSubmit({preventDefault: jest.fn()});

        expect(submitAction).not.toHaveBeenCalled();
    });

    it("handles search mode change", () => {
        const wrapper = shallow(<SearchMoviesForm.WrappedComponent handleSubmit={jest.fn()}/>);

        wrapper.instance().handleModeChange({target: {checked: false}});

        expect(wrapper.state().searchMode).toBe(SEARCH_MODES.DIRECT);

        wrapper.instance().handleModeChange({target: {checked: true}});

        expect(wrapper.state().searchMode).toBe(SEARCH_MODES.MOVIEDB);
    });
});

describe("SearchMovieForm rendering", () => {
    it("renders no optional components", () => {
        const wrapper = shallow(<SearchMoviesForm.WrappedComponent handleSubmit={jest.fn()}/>);

        expect(wrapper.find(LanguageDropdown)).toHaveLength(0);
        expect(wrapper.find(SearchModeToggle)).toHaveLength(0);
        expect(wrapper.find(FlagsRow)).toHaveLength(0);
    });

    it("renders language dropdown", () => {
        const wrapper = shallow(<SearchMoviesForm.WrappedComponent handleSubmit={jest.fn()}
                                                                   showLanguageDropdown
                                                                   targetLanguage="en"/>);

        expect(wrapper.find(LanguageDropdown)).toHaveLength(1);
    });

    it("renders search mode toggle", () => {
        const wrapper = shallow(<SearchMoviesForm.WrappedComponent handleSubmit={jest.fn()} showSearchModeToggle/>);

        expect(wrapper.find(SearchModeToggle)).toHaveLength(1);
    });

    it("renders flags radios", () => {
        const wrapper = shallow(<SearchMoviesForm.WrappedComponent handleSubmit={jest.fn()}
                                                                   showLanguageRadios
                                                                   targetLanguage="en"/>);

        expect(wrapper.find(FlagsRow)).toHaveLength(1);
    });
});