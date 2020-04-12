import {SourcePanel} from "./SourcePanel";
import ReactDOM from "react-dom";
import React from "react";
import SpinnerRow from "./SpinnerRow";
import {AlternativeTitlesRow} from "./AlternativeTitlesRow";
import {shallow} from "enzyme";
import {StreamCard} from "./StreamCard";

describe('AlternativeTitlesRow', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<AlternativeTitlesRow titles={["title1", "title2"]} audio={"en"}/>, div);
    });

    it('renders all titles', () => {
        const wrapper = shallow(<AlternativeTitlesRow titles={["title1", "title2"]} audio={"en"}/>);

        expect(wrapper.find(".altTitle")).toHaveLength(2);
    });
});