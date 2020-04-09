import React from 'react';
import Home from "./Home";
import ReactDOM from 'react-dom';

import {BrowserRouter} from "react-router-dom";
import {SearchModes} from "./Common";
import {shallow} from "enzyme";

describe('Home', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter><Home /></BrowserRouter>, div);
    });

    it('searches movies on submit if mode is set to MovieDB Search', () => {
        const historyMock = { push: jest.fn() };

        const wrapper = shallow(<Home.WrappedComponent history={historyMock}/>);
        wrapper.instance().searchMovieOrStreamOnSubmit('Matrix', 'en', SearchModes.MOVIEDB);

        expect(historyMock.push).toHaveBeenCalledWith('/search/movie?title=matrix&audio=en');
    });

    it('searches streams on submit if mode is set to Direct Search', () => {
        const historyMock = { push: jest.fn() };

        const wrapper = shallow(<Home.WrappedComponent history={historyMock}/>);
        wrapper.instance().searchMovieOrStreamOnSubmit('Matrix', 'en', SearchModes.DIRECT);

        expect(historyMock.push).toHaveBeenCalledWith('/search/stream?title=matrix&audio=en');
    });

});
