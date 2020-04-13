import React from "react";
import SearchMoviesForm from "../form/SearchMoviesForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Logo} from "../common/Logo";
import Table from "react-bootstrap/Table";
import queryString from "query-string";
import {withRouter} from "react-router-dom";
import {trimAndLowerCaseString} from "../utils/StringUtils";
import MovieRow from "./MovieRow";
import {config} from "../common/Config";

const SEARCH_MOVIE_URL = `${config.backend.url}/search/movies`;

class SearchMovies extends React.Component {

    constructor(props) {
        super(props);
        const urlParams = queryString.parse(this.props.location.search);

        this.state = {
            isLoaded: false,
            movieAudio: trimAndLowerCaseString(urlParams.audio),
            movieTitle: trimAndLowerCaseString(urlParams.title),
            movies: []
        };

        this.updateUrlAndStartSearch = this.updateUrlAndStartSearch.bind(this);
        this.updateUrlAndAudio = this.updateUrlAndAudio.bind(this);
        this.fetchMovies = this.fetchMovies.bind(this);
    }

    componentDidMount() {
        this.fetchMovies(this.state.movieTitle);
    }

    shouldComponentUpdate() {
        return true;
    }

    fetchMovies(title) {
        const cleanedTitle = trimAndLowerCaseString(title);

        this.setState({
            isLoaded: false,
            movies: []
        });

        return fetch(encodeURI(`${SEARCH_MOVIE_URL}?title=${cleanedTitle}`))
            .then((res) => res.json())
            .then(this.stopLoadingAndSaveMovies())
            .catch(this.stopLoading());
    }

    stopLoading() {
        return (error) => {
            this.setState({
                isLoaded: true
            });
        };
    }

    stopLoadingAndSaveMovies() {
        return (movies) => {
            this.setState({
                isLoaded: true,
                movies: movies
            });
        };
    }

    updateUrlAndStartSearch(title, audio) {
        this.props.history.push(this.buildUrl(title, audio));
        return this.fetchMovies(trimAndLowerCaseString(title));
    }

    updateUrlAndAudio(audio) {
        this.props.history.push(this.buildUrl(this.state.movieTitle, audio));
        this.setState({
            movieAudio: audio
        });
    }

    buildUrl(title, audio) {
        const cleanedTitle = trimAndLowerCaseString(title);
        const cleanedAudio = trimAndLowerCaseString(audio);
        return encodeURI(`/search/movie?title=${cleanedTitle}&audio=${cleanedAudio}`);
    }

    render() {
        const {isLoaded, movies, movieTitle, movieAudio} = this.state;
        return (
            <Container id="searchMoviePage">
                <Row id="searchRow">
                    <Col xs={3}>
                        <Logo/>
                    </Col>
                    <Col xs={7}>
                        <SearchMoviesForm
                            className="align-middle"
                            handleLanguageChange={this.updateUrlAndAudio}
                            handleSubmit={this.updateUrlAndStartSearch}
                            language={movieAudio}
                            showLanguageDropdown
                            title={movieTitle}
                        />
                    </Col>
                </Row>
                {
                    // eslint-disable-next-line no-ternary
                    movies && movies.length > 0
                        // eslint-disable-next-line multiline-ternary
                        ? <Row id="resultsRow">
                            <Table hover responsive>
                                <tbody>
                                {
                                    // eslint-disable-next-line no-ternary
                                    isLoaded
                                        ? movies.map((movie) =>
                                            <MovieRow audio={movieAudio}
                                                      key={movie.id}
                                                      movie={movie}
                                            />
                                        )
                                        : <div>Loading...</div>
                                }
                                </tbody>
                            </Table>
                        </Row>
                        : <Row id="noResultsRow"><Col><p>No results found...</p></Col></Row>
                }
            </Container>
        );
    }
}

export default withRouter(SearchMovies);