import React from "react";
import Home from "./Home";
import ReactDOM from "react-dom";

import {BrowserRouter} from "react-router-dom";
import {SEARCH_MODES} from "./common/Common";
import {shallow} from "enzyme";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {languageReducer} from "./common/reduxSetup";

describe("Home", () => {
    it("renders without crashing", () => {
        const div = document.createElement("div");
        ReactDOM.render(
            <Provider store={createStore(languageReducer)}>
                <BrowserRouter>
                    <Home/>
                </BrowserRouter>
            </Provider>, div);
    });

    it("searches movies on submit if mode is set to MovieDB Search", () => {
        const historyMock = {push: jest.fn()};

        const wrapper = shallow(<Home.WrappedComponent history={historyMock}/>);
        wrapper.instance().searchMovieOrStreamOnSubmit("Matrix", "en", SEARCH_MODES.MOVIEDB);

        expect(historyMock.push).toHaveBeenCalledWith("/search/movie?title=matrix&audio=en");
    });

    it("searches streams on submit if mode is set to Direct Search", () => {
        const historyMock = {push: jest.fn()};

        const wrapper = shallow(<Home.WrappedComponent history={historyMock}/>);
        wrapper.instance().searchMovieOrStreamOnSubmit("Matrix", "en", SEARCH_MODES.DIRECT);

        expect(historyMock.push).toHaveBeenCalledWith("/search/stream?title=matrix&audio=en");
    });

});
