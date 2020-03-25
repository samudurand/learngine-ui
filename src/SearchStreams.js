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
import Table from "react-bootstrap/Table";

const sources = {
    "5movies": "5movies.png",
    "altadefinizione": "altadefinizione.png",
    "animealtadefinizione": "animealtadefinizione.png",
    "filmfra": "filmfra.jpg",
    "isubsmovies": "isubsmovies.png",
    "netflix": "netflix.png",
    "solarmovie": "solarmovie.png",
    "streamcomplet": "streamcomplet.png"
};

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
            streams: {}
        };
    }

    componentDidMount() {
        const url = `http://localhost:9000/search/streams?title=${this.movie.title}&audio=${this.movie.audio}&engines=false`;
        this.eventSource = new EventSource(encodeURI(url));
        this.eventSource.onmessage = (msg) => this.processStreamData(msg);
        this.eventSource.onerror = (error) => {
            console.debug("Closing SSE connection");
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
        console.log(this.state);
    }

    getSourceLogo(sourceId) {
        return `/sources/${sources[sourceId]}`;
    }

    render() {
        const {isLoaded, streams} = this.state;
        return (
            <Container id="searchStreamPage">
                <Row id="searchRow">
                    <Col xs={3}>
                        <Logo/>
                    </Col>
                </Row>
                <Row id="resultsRow">
                    <Col>
                        <Accordion>
                            {
                                Object.entries(streams).map(([streamSource, streamData]) => (
                                    <Card className="sourceCard">
                                        <Accordion.Toggle as={Card.Header} eventKey={streamSource}>
                                            <Row>
                                                <Col>
                                                    <p className="sourceTitle">{streamData[0].source}</p>
                                                </Col>
                                                <Col className="sourceLogo" >
                                                    <img src={this.getSourceLogo(streamSource)} alt={streamSource}/>
                                                </Col>
                                                <Col>
                                                    <p className="sourceDesc">{streamData.length} results</p>
                                                </Col>
                                            </Row>
                                        </Accordion.Toggle>
                                        <Accordion.Collapse eventKey={streamSource}>
                                            <Table responsive hover>
                                                <tbody>
                                                {
                                                    streamData.map(stream => {
                                                        return (
                                                            <tr>
                                                                {/*<td className="sourceLogo"><img src={this.getSourceLogo(stream.sourceId)} alt={stream.source}/></td>*/}
                                                                <td className="streamDesc">
                                                                    <span className="movieTitle">{stream.title}</span>
                                                                    <p><a href={stream.link}>See it on {stream.source}</a></p>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                                </tbody>
                                            </Table>
                                        </Accordion.Collapse>
                                    </Card>
                                ))

                            }
                        </Accordion>
                    </Col>

                </Row>
                <Row>
                    {!isLoaded ?
                        <Col id="spinner">
                            <Spinner animation="border" role="status" variant="secondary">
                                <span className="sr-only">Loading...</span>
                            </Spinner>
                        </Col>
                        : ''
                    }
                </Row>

            </Container>
        );
    }
}

export default withRouter(SearchStreams);