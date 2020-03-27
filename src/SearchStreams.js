import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Logo} from "./Logo";
import Spinner from "react-bootstrap/Spinner";
import queryString from "query-string";
import {withRouter} from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import {languages, searchModes, sources} from "./Common";
import {faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SearchMoviesForm from "./SearchMoviesForm";
import {sanitizedString} from "./Sanitizer";

class SearchStreams extends React.Component {

    constructor(props) {
        super(props);
        const urlParams = queryString.parse(this.props.location.search);
        this.movie = {
            id: urlParams.movieId,
            title: urlParams.title,
            audio: urlParams.audio
        };
        this.state = {
            isLoaded: false,
            streams: {},
            alternativeTitles: []
        };

        this.updateStreamSearch = this.updateStreamSearch.bind(this);
        this.performSearch = this.performSearch.bind(this);
    }

    componentDidMount() {
        this.retrieveAlternativeTitles();
        this.startEventStream();
    }

    retrieveAlternativeTitles() {
        if (this.movie.id) {
            const url = `http://localhost:9000/search/alternatives?movieId=${this.movie.id}&audio=${this.movie.audio}`;
            fetch(encodeURI(url))
                .then(res => res.json())
                .then((titles) => {
                        this.setState({
                            alternativeTitles: titles
                        });
                    }
                );
        }
    }

    startEventStream() {
        if (this.eventSource) {
            this.eventSource.close();
        }

        const url = `http://localhost:9000/search/streams?title=${this.movie.title}&audio=${this.movie.audio}&engines=false`;
        this.eventSource = new EventSource(encodeURI(url));
        this.eventSource.onmessage = (msg) => this.processStreamData(msg);
        this.eventSource.onerror = (error) => {
            console.info("Closing SSE connection");
            this.eventSource.close();
            this.setState({isLoaded: true});
        };
    }

    processStreamData(message) {
        const stream = JSON.parse(message.data);
        const {sourceId} = stream;
        if (!this.state.streams[sourceId]) {
            this.setState({
                streams: {
                    ...this.state.streams,
                    [sourceId]: [stream]
                }
            });
        } else {
            const streams = this.state.streams[sourceId].slice();
            streams.push(stream);
            this.setState({
                streams: {
                    ...this.state.streams,
                    [sourceId]: streams
                }
            });
        }
    }

    updateStreamSearch(movieTitle, audio) {
        this.movie.title = movieTitle;
        this.movie.audio = audio;
        this.props.history.push(encodeURI(`/search/stream?movieId=${this.movie.id}&title=${movieTitle}&audio=${audio}`));
        this.setState({
            streams: {},
            isLoaded: false
        });
        this.startEventStream();
    }

    getSourceLogo(sourceId) {
        return `/sources/${sources[sourceId]}`;
    }

    static getImage(imageUrl) {
        return imageUrl && imageUrl.length > 0 ? imageUrl : "/no-cover.jpg";
    }

    static getLanguageLabel(langCode) {
        return languages.find(lang => lang.langCode === langCode).langLabel;
    }

    performSearch(title, audio, searchMode) {
        const sanitizedTitle = sanitizedString(title);
        if (searchMode === searchModes.direct.name) {
            if (this.state.streams.length <= 0 || sanitizedTitle !== this.movie.title) {
                this.updateStreamSearch(sanitizedTitle, audio);
            }
        } else {
            this.props.history.push(`/search/movie?title=${sanitizedTitle}&audio=${audio}`);
        }
    }

    render() {
        const {isLoaded, streams, alternativeTitles} = this.state;

        const spinnerRow = (
            <Row id="spinnerRow">
                {!isLoaded ?
                    <Col id="spinner">
                        <Spinner animation="border" role="status" variant="secondary">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                        <span>Searching for more streams...</span>
                    </Col>
                    : ''
                }
            </Row>
        );

        return (
            <Container id="searchStreamPage">
                <Row id="searchRow">
                    <Col xs={3}>
                        <Logo/>
                    </Col>
                    <Col xs={7}>
                        <SearchMoviesForm
                            onSubmitAction={this.performSearch}
                            showLanguageDropdown={true}
                            showLanguageRadios={false}
                            showSearchMode={true}
                            className="align-middle"/>
                    </Col>
                </Row>
                {alternativeTitles && alternativeTitles.length > 0 ?
                    <Row id="alternativeTitlesRow">
                        <Col>
                            <Accordion>
                                <Card>
                                    <Accordion.Toggle as={Card.Header} eventKey="0">
                                        No finding what you want ? Try again with one of those suggested titles
                                        (<b>{alternativeTitles.length}</b> available)
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            {
                                                alternativeTitles.sort().map(title =>
                                                    <div className="altTitle"
                                                         onClick={this.updateStreamSearch.bind(this, title, this.movie.audio)}>
                                                        <FontAwesomeIcon icon={faSearch}/> {title}</div>)
                                            }
                                        </Card.Body>
                                    </Accordion.Collapse>
                                </Card>
                            </Accordion>
                        </Col>
                    </Row> : ""
                }
                {Object.keys(streams).length > 0 ?
                    <Row id="resultsRow">
                        <Col>
                            <Accordion>
                                {
                                    Object.entries(streams).map(([streamSource, streamData]) => (
                                        <Card className="sourceCard">
                                            <Accordion.Toggle as={Card.Header} eventKey={streamSource}>
                                                <Row>
                                                    <Col>
                                                        <p className="sourceTitle">
                                                            <b>{streamData[0].source}</b> ({streamData.length} results)
                                                        </p>
                                                    </Col>
                                                    <Col className="sourceLogo">
                                                        <img src={this.getSourceLogo(streamSource)} alt={streamSource}/>
                                                    </Col>
                                                </Row>
                                            </Accordion.Toggle>
                                            <Accordion.Collapse eventKey={streamSource}>
                                                <Row id="streamCardsRow">
                                                    {
                                                        streamData.map(stream => (
                                                            <Col xs={2}>
                                                                <a href={stream.link} target="_blank"
                                                                   rel="noopener noreferrer"
                                                                   title={`Go to ${stream.source} to watch ${stream.title}`}>
                                                                    <Card>
                                                                        <Card.Img variant="top"
                                                                                  src={SearchStreams.getImage(stream.imageUrl)}/>
                                                                        <Card.Body>
                                                                            <Card.Title>{stream.title}</Card.Title>
                                                                        </Card.Body>
                                                                    </Card>
                                                                </a>
                                                            </Col>
                                                        ))
                                                    }
                                                </Row>
                                            </Accordion.Collapse>
                                        </Card>
                                    ))
                                }
                            </Accordion>
                        </Col>
                    </Row> : ""
                }
                {
                    isLoaded && (Object.keys(streams).length <= 0) ? <Row id="noResultsRow"><Col><p>No results found...</p></Col></Row> : ""
                }
                {
                    !isLoaded ? spinnerRow : ""
                }

            </Container>
        );
    }
}

export default withRouter(SearchStreams);