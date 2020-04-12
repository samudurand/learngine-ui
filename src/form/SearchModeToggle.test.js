import ReactDOM from "react-dom";
import React from "react";
import {SearchModeToggle} from "./SearchModeToggle";

describe('SearchModeToggle init', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<SearchModeToggle handleChange={jest.fn()}/>, div);
    });
});