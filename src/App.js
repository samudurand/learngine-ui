import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./Home";
import SearchMovies from "./SearchMovies";

function App() {
    return (
        <Router>
            <div>
                <Switch>
                    <Route path="/search/movie">
                        <SearchMovies/>
                    </Route>
                    <Route path="/">
                        <Home/>
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
