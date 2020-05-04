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
import SpinnerRow from "../common/SpinnerRow";
import PropTypes from "prop-types";
import {PaginationRow} from "../common/PaginationRow";

const SEARCH_MOVIE_URL = `${config.backend.url}/search/movies`;

export class SearchMovies extends React.Component {
    static defaultProps = {
        page: 1
    }

    constructor(props) {
        super(props);
        const {location, page} = props;
        const urlParams = queryString.parse(location.search);

        this.state = {
            isLoaded: false,
            movieAudio: trimAndLowerCaseString(urlParams.audio),
            movieTitle: trimAndLowerCaseString(urlParams.title),
            movies: [],
            page: page,
            totalPages: 0
        };

        this.updateUrlAndStartSearch = this.updateUrlAndStartSearch.bind(this);
        this.updateUrlAndAudio = this.updateUrlAndAudio.bind(this);
        this.fetchMovies = this.fetchMovies.bind(this);
        this.refreshSearch = this.refreshSearch.bind(this);
    }

    componentDidMount() {
        const {movieTitle, page} = this.state;
        this.fetchMovies(movieTitle, page);
    }

    shouldComponentUpdate() {
        return true;
    }

    refreshSearch(page) {
        this.fetchMovies(this.state.movieTitle, page);
    }

    fetchMovies(title, page) {
        const cleanedTitle = trimAndLowerCaseString(title);

        this.setState({
            isLoaded: false,
            movies: []
        });

        return fetch(encodeURI(`${SEARCH_MOVIE_URL}?title=${cleanedTitle}&page=${page}`))
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
        return (result) => {
            this.setState({
                isLoaded: true,
                movies: result.movies,
                totalPages: result.totalPages
            });
        };
    }

    updateUrlAndStartSearch(title, audio) {
        const {page} = this.state;
        this.props.history.push(this.buildUrl(title, audio));
        return this.fetchMovies(trimAndLowerCaseString(title, page));
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
        const {isLoaded, movies, movieTitle, movieAudio, page, totalPages} = this.state;
        return (
            <Container id="searchMoviePage">
                <Row className="d-sm-none pt-3 pb-2" id="titleRow">
                    <Col md={{offset: 4, span: 4}} xs={{offset: 3, span: 6}}>
                        <Logo/>
                    </Col>
                </Row>
                {/* <Row id="searchRow">*/}
                    {/* <Col md={7} xs={12}>*/}
                        <SearchMoviesForm
                            className="align-middle"
                            handleLanguageChange={this.updateUrlAndAudio}
                            handleSubmit={this.updateUrlAndStartSearch}
                            language={movieAudio}
                            showLanguageDropdown
                            showLogo
                            title={movieTitle}
                        />
                    {/* </Col>*/}
                {/* </Row>*/}
                {
                    // eslint-disable-next-line no-ternary
                    movies.length > 0 &&
                    <Row id="resultsRow">
                        <Table hover responsive>
                            <tbody>
                            {
                                movies.map((movie) =>
                                    <MovieRow audio={movieAudio}
                                              key={movie.id}
                                              movie={movie}
                                    />
                                )
                            }
                            </tbody>
                        </Table>
                    </Row>
                }
                {
                    movies.length <= 0 && isLoaded && <Row id="noResultsRow"><Col><p>No results found...</p></Col></Row>
                }
                {
                    !isLoaded && <SpinnerRow/>
                }
                {
                    totalPages >= 2 && <PaginationRow handlePageTurn={this.refreshSearch}
                                                      page={page} totalPages={totalPages}/>
                }
            </Container>
        );
    }
}

SearchMovies.propTypes = {
    page: PropTypes.number
};

export default withRouter(SearchMovies);