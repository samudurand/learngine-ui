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
import {mapLanguageStateToProps, setTargetLanguage} from "../common/reduxSetup";
import PropTypes from "prop-types";
import {compose} from "redux";
import {connect} from "react-redux";

const ALT_TITLES_URL = `${config.backend.url}/search/titles`;
const STREAM_SEARCH_URL = `${config.backend.url}/search/streams`;

class SearchStreams extends React.Component {

    constructor(props) {
        super(props);
        const {location, setTargetLanguageFn} = this.props;
        const urlParams = queryString.parse(location.search);

        const audio = trimAndLowerCaseString(urlParams.audio);
        setTargetLanguageFn(audio);

        this.state = {
            alternativeTitles: [],
            movieId: trimAndLowerCaseString(urlParams.movieId),
            movieTitle: trimAndLowerCaseString(urlParams.title),
            searchInProgress: false,
            streams: {}
        };

        this.updateStreamSearch = this.updateStreamSearch.bind(this);
        this.performSearch = this.performSearch.bind(this);
        this.processStreamData = this.processStreamData.bind(this);
        this.endLoadingAndCloseEventSource = this.endLoadingAndCloseEventSource.bind(this);
    }

    componentDidMount() {
        const {targetLanguage} = this.props;
        const {movieTitle} = this.state;
        this.startEventStream(movieTitle, targetLanguage);
        return this.retrieveAlternativeTitles(targetLanguage);
    }

    shouldComponentUpdate() {
        return true;
    }

    retrieveAlternativeTitles(audio) {
        const {movieId} = this.state;
        this.setState({
            alternativeTitles: []
        });

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
        this.setState({searchInProgress: false});
    }

    render() {
        const {movieTitle, searchInProgress, streams, alternativeTitles} = this.state;
        return (
            <Container id="searchStreamPage">
                <Row className="d-sm-none pt-3 pb-2" id="titleRow">
                    <Col md={{offset: 4, span: 4}} xs={{offset: 3, span: 6}}>
                        <Logo/>
                    </Col>
                </Row>
                <div className="mb-4 mt-3">
                    <SearchMoviesForm
                        disableSearchBtn={searchInProgress}
                        handleSubmit={this.performSearch}
                        searchMode={SEARCH_MODES.DIRECT}
                        showLanguageDropdown
                        showLogo
                        showSearchModeToggle
                        title={movieTitle}
                    />
                </div>
                {
                    alternativeTitles && alternativeTitles.length > 0 &&
                    <AlternativeTitlesRow titles={alternativeTitles}/>
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
                    !searchInProgress && Object.keys(streams).length <= 0 &&
                    <Row id="noResultsRow">
                        <Col>
                            <p>No results found...</p>
                        </Col>
                    </Row>
                }
                {
                    searchInProgress && <SpinnerRow/>
                }

            </Container>
        );
    }

    performSearch(title, audio, searchMode) {
        const {movieTitle, streams} = this.state;
        const sanitizedTitle = trimAndLowerCaseString(title);
        if (searchMode === SEARCH_MODES.DIRECT) {
            if (isEmptyObject(streams) || sanitizedTitle !== movieTitle) {
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
            movieId: null,
            movieTitle: movieTitle,
            searchInProgress: true,
            streams: {}
        });

        this.startEventStream(movieTitle, audio);
        return this.retrieveAlternativeTitles(audio);
    }
}

SearchStreams.propTypes = {
    setTargetLanguageFn: PropTypes.func,
    targetLanguage: PropTypes.string
};

export default compose(
    withRouter,
    connect(mapLanguageStateToProps, {setTargetLanguageFn: setTargetLanguage})
)(SearchStreams);