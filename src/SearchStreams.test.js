import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import SearchMovies from "./SearchMovies";
import React from "react";
import SearchStreams from "./SearchStreams";

describe('SearchStreams init', () => {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<BrowserRouter><SearchStreams/></BrowserRouter>, div);
    });

    it('initialize state', () => {
        const component = new SearchStreams.WrappedComponent({
            location: {
                search: 'id=603&title=matrix&audio=en'
            }
        });

        // expect(component.movieTitle).toBe("matrix");
        // expect(component.movieAudio).toBe("en");
        // expect(component.state).toStrictEqual({
        //     isLoaded: false,
        //     movies: []
        // });
    });
});