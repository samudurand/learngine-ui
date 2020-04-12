import ReactDOM from "react-dom";
import React from "react";
import {LanguageDropdown} from "./LanguageDropdown";

describe('LanguageDropdown init', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<LanguageDropdown language="en"/>, div);
    });
});