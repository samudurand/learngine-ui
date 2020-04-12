import ReactDOM from "react-dom";
import React from "react";
import {AlternativeTitlesRow} from "./AlternativeTitlesRow";
import {shallow} from "enzyme";

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