import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Logo} from "../common/Logo";
import queryString from "query-string";
import {withRouter} from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import {SEARCH_MODES} from "../common/Common";
import SearchMoviesForm from "../form/SearchMoviesForm";
import {trimAndLowerCaseString} from "../utils/StringUtils";
import {config} from "../common/Config";
import SpinnerRow from "../common/SpinnerRow";
import {SourcePanel} from "./SourcePanel";
import {AlternativeTitlesRow} from "./AlternativeTitlesRow";
import {isEmptyObject} from "../common/utils";

const ALT_TITLES_URL = `${config.backend.url}/search/titles`;
const STREAM_SEARCH_URL = `${config.backend.url}/search/streams`;

class SearchStreams extends React.Component {

    constructor(props) {
        super(props);
        const urlParams = queryString.parse(this.props.location.search);
        this.state = {
            alternativeTitles: [],
            isLoaded: false,
            movieAudio: trimAndLowerCaseString(urlParams.audio),
            movieId: trimAndLowerCaseString(urlParams.movieId),
            movieTitle: trimAndLowerCaseString(urlParams.title),
            streams: {}
        };

        this.updateStreamSearch = this.updateStreamSearch.bind(this);
        this.performSearch = this.performSearch.bind(this);
        this.processStreamData = this.processStreamData.bind(this);
        this.endLoadingAndCloseEventSource = this.endLoadingAndCloseEventSource.bind(this);
    }

    componentDidMount() {
        const {movieTitle, movieAudio} = this.state;
        this.startEventStream(movieTitle, movieAudio);
        return this.retrieveAlternativeTitles(movieAudio);
    }

    shouldComponentUpdate() {
        return true;
    }

    retrieveAlternativeTitles(audio) {
        this.setState({
            alternativeTitles: []
        });

        const {movieId} = this.state;
        if (movieId) {
            const url = `${ALT_TITLES_URL}?movieId=${movieId}&audio=${audio}`;
            return fetch(encodeURI(url))
                .then((res) => res.json())
                .then((titles) => {
                        this.setState({
                            alternativeTitles: titles
                        });
                    }
                );
        }
        return Promise.resolve();
    }

    startEventStream(movieTitle, audio) {
        if (this.eventSource) {
            this.eventSource.close();
        }

        this.setState({
            streams: {}
        }, () => {
            const url = `${STREAM_SEARCH_URL}?title=${movieTitle}&audio=${audio}`;
            this.eventSource = new EventSource(encodeURI(url));
            this.eventSource.addEventListener("message", this.processStreamData);
            this.eventSource.addEventListener("error", this.endLoadingAndCloseEventSource);
        });
    }

    processStreamData(message) {
        const stream = JSON.parse(message.data);
        const {sourceId} = stream;
        const {streams} = this.state;
        if (streams[sourceId]) {
            const streamsForSource = streams[sourceId].slice();
            streamsForSource.push(stream);
            this.setState((prevState) => ({
                streams: {
                    ...prevState.streams,
                    [sourceId]: streamsForSource
                }
            }));

        } else {
            this.setState((prevState) => ({
                streams: {
                    ...prevState.streams,
                    [sourceId]: [stream]
                }
            }));
        }
    }

    endLoadingAndCloseEventSource(error) {
        this.eventSource.close();
        this.setState({isLoaded: true});
    }

    render() {
        const {isLoaded, streams, alternativeTitles, movieAudio} = this.state;
        return (
            <Container id="searchStreamPage">
                <Row className="d-sm-none pt-3 pb-2" id="titleRow">
                    <Col md={{offset: 4, span: 4}} xs={{offset: 3, span: 6}}>
                        <Logo/>
                    </Col>
                </Row>
                <Row id="searchRow">
                    <Col className="d-none d-sm-inline-block" md={3}>
                        <Logo/>
                    </Col>
                    <Col md={7} xs={12}>
                        <SearchMoviesForm
                            className="align-middle"
                            handleSubmit={this.performSearch}
                            language={this.state.movieAudio}
                            searchMode={SEARCH_MODES.DIRECT}
                            showLanguageDropdown
                            showSearchModeToggle
                            title={this.state.movieTitle}
                        />
                    </Col>
                </Row>
                {
                    alternativeTitles && alternativeTitles.length > 0 &&
                    <AlternativeTitlesRow audio={movieAudio} titles={alternativeTitles}/>
                }
                {
                    Object.keys(streams).length > 0 &&
                    <Row id="resultsRow">
                        <Col>
                            <Accordion defaultActiveKey={Object.entries(streams)[0][0]}>
                                {
                                    Object.entries(streams).map(([streamSource, streamData]) =>
                                        <SourcePanel key={streamSource} source={streamSource} streams={streamData}/>
                                    )
                                }
                            </Accordion>
                        </Col>
                    </Row>
                }
                {
                    isLoaded && Object.keys(streams).length <= 0 &&
                    <Row id="noResultsRow">
                        <Col>
                            <p>No results found...</p>
                        </Col>
                    </Row>
                }
                {
                    !isLoaded && <SpinnerRow/>
                }

            </Container>
        );
    }

    performSearch(title, audio, searchMode) {
        const sanitizedTitle = trimAndLowerCaseString(title);
        if (searchMode === SEARCH_MODES.DIRECT) {
            if (isEmptyObject(this.state.streams) || sanitizedTitle !== this.state.movieTitle) {
                return this.updateStreamSearch(sanitizedTitle, audio);
            }
        } else {
            this.props.history.push(`/search/movie?title=${sanitizedTitle}&audio=${audio}`);
        }
        return Promise.resolve();
    }

    updateStreamSearch(movieTitle, audio) {
        this.props.history.push(encodeURI(`/search/stream?title=${movieTitle}&audio=${audio}`));
        this.setState({
            isLoaded: false,
            movieAudio: audio,
            movieId: null,
            movieTitle: movieTitle,
            streams: {}
        });

        this.startEventStream(movieTitle, audio);
        return this.retrieveAlternativeTitles(audio);
    }
}

export default withRouter(SearchStreams);