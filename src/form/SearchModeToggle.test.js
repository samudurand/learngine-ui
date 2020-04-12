import ReactDOM from "react-dom";
import SearchMoviesForm from "./SearchMoviesForm";
import {SEARCH_MODES} from "../common/Common";
import React from "react";
import {FlagsRow} from "./FlagsRow";
import {SearchModeToggle} from "./SearchModeToggle";

describe('SearchModeToggle init', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<SearchModeToggle handleChange={jest.fn()}/>, div);
    });
});