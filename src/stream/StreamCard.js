import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import getCoverUrlOrDefaultCover from "../utils/TemplateUtils";
import React from "react";

export class StreamCard extends React.Component {
    render() {
        const {stream} = this.props;
        return <Col xs={2}>
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
        </Col>;
    }
}