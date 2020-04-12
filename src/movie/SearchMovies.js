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
            movies: [],
            movieTitle: trimAndLowerCaseString(urlParams.title),
            movieAudio: trimAndLowerCaseString(urlParams.audio)
        };

        this.updateUrlAndStartSearch = this.updateUrlAndStartSearch.bind(this);
        this.updateUrlAndAudio = this.updateUrlAndAudio.bind(this);
        this.fetchMovies = this.fetchMovies.bind(this);
    }

    componentDidMount() {
        this.fetchMovies(this.state.movieTitle);
    }

    fetchMovies(title) {
        const cleanedTitle = trimAndLowerCaseString(title);

        this.setState({
            isLoaded: false,
            movies: []
        });

        return fetch(encodeURI(`${SEARCH_MOVIE_URL}?title=${cleanedTitle}`))
            .then(res => res.json())
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
        let cleanedTitle = trimAndLowerCaseString(title);
        let cleanedAudio = trimAndLowerCaseString(audio);
        return encodeURI(`/search/movie?title=${cleanedTitle}&audio=${cleanedAudio}`);
    }

    render() {
        const {isLoaded, movies} = this.state;
        return (
            <Container id="searchMoviePage">
                <Row id="searchRow">
                    <Col xs={3}>
                        <Logo/>
                    </Col>
                    <Col xs={7}>
                        <SearchMoviesForm
                            onSubmitAction={this.updateUrlAndStartSearch}
                            onLanguageChangeAction={this.updateUrlAndAudio}
                            showLanguageDropdown={true}
                            showLanguageRadios={false}
                            showSearchMode={false}
                            title={this.state.movieTitle}
                            language={this.state.movieAudio}
                            className="align-middle"/>
                    </Col>
                </Row>
                {movies && movies.length > 0 ?
                    <Row id="resultsRow">
                        <Table responsive hover>
                            <tbody>
                            {
                                !isLoaded ?
                                    <div>Loading...</div> :
                                    movies.map(movie => <MovieRow key={movie.id} movie={movie}
                                                                  audio={this.state.movieAudio}/>)
                            }
                            </tbody>
                        </Table>
                    </Row> : <Row id="noResultsRow"><Col><p>No results found...</p></Col></Row>
                }
            </Container>
        );
    }
}

export default withRouter(SearchMovies);