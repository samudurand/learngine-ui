import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import getCoverUrlOrDefaultCover from "../utils/TemplateUtils";
import React from "react";
import PropTypes from "prop-types";

export function StreamCard(props) {
    const {stream} = props;
    return <Col xs={2}>
        <a href={stream.link} rel="noopener noreferrer" target="_blank"
           title={`Go to ${stream.source} to watch ${stream.title}`}>
            <Card>
                <Card.Img src={getCoverUrlOrDefaultCover(stream.imageUrl)} variant="top"/>
                <Card.Body>
                    <Card.Title>{stream.title}</Card.Title>
                </Card.Body>
            </Card>
        </a>
    </Col>;
}

StreamCard.propTypes = {
    stream: PropTypes.object.isRequired
};