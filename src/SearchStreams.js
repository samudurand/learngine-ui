import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Logo} from "./Logo";
import Table from "react-bootstrap/Table";
import Spinner from "react-bootstrap/Spinner";
import queryString from "query-string";
import {withRouter} from "react-router-dom";

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
            streams: []
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
        console.log(message.data);
        const streams = this.state.streams.slice();
        streams.push(JSON.parse(message.data));
        this.setState({streams: streams});
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
                    <Table responsive hover>
                        <tbody>
                        {
                            streams.map(stream => {
                                return (
                                    <tr>
                                        <td className="sourceLogo"><img src={this.getSourceLogo(stream.sourceId)} alt={stream.source}/></td>
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