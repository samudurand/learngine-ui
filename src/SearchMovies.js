import React from "react";
import SearchMoviesForm from "./SearchMoviesForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Logo} from "./Logo";
import Table from "react-bootstrap/Table";
import queryString from "query-string";
import {withRouter} from "react-router-dom";
import {trimAndLowerCaseString} from "./utils/StringUtils";

const MAX_DESCRIPTION_LENGTH = 500;

class SearchMovies extends React.Component {

    constructor(props) {
        super(props);
        const urlParams = queryString.parse(this.props.location.search);
        this.movieTitle = trimAndLowerCaseString(urlParams.title);
        this.movieAudio = trimAndLowerCaseString(urlParams.audio);
        this.state = {
            isLoaded: false,
            movies: []
        };

        this.updateUrlAndStartSearch = this.updateUrlAndStartSearch.bind(this);
        this.updateUrlAndAudio = this.updateUrlAndAudio.bind(this);
        this.fetchMovies = this.fetchMovies.bind(this);
    }

    componentDidMount() {
        this.fetchMovies(this.movieTitle);
    }

    fetchMovies(title) {
        const cleanedTitle = trimAndLowerCaseString(title);

        this.setState({
            isLoaded: false,
            movies: []
        });

        return fetch(encodeURI(`http://localhost:9000/search/movies?title=${cleanedTitle}`))
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
        this.fetchMovies(trimAndLowerCaseString(title));
    }

    updateUrlAndAudio(audio) {
        this.movieAudio = audio;
        this.props.history.push(this.buildUrl(this.movieTitle, audio));
    }

    buildUrl(title, audio) {
        let cleanedTitle = trimAndLowerCaseString(title);
        let cleanedAudio = trimAndLowerCaseString(audio);
        return `/search/movie?title=${cleanedTitle}&audio=${cleanedAudio}`;
    }

    getMovieCoverOrDefaultCover(imageUrl) {
        return imageUrl && imageUrl.length > 0 ? imageUrl : "/no-cover.jpg";
    }

    truncateDescription(desc) {
        return !desc || desc.length < MAX_DESCRIPTION_LENGTH ? desc : desc.substring(0, MAX_DESCRIPTION_LENGTH - 3) + "...";
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
                            className="align-middle"/>
                    </Col>
                </Row>
                {movies && movies.length > 0 ?
                    <Row id="resultsRow">
                        <Table responsive hover>
                            <tbody>
                            {
                                !isLoaded ? <div>Loading...</div> :
                                    movies.map(movie => {
                                        const streamUrl = encodeURI(`/search/stream?movieId=${movie.id}&title=${movie.title}&audio=${this.movieAudio}`);
                                        return (
                                            <tr className="movieTableRow" key={movie.id}>
                                                <a href={streamUrl}>
                                                    <td><img src={this.getMovieCoverOrDefaultCover(movie.imageUrl)} alt={movie.title}/>
                                                    </td>
                                                    <td className="movieDesc">
                                                        <span className="movieTitle">{movie.title} ({movie.date})</span>
                                                        <p>{this.truncateDescription(movie.description)}</p>
                                                    </td>
                                                </a>
                                            </tr>
                                        )
                                    })
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