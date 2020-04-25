import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import getCoverUrlOrDefaultCover from "../utils/TemplateUtils";
import React from "react";
import PropTypes from "prop-types";
import StreamModal from "./StreamModal";

export class StreamCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            showSourceModal: false
        };

        this.handleModalShow = this.handleModalShow.bind(this);
    }

    shouldComponentUpdate() {
        return true;
    }

    handleModalShow() {
        this.setState((oldState) => ({
            showSourceModal: !oldState.showSourceModal
        }));
    }

    render() {
        const {stream} = this.props;
        const {showSourceModal} = this.state;

        return <Col xs={2}>
            <StreamModal handleClose={this.handleModalShow} show={showSourceModal} stream={stream}/>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a onClick={this.handleModalShow}
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
}

StreamCard.propTypes = {
    stream: PropTypes.object.isRequired
};