import Card from "react-bootstrap/Card";
import Accordion from "react-bootstrap/Accordion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilm} from "@fortawesome/free-solid-svg-icons";
import {StreamCard} from "./StreamCard";
import React from "react";
import {STREAM_SOURCES} from "../common/Common";

export class SourcePanel extends React.Component {

    static getSourceLogo(sourceId) {
        return `/sources/${STREAM_SOURCES[sourceId]}`;
    }

    shouldComponentUpdate() {
        return true;
    }

    render() {
        const {source, streams} = this.props;
        return <Card className="sourceCard">
            <Accordion.Toggle as={Card.Header} eventKey={source}>
                <Row>
                    <Col>
                        <p className="sourceTitle">
                            <FontAwesomeIcon icon={faFilm}/>
                            <b>{streams[0].source}</b> ({streams.length} results)
                        </p>
                    </Col>
                    <Col className="sourceLogo">
                        <img alt={source} src={SourcePanel.getSourceLogo(source)}/>
                    </Col>
                </Row>
            </Accordion.Toggle>
            <Accordion.Collapse eventKey={source}>
                <Row id="streamCardsRow">
                    {
                        streams.map((stream) =>
                            <StreamCard key={`${stream.source} ${stream.title}`} stream={stream}/>)
                    }
                </Row>
            </Accordion.Collapse>
        </Card>;
    }
}