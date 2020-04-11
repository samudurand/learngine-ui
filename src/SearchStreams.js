import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Logo} from "./common/Logo";
import Spinner from "react-bootstrap/Spinner";
import queryString from "query-string";
import {withRouter} from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import Card from "react-bootstrap/Card";
import {LANGUAGES, SEARCH_MODES, STREAM_SOURCES} from "./common/Common";
import {faBars, faFilm, faSearch} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import SearchMoviesForm from "./SearchMoviesForm";
import {trimAndLowerCaseString} from "./utils/StringUtils";
import getCoverUrlOrDefaultCover from "./utils/TemplateUtils";
import {Language} from "./common/Language";

class SearchStreams extends React.Component {

    constructor(props) {
        super(props);
        const urlParams = queryString.parse(this.props.location.search);
        this.state = {
            isLoaded: false,
            streams: {},
            alternativeTitles: [],
            movieId: trimAndLowerCaseString(urlParams.movieId),
            movieTitle: trimAndLowerCaseString(urlParams.title),
            movieAudio: trimAndLowerCaseString(urlParams.audio)
        };

        this.updateStreamSearch = this.updateStreamSearch.bind(this);
        this.performSearch = this.performSearch.bind(this);
    }

    componentDidMount() {
        this.retrieveAlternativeTitles();
        this.startEventStream();
    }

    retrieveAlternativeTitles() {
        this.setState({alternativeTitles: []});
        if (this.state.movieId) {
            const url = `http://localhost:9000/search/titles?movieId=${this.state.movieId}&audio=${this.state.movieAudio}`;
            return fetch(encodeURI(url))
                .then(res => res.json())
                .then((titles) => {
                        this.setState({
                            alternativeTitles: titles
                        });
                    }
                );
        } else {
            return Promise.resolve();
        }
    }

    startEventStream() {
        if (this.eventSource) {
            this.eventSource.close();
        }

        const url = `http://localhost:9000/search/streams?title=${this.state.movieTitle}&audio=${this.state.movieAudio}&engines=false`;
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
        this.props.history.push(encodeURI(`/search/stream?title=${movieTitle}&audio=${audio}`));
        this.setState({
            streams: {},
            isLoaded: false,
            movieTitle: movieTitle,
            movieAudio: audio,
            movieId: null
        });

        this.retrieveAlternativeTitles();
        this.startEventStream();
    }

    getSourceLogo(sourceId) {
        return `/sources/${STREAM_SOURCES[sourceId]}`;
    }

    performSearch(title, audio, searchMode) {
        const sanitizedTitle = trimAndLowerCaseString(title);
        if (searchMode === SEARCH_MODES.DIRECT) {
            if (this.state.streams.length <= 0 || sanitizedTitle !== this.state.movieTitle) {
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
                                        <FontAwesomeIcon icon={faBars} id="barsIcon"/>
                                        Not finding what you want ? Try again with one of those titles
                                        (<b>{alternativeTitles.length}</b> possible match
                                        in {Language.findByCode(LANGUAGES, this.state.movieAudio).label})
                                    </Accordion.Toggle>
                                    <Accordion.Collapse eventKey="0">
                                        <Card.Body>
                                            {
                                                alternativeTitles.sort().map(title =>
                                                    <div key={title} className="altTitle">
                                                        <a href={`/search/stream?title=${title}&audio=${this.state.movieAudio}`}><FontAwesomeIcon
                                                            icon={faSearch}/> {title}</a>
                                                    </div>)
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
                            <Accordion defaultActiveKey={Object.entries(streams)[0][0]}>
                                {
                                    Object.entries(streams).map(([streamSource, streamData]) => (
                                        <Card key={streamSource} className="sourceCard">
                                            <Accordion.Toggle as={Card.Header} eventKey={streamSource}>
                                                <Row>
                                                    <Col>
                                                        <p className="sourceTitle">
                                                            <FontAwesomeIcon icon={faFilm}/>
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
                                                            <Col key={stream.source + " " + stream.title} xs={2}>
                                                                <a href={stream.link} target="_blank"
                                                                   rel="noopener noreferrer"
                                                                   title={`Go to ${stream.source} to watch ${stream.title}`}>
                                                                    <Card>
                                                                        <Card.Img variant="top"
                                                                                  src={getCoverUrlOrDefaultCover(stream.imageUrl)}/>
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
                    isLoaded && (Object.keys(streams).length <= 0) ?
                        <Row id="noResultsRow"><Col><p>No results found...</p></Col></Row> : ""
                }
                {
                    !isLoaded ? spinnerRow : ""
                }

            </Container>
        );
    }
}

export default withRouter(SearchStreams);