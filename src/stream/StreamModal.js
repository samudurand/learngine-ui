import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PropTypes from "prop-types";
import AdBlockersDropdown from "./AdBlockersDropdown";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {STREAM_SOURCES, SUBTITLES} from "../common/Common";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faFilm} from "@fortawesome/free-solid-svg-icons";

export default function StreamModal(props) {
    const {show, handleClose, stream} = props;
    const {sourceId, source, link, title} = stream;
    const {adblockers, instructions, subtitles} = STREAM_SOURCES[sourceId];

    const firstColumnSpan = {offset: 1, span: 2};
    const secondColumnSpan = 9;

    // eslint-disable-next-line react/no-multi-comp
    function subtitlesRow() {
        if (subtitles.presence === SUBTITLES.NONE) {
            return "";
        }

        let subs;
        switch (subtitles.presence) {
            case SUBTITLES.LOADABLE:
                subs = <p>None provided, but can be loaded manually in the player</p>;
                break;
            case SUBTITLES.MAYBE:
                subs = <p>Uknown</p>;
                break;
            case SUBTITLES.PROVIDED: {
                const languages = subtitles.languages.map((lang) => lang.label);
                subs = <p>{languages.join(", ")}</p>;
                break;
            }
            default:
                subs = <p/>;
        }

        return <Row className="subtitlesRow">
            <Col className="border-right pt-1 pb-1" xs={firstColumnSpan}>
                <p className="font-weight-bold">Subtitles</p>
            </Col>
            <Col className="pl-4 pt-1 pb-1" xs={secondColumnSpan}>
                <p>{subs}</p>
            </Col>
        </Row>;
    }

    return (
        <Modal centered dialogClassName="streamModal" onHide={handleClose} show={show} size="lg">
            <Modal.Header closeButton>
                <Modal.Title>
                    <FontAwesomeIcon className="fa-lg movieIcon" icon={faFilm}/>
                    <span className="movieTitle">{title}</span>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Row className="instructionsRow">
                    <Col className="border-right pt-2 pb-1" xs={firstColumnSpan}>
                        <p className="font-weight-bold">Instructions</p>
                    </Col>
                    <Col className="pl-4 pt-2 pb-1" xs={secondColumnSpan}>
                        <p>{instructions}</p>
                    </Col>
                </Row>
                {subtitlesRow()}
                <Row className="adblockersRow">
                    <Col className="align-self-center border-right pt-1 pb-2" xs={firstColumnSpan}>
                        <p className="font-weight-bold">Adblockers</p>
                    </Col>
                    <Col className="pl-4 pt-1 pb-2" xs={secondColumnSpan}>
                        <div className="float-left">
                            {
                                adblockers.map((adblocker) =>
                                    <AdBlockersDropdown adblocker={adblocker} key={adblocker.name}/>
                                )
                            }
                        </div>
                    </Col>
                </Row>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleClose} variant="secondary">
                    Close
                </Button>
                <Button href={link} target="_blank" variant="dark">
                    Go to <b>{source}</b>
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

StreamModal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    stream: PropTypes.object.isRequired
};