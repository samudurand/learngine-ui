import ReactDOM from "react-dom";
import React from "react";
import {AlternativeTitlesRow} from "./AlternativeTitlesRow";
import {shallow} from "enzyme";
import * as redux from "react-redux";
import configureStore from "redux-mock-store";

const mockStore = configureStore([]);

describe("AlternativeTitlesRow", () => {

    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <redux.Provider store={mockStore({targetLanguage: "en"})}>
                <AlternativeTitlesRow titles={["title1", "title2"]}/>
            </redux.Provider>, div);
    });

    it("renders all titles", () => {
        const spy = jest.spyOn(redux, "useSelector");
        spy.mockReturnValue("en");

        const wrapper = shallow(<AlternativeTitlesRow titles={["title1", "title2"]}/>);

        expect(wrapper.find(".altTitle")).toHaveLength(2);
    });
});