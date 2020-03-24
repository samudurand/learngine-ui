import React from "react";
import SearchMoviesForm from "./SearchMoviesForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Logo} from "./Logo";
import Table from "react-bootstrap/Table";
import queryString from "query-string";
import {withRouter} from "react-router-dom";
import {sanitizedString} from "./Sanitizer";

const maxDescriptionLength = 500;

class SearchMovies extends React.Component {

    constructor(props) {
        super(props);
        const urlParams = queryString.parse(this.props.location.search);
        this.movieTitle = urlParams.title;
        this.movieAudio = urlParams.audio;
        this.state = {
            isLoaded: false,
            movies: []
        };

        this.performSearch = this.performSearch.bind(this);
        this.updateAudio = this.updateAudio.bind(this);
        this.getMovies = this.getMovies.bind(this);
    }

    componentDidMount() {
        this.getMovies(this.movieTitle, this.movieAudio);
    }

    getMovies(title, audio) {
        this.setState({
            isLoaded: false,
            movies: []
        });

        fetch(encodeURI(`http://localhost:9000/search/movies?title=${title}`))
            .then(res => res.json())
            .then(
                (movies) => {
                    this.setState({
                        isLoaded: true,
                        movies: movies
                    });
                },
                (error) => {
                    this.setState({
                        isLoaded: true
                    });
                }
            );
    }

    performSearch(title, audio) {
        let sanitizedTitle = sanitizedString(title);
        if (sanitizedTitle !== this.movieTitle) {
            this.props.history.push(`/search/movie?title=${sanitizedTitle}&audio=${audio}`);
            this.getMovies(sanitizedTitle, audio);
        }
    }

    updateAudio(audio) {
        this.movieAudio = audio;
        this.props.history.push(`/search/movie?title=${this.movieTitle}&audio=${audio}`);
    }

    getImage(imageUrl) {
        return imageUrl && imageUrl.length > 0 ? imageUrl : "/no-cover.jpg";
    }

    getDescription(desc) {
        return !desc || desc.length < maxDescriptionLength ? desc : desc.substring(0, maxDescriptionLength - 3) + "...";
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
                            onSubmitAction={this.performSearch}
                            onLanguageChangeAction={this.updateAudio}
                            className="align-middle"/>
                    </Col>
                </Row>
                <Row id="resultsRow">
                    <Table responsive hover>
                        <tbody>
                        {
                            !isLoaded ? <div>Loading...</div> :
                                movies.map(movie => {
                                    const streamUrl = encodeURI(`/search/stream?movieId=${movie.id}&title=${movie.title}&audio=en`);
                                    return (
                                        <tr>
                                            <a href={streamUrl}>
                                                <td><img src={this.getImage(movie.imageUrl)} alt={movie.title}/></td>
                                                <td className="movieDesc">
                                                    <span className="movieTitle">{movie.title} ({movie.date})</span>
                                                    <p>{this.getDescription(movie.description)}</p>
                                                </td>
                                            </a>
                                        </tr>
                                    )
                                })
                        }
                        </tbody>
                    </Table>
                </Row>

            </Container>
        );
    }
}

export default withRouter(SearchMovies);