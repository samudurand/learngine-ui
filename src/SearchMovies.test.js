import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import SearchMovies from "./SearchMovies";
import {shallow} from "enzyme";
import SearchMoviesForm from "./SearchMoviesForm";
import {flushPromises} from "./common/TestCommons";
import MovieRow from "./MovieRow";

describe('SearchMovies init', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter><SearchMovies/></BrowserRouter>, div);
    });

    it('initialize state', () => {
        const component = new SearchMovies.WrappedComponent({
            location: {
                search: 'title=matrix&audio=en'
            }
        });

        expect(component.state).toStrictEqual({
            isLoaded: false,
            movies: [],
            movieTitle: "matrix",
            movieAudio: "en"
        });
    });
});

describe('SearchMovies', () => {
    let component;
    let historyMock;

    beforeEach(() => {
        historyMock = {push: jest.fn()};
        component = shallow(
            <SearchMovies.WrappedComponent
                history={historyMock}
                location={{search: 'title=matrix&audio=en'}}/>,
            {disableLifecycleMethods: true}
        );
        fetch.resetMocks();
    });

    it('fetch movies on mount and save them on success', async () => {
        fetch.once(JSON.stringify(matrixMovies));

        await component.instance().fetchMovies();

        const state = component.state();
        expect(state.isLoaded).toBe(true);
        expect(state.movies).toEqual(matrixMovies);
    });

    it('fetch movies and fails', async () => {
        fetch.mockReject();

        await component.instance().fetchMovies();

        const state = component.state();
        expect(state.isLoaded).toBe(true);
        expect(state.movies).toEqual([]);
    });

    it('performs search and update url', async () => {
        const mockFetch = jest.fn();
        component.instance().fetchMovies = mockFetch;

        await component.instance().updateUrlAndStartSearch("Matrix", "EN");

        expect(historyMock.push).toHaveBeenCalledWith('/search/movie?title=matrix&audio=en');
        expect(mockFetch).toHaveBeenCalledWith("matrix");
    });

    it('build url', () => {
        expect(component.instance().buildUrl("Daredevil  ", "IT")).toBe('/search/movie?title=daredevil&audio=it')
    });

});

describe('SearchMovies rendering', () => {
    beforeEach(() => {
        fetch.resetMocks();
    });

    it('displays the search form', () => {
        fetch.once(JSON.stringify(matrixMovies));

        const wrapper = shallow(
            <SearchMovies.WrappedComponent location={{search: 'title=matrix&audio=en'}}/>
        );

        expect(wrapper.find(SearchMoviesForm)).toHaveLength(1);
    });

    it('displays the empty results row if no movies found', async () => {
        fetch.once("[]");

        const wrapper = shallow(
            <SearchMovies.WrappedComponent location={{search: 'title=matrix&audio=en'}}/>
        );
        await flushPromises();

        expect(wrapper.find(".movieTableRow")).toHaveLength(0);
        expect(wrapper.find("#noResultsRow")).toHaveLength(1);
    });

    it('displays the list of movies', async () => {
        fetch.once(JSON.stringify(matrixMovies));

        const wrapper = shallow(
            <SearchMovies.WrappedComponent location={{search: 'title=matrix&audio=en'}}/>
        );
        await flushPromises();

        expect(wrapper.find("#noResultsRow")).toHaveLength(0);
        expect(wrapper.find(MovieRow)).toHaveLength(2);
    });
});

const matrixMovies = [
    {
        id: 591955,
        title: "the matrix",
        imageUrl: "http://store.com/img.jpg",
        date: "2004",
        description: "the matrix movie",
        voteAverage: 9.0
    },
    {
        id: 193255,
        title: "the matrix revolution",
        imageUrl: "http://store.com/img2.jpg",
        date: "2008",
        description: "the matrix revolution movie",
        voteAverage: 4
    }];