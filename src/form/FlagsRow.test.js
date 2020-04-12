import ReactDOM from "react-dom";
import React from "react";
import {FlagsRow} from "./FlagsRow";

describe('FlagsRow init', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<FlagsRow handleChange={jest.fn()}/>, div);
    });
});