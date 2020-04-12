import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Logo} from "../common/Logo";
import queryString from "query-string";
import {withRouter} from "react-router-dom";
import Accordion from "react-bootstrap/Accordion";
import {SEARCH_MODES} from "../common/Common";
import SearchMoviesForm from "../SearchMoviesForm";
import {trimAndLowerCaseString} from "../utils/StringUtils";
import {config} from "../common/Config";
import SpinnerRow from "./SpinnerRow";
import {SourcePanel} from "./SourcePanel";
import {AlternativeTitlesRow} from "./AlternativeTitlesRow";

const ALT_TITLES_URL = `${config.backend.url}/search/titles`;
const STREAM_SEARCH_URL = `${config.backend.url}/search/streams`;

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

        this._updateStreamSearch = this._updateStreamSearch.bind(this);
        this.performSearch = this.performSearch.bind(this);
        this._processStreamData = this._processStreamData.bind(this);
        this._endLoadingAndCloseEventSource = this._endLoadingAndCloseEventSource.bind(this);
    }

    componentDidMount() {
        this.retrieveAlternativeTitles();
        this.startEventStream();
    }

    retrieveAlternativeTitles() {
        this.setState({alternativeTitles: []});
        if (this.state.movieId) {
            const url = `${ALT_TITLES_URL}?movieId=${this.state.movieId}&audio=${this.state.movieAudio}`;
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

        const url = `${STREAM_SEARCH_URL}?title=${this.state.movieTitle}&audio=${this.state.movieAudio}`;
        this.eventSource = new EventSource(encodeURI(url));
        this.eventSource.addEventListener('message', this._processStreamData);
        this.eventSource.addEventListener('error', this._endLoadingAndCloseEventSource);
    }

    _processStreamData(message) {
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

    _endLoadingAndCloseEventSource(error) {
        console.debug("Closing SSE connection");
        this.eventSource.close();
        this.setState({isLoaded: true});
    }

    render() {
        const {isLoaded, streams, alternativeTitles, movieAudio} = this.state;
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
                {
                    alternativeTitles && alternativeTitles.length > 0 ?
                        <AlternativeTitlesRow titles={alternativeTitles} audio={movieAudio}/>
                        : ""
                }
                {
                    Object.keys(streams).length > 0 ?
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
                        </Row> : ""
                }
                {
                    isLoaded && (Object.keys(streams).length <= 0) ?
                        <Row id="noResultsRow">
                            <Col>
                                <p>No results found...</p>
                            </Col>
                        </Row> : ""
                }
                {
                    !isLoaded ? <SpinnerRow/> : ""
                }

            </Container>
        );
    }

    performSearch(title, audio, searchMode) {
        const sanitizedTitle = trimAndLowerCaseString(title);
        if (searchMode === SEARCH_MODES.DIRECT) {
            if (this.state.streams.length <= 0 || sanitizedTitle !== this.state.movieTitle) {
                return this._updateStreamSearch(sanitizedTitle, audio);
            }
        } else {
            this.props.history.push(`/search/movie?title=${sanitizedTitle}&audio=${audio}`);
        }
        return Promise.resolve();
    }

    _updateStreamSearch(movieTitle, audio) {
        this.props.history.push(encodeURI(`/search/stream?title=${movieTitle}&audio=${audio}`));
        this.setState({
            streams: {},
            isLoaded: false,
            movieTitle: movieTitle,
            movieAudio: audio,
            movieId: null
        });

        this.startEventStream();
        return this.retrieveAlternativeTitles();
    }
}

export default withRouter(SearchStreams);