import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import React from "react";
import SearchMovies from "./SearchMovies";
import {shallow} from "enzyme";
import SearchMoviesForm from "./SearchMoviesForm";
import {flushPromises} from "./common/TestCommons";

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

        expect(component.movieTitle).toBe("matrix");
        expect(component.movieAudio).toBe("en");
        expect(component.state).toStrictEqual({
            isLoaded: false,
            movies: []
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

    it('performs search and update url', () => {
        const mockFetch = jest.fn();
        component.instance().fetchMovies = mockFetch;

        component.instance().updateUrlAndStartSearch("Matrix", "EN");

        expect(historyMock.push).toHaveBeenCalledWith('/search/movie?title=matrix&audio=en');
        expect(mockFetch).toHaveBeenCalledWith("matrix");
    });

    it('build url', () => {
        expect(component.instance().buildUrl("Daredevil  ", "IT")).toBe('/search/movie?title=daredevil&audio=it')
    });

    it('gets movie cover url when available', () => {
        expect(component.instance().getMovieCoverOrDefaultCover("http://my/img.jpg"))
            .toBe("http://my/img.jpg");
    });

    it('gets defaut cover when movie cover is empty', () => {
        expect(component.instance().getMovieCoverOrDefaultCover(""))
            .toBe("/no-cover.jpg");
    });

    it('gets defaut cover when movie cover is missing', () => {
        expect(component.instance().getMovieCoverOrDefaultCover(null))
            .toBe("/no-cover.jpg");
    });

    it('formats description by truncating it if too long', () => {
        const formattedDesc = component.instance().truncateDescription(veryLongText);

        expect(formattedDesc).toHaveLength(500);
        expect(formattedDesc).toEndWith("...");
    });

    it('does not truncate a not too long description', () => {
        const formattedDesc = component.instance().truncateDescription(shortEnoughText);

        expect(formattedDesc).toHaveLength(499);
        expect(formattedDesc).not.toEndWith("...");
    });

    it('does not truncate an empty description', () => {
        const formattedDesc = component.instance().truncateDescription("");
        expect(formattedDesc).toBe("");
    });

    const shortEnoughText = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean " +
        "commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis " +
        "parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque " +
        "eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel" +
        ", aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae" +
        ", justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapib";

    const veryLongText = "Lorem ipsum dolor sit amet, consectetuer adipiscing elit." +
        " Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus " +
        "et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies" +
        " nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim." +
        " Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo" +
        ", rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis " +
        "pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate" +
        " eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim." +
        " Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla " +
        "ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. " +
        "Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget" +
        " condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum."
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

    it('displays the list of movies with links to corresponding search', async () => {
        fetch.once(JSON.stringify(matrixMovies));

        const wrapper = shallow(
            <SearchMovies.WrappedComponent location={{search: 'title=matrix&audio=en'}}/>
        );
        await flushPromises();

        expect(wrapper.find("#noResultsRow")).toHaveLength(0);
        const movieRows = wrapper.find(".movieTableRow a");
        expect(movieRows.at(0).props())
            .toHaveProperty("href", "/search/stream?movieId=591955&title=the%20matrix&audio=en");
        expect(movieRows.at(1).props())
            .toHaveProperty("href", "/search/stream?movieId=193255&title=the%20matrix%20revolution&audio=en");
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