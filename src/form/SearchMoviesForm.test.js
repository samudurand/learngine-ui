import ReactDOM from "react-dom";
import React from "react";
import SearchMoviesForm from "./SearchMoviesForm";
import {SEARCH_MODES} from "../common/Common";
import {shallow} from "enzyme";
import {LanguageDropdown} from "./LanguageDropdown";
import {SearchModeToggle} from "./SearchModeToggle";
import {FlagsRow} from "./FlagsRow";

describe("SearchMoviesForm init", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(<SearchMoviesForm audio="en" title="matrix"/>, div);
    });

    it("initialize state", () => {
        const component = new SearchMoviesForm({
            language: "en",
            title: "matrix"
        });

        expect(component.state).toStrictEqual({
            language: "en",
            searchMode: SEARCH_MODES.MOVIEDB,
            title: "matrix"
        });
    });

    it("initialize state with default values", () => {
        const component = new SearchMoviesForm({});

        expect(component.state).toStrictEqual({
            language: "en",
            searchMode: SEARCH_MODES.MOVIEDB,
            title: ""
        });
    });
});

describe("SearchMovieForm", () => {
    it("handles language change if action provided", () => {
        const changeAction = jest.fn();
        const wrapper = shallow(<SearchMoviesForm handleLanguageChange={changeAction} language="en"/>);

        wrapper.instance().handleLanguageChange("it");

        expect(wrapper.state().language).toBe("it");
        expect(changeAction).toHaveBeenCalledWith("it");
    });

    it("does not do anything if language change action not provided", () => {
        const wrapper = shallow(<SearchMoviesForm language="en"/>);

        wrapper.instance().handleLanguageChange("it");

        expect(wrapper.state().language).toBe("it");
    });

    it("perform action on submit if search term long enough", () => {
        const submitAction = jest.fn();
        const wrapper = shallow(<SearchMoviesForm handleSubmit={submitAction} language="EN" title="mAtrix "/>);
        wrapper.state().searchMode = SEARCH_MODES.DIRECT;

        wrapper.instance().handleSubmit({preventDefault: jest.fn()});

        expect(submitAction).toHaveBeenCalledWith("matrix", "en", SEARCH_MODES.DIRECT);
    });

    it("does not perform action on submit if search term too short", () => {
        const submitAction = jest.fn();
        const wrapper = shallow(<SearchMoviesForm handleSubmit={submitAction} language="EN" title="m"/>);

        wrapper.instance().handleSubmit({preventDefault: jest.fn()});

        expect(submitAction).not.toHaveBeenCalled();
    });

    it("calculate search input field grid width when neither toggle nor dropdown displayed", () => {
        const wrapper = shallow(<SearchMoviesForm language="EN" title="m"/>);

        const result = wrapper.instance().calculateSearchInputWidth();

        // eslint-disable-next-line no-magic-numbers
        expect(result).toBe(12);
    });

    it("calculate search input field grid width when only search mode toggle displayed", () => {
        const wrapper = shallow(
            <SearchMoviesForm
                language="EN"
                showSearchModeToggle
                title="m"
            />
        );

        const result = wrapper.instance().calculateSearchInputWidth();

        // eslint-disable-next-line no-magic-numbers
        expect(result).toBe(9);
    });

    it("calculate search input field grid width when only language dropdown displayed", () => {
        const wrapper = shallow(<SearchMoviesForm
            language="EN"
            showLanguageDropdown
            title="m"
        />);

        const result = wrapper.instance().calculateSearchInputWidth();

        // eslint-disable-next-line no-magic-numbers
        expect(result).toBe(9);
    });

    it("calculate search input field grid width when both toggle and dropdown displayed", () => {
        const wrapper = shallow(<SearchMoviesForm
            language="EN"
            showLanguageDropdown
            showSearchModeToggle
            title="m"
        />);

        const result = wrapper.instance().calculateSearchInputWidth();

        // eslint-disable-next-line no-magic-numbers
        expect(result).toBe(6);
    });

    it("handles search mode change", () => {
        const wrapper = shallow(<SearchMoviesForm/>);

        wrapper.instance().handleModeChange({target: {checked: false}});

        expect(wrapper.state().searchMode).toBe(SEARCH_MODES.DIRECT);

        wrapper.instance().handleModeChange({target: {checked: true}});

        expect(wrapper.state().searchMode).toBe(SEARCH_MODES.MOVIEDB);
    });
});

describe("SearchMovieForm rendering", () => {
    it("renders no optional components", () => {
        const wrapper = shallow(<SearchMoviesForm/>);

        expect(wrapper.find(LanguageDropdown)).toHaveLength(0);
        expect(wrapper.find(SearchModeToggle)).toHaveLength(0);
        expect(wrapper.find(FlagsRow)).toHaveLength(0);
    });

    it("renders language dropdown", () => {
        const wrapper = shallow(<SearchMoviesForm showLanguageDropdown/>);

        expect(wrapper.find(LanguageDropdown)).toHaveLength(1);
    });

    it("renders search mode toggle", () => {
        const wrapper = shallow(<SearchMoviesForm showSearchModeToggle/>);

        expect(wrapper.find(SearchModeToggle)).toHaveLength(1);
    });

    it("renders flags radios", () => {
        const wrapper = shallow(<SearchMoviesForm showLanguageRadios/>);

        expect(wrapper.find(FlagsRow)).toHaveLength(1);
    });
});