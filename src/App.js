import React from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./Home";
import SearchMovies from "./movie/SearchMovies";
import SearchStreams from "./stream/SearchStreams";
import {Provider} from "react-redux";
import {createStore} from "redux";
import {languageReducer} from "./reduxSetup";

const store = createStore(
    languageReducer,
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

function App() {
    return (
        <Provider store={store}>
            <Router>
                <div>
                    <Switch>
                        <Route path="/search/movie">
                            <SearchMovies/>
                        </Route>
                        <Route path="/search/stream">
                            <SearchStreams/>
                        </Route>
                        <Route path="/">
                            <Home/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        </Provider>
    );
}

export default App;
