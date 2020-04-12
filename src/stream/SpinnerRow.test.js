import ReactDOM from "react-dom";
import React from "react";
import SpinnerRow from "./SpinnerRow";

describe('SpinnerRow', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<SpinnerRow/>, div);
    });
});