import ReactDOM from "react-dom";
import SearchMoviesForm from "./SearchMoviesForm";
import {LANGUAGES, SEARCH_MODES} from "../common/Common";
import React from "react";
import {FlagsRow} from "./FlagsRow";
import {LanguageDropdown} from "./LanguageDropdown";

describe('LanguageDropdown init', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<LanguageDropdown language="en"/>, div);
    });
});