import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import getCoverUrlOrDefaultCover from "../utils/TemplateUtils";
import React from "react";
import PropTypes from "prop-types";
import StreamModal from "./StreamModal";
import {STREAM_SOURCES} from "../common/Common";

const LONG_TEXT_SIZE = 25;

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

        return <Col className="mt-2" md={2} xs={12}>
            <StreamModal handleClose={this.handleModalShow}
                         show={showSourceModal}
                         sources={STREAM_SOURCES}
                         stream={stream}/>
            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
            <a onClick={this.handleModalShow}
               title={`Go to ${stream.source} to watch ${stream.title}`}>
                <Card>
                    <Card.Img src={getCoverUrlOrDefaultCover(stream.imageUrl)} variant="top"/>
                    <Card.Body>
                        {/* eslint-disable-next-line multiline-ternary,no-ternary,react/forbid-component-props */}
                        <Card.Title className={stream.title.length >= LONG_TEXT_SIZE ? "longTitle" : "shortTitle"}>
                            {stream.title}
                        </Card.Title>
                    </Card.Body>
                </Card>
            </a>
        </Col>;
    }
}

StreamCard.propTypes = {
    stream: PropTypes.object.isRequired
};